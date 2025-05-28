const BASE_URL = "http://localhost:8080"; // altere conforme seu backend

export async function fetchStudyContent(topic: string) {
  const response = await fetch(`${BASE_URL}/content/1?topic=${encodeURIComponent(topic)}`);
  if (!response.ok) throw new Error("Erro ao buscar conteúdo");
  return await response.json();
}

export async function generateWithLLaMA(prompt: string): Promise<string> {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama3.2",
      prompt,
      stream: false
    })
  });

  if (!response.ok) throw new Error("Erro ao gerar resposta com LLaMA");

  const data = await response.json();
  return data.response;
}

