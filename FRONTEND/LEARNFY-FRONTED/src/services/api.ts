const BASE_URL = "http://localhost:8080"; // altere conforme seu backend

export async function fetchStudyContent(topic: string) {
  const response = await fetch(`${BASE_URL}/content/1?topic=${encodeURIComponent(topic)}`);
  if (!response.ok) throw new Error("Erro ao buscar conteúdo");
  return await response.json();
}
