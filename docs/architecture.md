## Arquitetura do Projeto
# Backend
A aplicação segue a arquitetura em camadas (MVC):

- **Controller**: expõe os endpoints REST.
- **Service**: camada de negócio que faz integração com IA e trata a lógica.
- **Repository**: usa Spring Data para acesso ao MongoDB.
- **Entity**: classes de dados (entidades).

Além disso, utilizamos:
- Springboot como framework principal
- MongoDB como banco NoSQL.
- WebClient para integração com OpenAI.
- Gitflow para controle de versões.

# Frontend
- ReactJs para frontend.
- Tailwind css para estilização.
- Bootsrap para responsividade.