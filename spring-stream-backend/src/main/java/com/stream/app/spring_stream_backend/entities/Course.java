package com.stream.app.spring_stream_backend.entities;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "yt_courses")

public class Course {

    @Id
    private String courseId;

    private String title;

//    @OneToMany(mappedBy = "course")
//    private List<Video> list= new ArrayList<>();

}
