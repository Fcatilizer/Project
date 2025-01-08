import React, { useState } from "react";
import { Alert, ButtonGroup, Card, Progress } from "flowbite-react";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { use } from "react";
import axios from "axios";

function VideoUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [meta, setMeta] = useState({
    title: "",
    description: "",
  });
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  function handleFileChange(event) {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  }

  function formFieldChange(event) {
    // console.log(event.target.name);
    // console.log(event.target.value);
    setMeta({
      ...meta,
      [event.target.name]: event.target.value,
    });
  }

  function handleForm(formEvent) {
    if (selectedFile === null) {
      alert("Please select a file to upload");
      return;
    }

    formEvent.preventDefault();
    console.log(meta);

    // submit the file to the server
    saveVideoToServer(selectedFile, meta);
  }

  //submit file to the server

  async function saveVideoToServer(video, videoMetaData) {
    setUploading(true);

    //api call
    try {
      let formData = new FormData();
      formData.append("title", videoMetaData.title);
      formData.append("description", videoMetaData.description);
      formData.append("file", selectedFile);

      let response = await axios.post(
        "http://localhost:8080/api/v1/videos",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setProgress(progress);
            console.log(progress);
            // console.log(progressEvent);
          },
        }
      );

      console.log(response.data);

      setMessage("Video uploaded successfully");
      setUploading(false);
    } catch (error) {
      console.error(error);
      setMessage("Failed to upload video");
      setUploading(false);
    }
  }

  return (
    <div className="text-white">
      <Card className="flex flex-col items-center justify-center">
        <h1>Upload Videos</h1>
        <div>
          <form noValidate onSubmit={handleForm} className="flex flex-col">
            <div className="mb-2 block">
              <Label htmlFor="file-upload" value="Video Title" />
            </div>
            <TextInput
              onChange={formFieldChange}
              name="title"
              placeholder="Enter Video Title"
            />

            <div className="max-w-md mt-4">
              <div className="mb-2 block">
                <Label htmlFor="comment" value="Video Description" />
              </div>
              <Textarea
                onChange={formFieldChange}
                name="description"
                placeholder="Write a video Description..."
                required
                rows={4}
              />
            </div>

            <div className="flex flex-col items-center justify-center gap-4">
              <div className="shrink-0">
                <img
                  className="h-16 w-16 object-cover"
                  src="video-posting.png"
                  alt="Current profile photo"
                />
              </div>
              <label className="block">
                <span className="sr-only">Choose Video File</span>
                <input
                  name="file"
                  onChange={handleFileChange}
                  type="file"
                  className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
                />
              </label>
            </div>
            {/* <div className="p-4">
              <Progress
                hidden={uploading}
                progress={progress}
                textLabel="Uploading..."
                size="lg"
                labelProgress
                labelText
              />
            </div>

            <div className="">
              <Alert color="success">
                {message && (
                  <div>
                    <span className="font-medium">Success Alert!</span>
                    {message}
                  </div>
                )}
              </Alert>
            </div> */}

            <div className="flex justify-center mt-4">
              <Button type="submit">Upload</Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default VideoUpload;
