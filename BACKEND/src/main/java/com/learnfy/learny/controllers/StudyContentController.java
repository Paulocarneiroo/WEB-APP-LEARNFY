package com.learnfy.learny.controllers;

import com.learnfy.learny.entities.StudyContent;
import com.learnfy.learny.services.StudyContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/content")
public class StudyContentController {

    @Autowired
    private StudyContentService service;

    @GetMapping("/{id}")
    public ResponseEntity<StudyContent> findById(@PathVariable String id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<StudyContent> insert(@RequestBody StudyContent content) {
        content = service.save(content);
        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(content.getId()).toUri();

        return ResponseEntity.created(uri).body(content);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
