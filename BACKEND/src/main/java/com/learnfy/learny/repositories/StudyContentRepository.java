package com.learnfy.learny.repositories;

import com.learnfy.learny.entities.StudyContent;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudyContentRepository extends MongoRepository<StudyContent, String> {
}
