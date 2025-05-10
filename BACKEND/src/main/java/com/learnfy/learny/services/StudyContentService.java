package com.learnfy.learny.services;

import com.learnfy.learny.entities.StudyContent;
import com.learnfy.learny.repositories.StudyContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudyContentService {

    @Autowired
    private StudyContentRepository repository;

    public List<StudyContent> findAll() {
        return repository.findAll();
    }

    public Optional<StudyContent> findById(String id) {
        return repository.findById(id);
    }

    public StudyContent save(StudyContent content) {
        return repository.save(content);
    }

    public void delete(String id) {
        repository.deleteById(id);
    }
}
