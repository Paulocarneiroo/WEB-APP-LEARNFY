package com.learnfy.learny.entities;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "contents")
public class StudyContent {
    @Id
    private String id;
    private String topic;
    private String content;
    private String quiz;

    public String getId() {
        return id;
    }

    public String getTopic() {
        return topic;
    }

    public String getContent() {
        return content;
    }

    public String getQuiz() {
        return quiz;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setQuiz(String quiz) {
        this.quiz = quiz;
    }
}
