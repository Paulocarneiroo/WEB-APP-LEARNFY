package com.learnfy.learny.repositories;

import com.learnfy.learny.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, Long> {
}