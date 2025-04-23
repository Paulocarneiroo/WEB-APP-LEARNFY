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

    public StudyContent generateContent(String topico) {
        String prompt = "Explique de forma educativa o seguinte tema: " + topico +
                ". Ao final, crie 5 perguntas de múltipla escolha com gabarito.";

        // Corpo da requisição
        Map<String, Object> request = Map.of(
                "model", "gpt-3.5-turbo",
                "messages", List.of(
                        Map.of("role", "user", "content", prompt)
                ),
                "temperature", 0.7
        );

        // Envia para OpenAI
        String resposta = webClient.post()
                .bodyValue(request)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        // Aqui você vai fazer o parsing da resposta e salvar no Mongo
        StudyContent conteudo = new StudyContent();
        conteudo.setTopic(topico);
        conteudo.setContent(resposta); // parsear de forma mais elaborada se quiser separar conteúdo do quiz
        conteudo.setQuiz(""); // opcional

        return conteudo;
    }
}
