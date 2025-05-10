"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import type { StudyContent } from "@/types/study-content"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function LearnPage() {
  const params = useParams()
  const topic = decodeURIComponent(params.topic as string)

  const [content, setContent] = useState<StudyContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"content" | "quiz">("content")

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true)
      setError(null)

      try {
        console.log("Iniciando requisição para o backend...")

        // Acessando diretamente o endpoint correto
        const encodedTopic = encodeURIComponent(topic)
        const backendUrl = `http://localhost:8080/content/1?topic=${encodedTopic}`

        console.log(`Tentando acessar: ${backendUrl}`)

        const response = await fetch(backendUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
            // Adicionando cabeçalhos CORS para ajudar com problemas de cross-origin
            Origin: window.location.origin,
          },
        })

        console.log(`Resposta recebida. Status: ${response.status}`)

        if (!response.ok) {
          let errorBody = ""
          try {
            errorBody = await response.text()
            console.error("Corpo da resposta de erro:", errorBody)
          } catch (e) {
            console.error("Não foi possível ler o corpo da resposta de erro")
          }

          let errorMessage = "Falha ao buscar conteúdo. Tente novamente."

          switch (response.status) {
            case 400:
              errorMessage = "Requisição inválida. Verifique o tópico e tente novamente."
              break
            case 404:
              errorMessage = "Conteúdo não encontrado para este tópico."
              break
            case 405:
              errorMessage = "Método não permitido. O servidor não aceita este tipo de requisição."
              break
            case 500:
              errorMessage = "Erro interno do servidor. Tente novamente mais tarde."
              break
          }

          throw new Error(`${errorMessage} (Status: ${response.status})${errorBody ? ` - ${errorBody}` : ""}`)
        }

        console.log("Analisando resposta JSON...")
        const data = await response.json()
        console.log("Dados recebidos:", data)

        if (!data || typeof data !== "object") {
          throw new Error("Formato de resposta inválido do servidor")
        }

        setContent(data)
      } catch (err) {
        console.error("Erro detalhado:", err)

        if (err instanceof TypeError && err.message.includes("fetch")) {
          setError(
            "Não foi possível conectar ao servidor. Verifique se o backend está rodando em http://localhost:8080.",
          )
        } else {
          setError(err instanceof Error ? err.message : "Ocorreu um erro inesperado")
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [topic])

  // Função para tentar com parâmetros diferentes
  const retryWithDifferentParams = async () => {
    setIsLoading(true)
    setError(null)

    try {
      console.log("Tentando com parâmetros diferentes...")

      // Tentativa com o tópico no caminho da URL em vez de query parameter
      const encodedTopic = encodeURIComponent(topic)
      const alternativeUrl = `http://localhost:8080/content/${encodedTopic}`
      console.log(`Tentando acessar: ${alternativeUrl}`)

      const response = await fetch(alternativeUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Falha ao buscar conteúdo (Status: ${response.status})`)
      }

      const data = await response.json()
      setContent(data)
    } catch (err) {
      console.error("Erro na abordagem alternativa:", err)
      setError(`Tentativa alternativa falhou: ${err instanceof Error ? err.message : "Erro desconhecido"}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Função para simular conteúdo para testes
  const loadMockContent = () => {
    setIsLoading(true)
    setError(null)

    // Dados de exemplo para teste
    const mockData: StudyContent = {
      id: "1",
      topic: topic,
      content: `<h1>Conteúdo sobre ${topic}</h1><p>Este é um conteúdo de exemplo para testes. Em um ambiente real, este conteúdo seria gerado pelo backend.</p><h2>Tópicos principais</h2><ul><li>Primeiro tópico</li><li>Segundo tópico</li><li>Terceiro tópico</li></ul>`,
      quiz: `<h2>Quiz sobre ${topic}</h2><p>1. Qual é a principal característica de ${topic}?</p><p>2. Quais são os benefícios de estudar ${topic}?</p><p>3. Como ${topic} se relaciona com outras áreas de conhecimento?</p>`,
    }

    setTimeout(() => {
      setContent(mockData)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para a página inicial
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {isLoading ? `Aprendendo sobre: ${topic}` : content?.topic || topic}
          </h1>
          <p className="text-gray-600 mt-2">Conteúdo personalizado gerado para você</p>
        </div>

        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-emerald-200"></div>
              <p className="mt-4 text-emerald-600 font-medium">Buscando seu conteúdo personalizado...</p>
              <p className="text-gray-500 mt-2">Isso pode levar alguns segundos</p>
            </div>
          </div>
        )}

        {error && (
          <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-red-600">
            <h3 className="font-bold mb-2">Erro ao carregar o conteúdo</h3>
            <p>{error}</p>
            <div className="mt-4 flex flex-wrap gap-4">
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                Tentar novamente
              </Button>
              <Button
                onClick={retryWithDifferentParams}
                variant="outline"
                className="border-amber-200 text-amber-600 hover:bg-amber-50"
              >
                Tentar formato alternativo
              </Button>
              <Button
                onClick={loadMockContent}
                variant="outline"
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                Carregar conteúdo de exemplo
              </Button>
              <Link href="/" className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-md">
                Voltar para a página inicial
              </Link>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded text-gray-700 text-sm">
              <p className="font-medium">Informações de depuração:</p>
              <p>Endpoint: http://localhost:8080/content/1</p>
              <p>Tópico: {topic}</p>
              <p>Método: GET</p>
              <p>Navegador: {typeof window !== "undefined" ? window.navigator.userAgent : "N/A"}</p>
            </div>
          </div>
        )}

        {content && !isLoading && (
          <div>
            <div className="flex space-x-2 mb-6">
              <Button
                variant={activeTab === "content" ? "default" : "outline"}
                onClick={() => setActiveTab("content")}
                className={activeTab === "content" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
              >
                Conteúdo
              </Button>
              {content.quiz && content.quiz.trim() !== "" && (
                <Button
                  variant={activeTab === "quiz" ? "default" : "outline"}
                  onClick={() => setActiveTab("quiz")}
                  className={activeTab === "quiz" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                >
                  Quiz
                </Button>
              )}
            </div>

            <Card>
              <CardContent className="p-6">
                {activeTab === "content" ? (
                  <div className="prose max-w-none">
                    {/* Renderiza o conteúdo como HTML se estiver em formato HTML */}
                    {content.content.includes("<") ? (
                      <div dangerouslySetInnerHTML={{ __html: content.content }} />
                    ) : (
                      // Caso contrário, renderiza como texto com quebras de linha
                      content.content
                        .split("\n")
                        .map((paragraph, index) => <p key={index}>{paragraph}</p>)
                    )}
                  </div>
                ) : (
                  <div className="prose max-w-none">
                    {/* Renderiza o quiz como HTML se estiver em formato HTML */}
                    {content.quiz.includes("<") ? (
                      <div dangerouslySetInnerHTML={{ __html: content.quiz }} />
                    ) : (
                      // Caso contrário, renderiza como texto com quebras de linha
                      content.quiz
                        .split("\n")
                        .map((paragraph, index) => <p key={index}>{paragraph}</p>)
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  )
}
