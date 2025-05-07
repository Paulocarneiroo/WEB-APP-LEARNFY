package com.learnfy.learny.services;

import com.learnfy.learny.entities.StudyContent;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class IAService {

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://api.openai.com/v1/chat/completions")
            .defaultHeader("Authorization", "Bearer SUA_CHAVE_AQUI")
            .build();

    public StudyContent generateContent(String topic) {
        String prompt = "Explique de forma educativa o seguinte tema: " + topic +
                ". Ao final, crie 5 perguntas de múltipla escolha com gabarito.";

        Map<String, Object> request = Map.of(
                "model", "gpt-3.5-turbo",
                "messages", List.of(
                        Map.of("role", "user", "content", prompt)
                ),
                "temperature", 0.7
        );

        String response = webClient.post()
                .bodyValue(request)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        StudyContent content = new StudyContent();
        content.setTopic(topic);
        content.setContent(response);
        content.setQuiz("");

        return content;
    }
}
