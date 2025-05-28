package com.learnfy.learny.services;

import com.learnfy.learny.entities.User;
import com.learnfy.learny.jwt.JwtUtil;
import com.learnfy.learny.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repository;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public String register(String name, String email, String password) {
        if (repository.findByEmail(email).isPresent())
            throw new RuntimeException("Email já usado");

        User user = new User(null,name,
                email, encoder.encode(password));

        repository.save(user);
        return jwtUtil.generateToken(email);
    }

    public String login(String email, String password) {
        User user = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!encoder.matches(password, user.getPassword()))
            throw new RuntimeException("Senha inválida");

        return jwtUtil.generateToken(email);
    }
}
