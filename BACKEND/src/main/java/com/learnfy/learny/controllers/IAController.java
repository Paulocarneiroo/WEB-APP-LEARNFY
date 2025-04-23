package com.learnfy.learny.controllers;

import com.learnfy.learny.entities.StudyContent;
import com.learnfy.learny.entities.TopicRequest;
import com.learnfy.learny.services.IAService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class IAController {

    private final IAService iaService;

    @PostMapping("/generate")
    public ResponseEntity<StudyContent> gerarConteudo(@RequestBody TopicRequest request) {
        StudyContent resultado = iaService.generateContent(request.getTopic());
        return ResponseEntity.ok(resultado);
    }
}
