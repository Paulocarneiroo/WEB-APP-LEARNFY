# 📘 LearnFy

**LearnFy** é uma aplicação educacional interativa que utiliza inteligência artificial para gerar conteúdos de estudo personalizados e questionários automáticos.  
O usuário informa o tema que deseja aprender, e o sistema gera um texto educativo e um banco de questões baseado nesse conteúdo.

---

## 🚀 Tecnologias Utilizadas

### 🧠 Backend
- **Spring Boot (Java 17+)**
- **Spring Web**
- **Spring Data JPA**
- **MongoDB** (banco de dados NoSQL)
- **Lombok**
- **Cors Configuration** para integração com o frontend

### 💻 Frontend
- **React + TypeScript**
- **Vite**
- **TailwindCSS**
- **Framer Motion** (animações)
- **Axios** (requisições HTTP)
- **React Router DOM**

---

## 🧩 Arquitetura da Aplicação

A arquitetura segue o modelo **Cliente-Servidor**, com comunicação via API REST:

```

[Frontend React] ⇄ [API Spring Boot] ⇄ [MongoDB]

````

### Backend
O backend simula uma IA que processa o tema enviado e retorna:
- `content`: texto explicativo sobre o tema.
- `quiz`: um conjunto de perguntas relacionadas ao conteúdo.

#### Entidade principal:
```java
public class StudyContent {
    private String id;
    private String topic;
    private String content;
    private String quiz;
}
````

#### Endpoints principais:

| Método | Rota                 | Descrição                                           |
| ------ | -------------------- | --------------------------------------------------- |
| `GET`  | `/api/study/{topic}` | Retorna o conteúdo de estudo sobre o tema informado |
| `POST` | `/api/study`         | Cria um novo registro de conteúdo de estudo         |

---

### Frontend

O frontend possui uma interface intuitiva e responsiva com três seções principais:

* **Tela principal:** o usuário informa o tema que deseja aprender.
* **Tela de aprendizado:** exibe o conteúdo gerado letra por letra (efeito de digitação).
* **Tela de questionário:** gera perguntas baseadas no conteúdo estudado.

#### Estrutura principal:

```
src/
├── components/
│   ├── LearnPage.tsx
│   ├── QuizPage.tsx
│   ├── MenuButton.tsx
├── pages/
│   ├── HomeScreen.tsx
│   ├── LearnScreen.tsx
│   ├── QuizScreen.tsx
├── services/
│   └── api.ts (configuração do Axios)
└── App.tsx
```

#### Exemplo de uso da API:

```ts
const response = await axios.get(`http://localhost:8080/api/study/${topic}`);
setContent(response.data.content);
```

---

## 🧠 Funcionalidades

✅ Geração automática de conteúdo educacional com IA (simulada no backend)
✅ Exibição do texto com **animação de digitação**
✅ Geração de **questionários automáticos** com base no conteúdo
✅ Interface responsiva e amigável
✅ Integração completa com backend Spring Boot + MongoDB

---

## 📦 Como Executar o Projeto

### 🖥️ Backend (Spring Boot)

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/learnfy.git
   cd learnfy/backend
   ```

2. Configure o banco MongoDB:

   * Certifique-se de ter o MongoDB rodando localmente (porta padrão `27017`)
   * Configure a URI no arquivo `application.properties`:

     ```
     spring.data.mongodb.uri=mongodb://localhost:27017/learnfy
     ```

3. Execute o backend:

   ```bash
   ./mvnw spring-boot:run
   ```

   O servidor iniciará em `http://localhost:8080`

---

### 🌐 Frontend (React + Vite)

1. Entre na pasta do frontend:

   ```bash
   cd learnfy/frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Execute o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

   A aplicação estará disponível em `http://localhost:5173`

---

## 📸 Demonstração Visual

### Tela Principal

O usuário informa o tema que deseja aprender e clica em **"Aprender"**.

### Geração do Conteúdo

O texto é exibido **letra por letra** simulando uma IA escrevendo o conteúdo.

### Questionário

Após o texto, o usuário pode clicar em **"Gerar Questionário"** e testar seus conhecimentos.

---

## 🧱 Padrões e Boas Práticas

O projeto adota:

* **Clean Code** (nomes claros, responsabilidade única, modularização)
* **Separação entre camadas (Controller, Service, Repository)** no backend
* **Componentização e Hooks** no frontend
* **Padrões de Projeto:** uso de **Builder**, **Composite** e **Chain of Responsibility** (em partes do backend simulando a IA)

---

## 🧑‍💻 Autor

**Paulo Carneiro** <br/>
🎓 Estudante de Ciência da Computação <br/>
💡 Desenvolvedor de software <br/>
📍 Brasil <br/>
🔗 [LinkedIn](https://linkedin.com/in/paulocarneiro) • [GitHub](https://github.com/paulocarneiro) <br/>

---
