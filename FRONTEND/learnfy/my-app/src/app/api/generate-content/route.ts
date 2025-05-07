import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { topic } = await req.json()

    if (!topic) {
      return Response.json({ error: "Tópico de estudo é obrigatório" }, { status: 400 })
    }

    const prompt = `
      Gere conteúdo educacional detalhado sobre o tópico: "${topic}".
      
      O conteúdo deve incluir:
      1. Um título descritivo
      2. Uma visão geral do tópico (1-2 parágrafos)
      3. 3-5 pontos-chave sobre o tópico
      4. Conteúdo detalhado em formato HTML (com tags h2, h3, p, ul, li, etc.)
      5. 3 exercícios práticos com perguntas e respostas
      6. 3 recursos adicionais (livros, sites, vídeos) com título, descrição curta e URL
      
      Formate a resposta como um objeto JSON com a seguinte estrutura:
      {
        "title": "Título do tópico",
        "overview": "Visão geral...",
        "keyPoints": ["Ponto 1", "Ponto 2", "Ponto 3"],
        "detailedContent": "<h2>Subtítulo</h2><p>Conteúdo...</p>...",
        "exercises": [
          { "question": "Pergunta 1?", "answer": "Resposta 1" },
          { "question": "Pergunta 2?", "answer": "Resposta 2" },
          { "question": "Pergunta 3?", "answer": "Resposta 3" }
        ],
        "additionalResources": [
          { "title": "Título do recurso 1", "description": "Descrição...", "url": "https://exemplo.com" },
          { "title": "Título do recurso 2", "description": "Descrição...", "url": "https://exemplo.com" },
          { "title": "Título do recurso 3", "description": "Descrição...", "url": "https://exemplo.com" }
        ]
      }
    `

    const { text } = await generateText({
      model: openai("gpt-4-turbo"),
      prompt,
    })

    // Parse the JSON response from the AI
    const content = JSON.parse(text)

    return Response.json(content)
  } catch (error) {
    console.error("Error generating content:", error)
    return Response.json({ error: "Falha ao gerar conteúdo. Tente novamente." }, { status: 500 })
  }
}
