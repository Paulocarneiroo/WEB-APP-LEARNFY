'use client'

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

  const [typedText, setTypedText] = useState("")
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true)
      setError(null)
      setContent(null)
      setTypedText("")
      setCharIndex(0)

      try {
        const response = await fetch(`http://localhost:8080/content/1`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic }),
        })

        if (!response.ok) throw new Error(`Falha ao gerar conteúdo (${response.status})`)
        const data = await response.json()
        setContent(data)
      } catch (err) {
        console.error("Erro ao buscar conteúdo:", err)
        setError(err instanceof Error ? err.message : "Erro inesperado")
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [topic])

  // Efeito de digitação
  useEffect(() => {
    if (content && activeTab === "content" && charIndex < content.content.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + content.content[charIndex])
        setCharIndex((prev) => prev + 1)
      }, 20)
      return () => clearTimeout(timeout)
    }
  }, [content, activeTab, charIndex])

  // Quando troca de aba, reseta a digitação se voltar para "content"
  useEffect(() => {
    if (activeTab === "content" && content) {
      setTypedText("")
      setCharIndex(0)
    }
  }, [activeTab])

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
            <div className="mt-4 flex gap-4">
              <Button onClick={() => window.location.reload()} variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                Tentar novamente
              </Button>
              <Link href="/" className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-md">
                Voltar para a página inicial
              </Link>
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
                  <div className="prose max-w-none whitespace-pre-wrap">
                    {typedText}
                  </div>
                ) : (
                  <div className="prose max-w-none">
                    {content.quiz.includes("<") ? (
                      <div dangerouslySetInnerHTML={{ __html: content.quiz }} />
                    ) : (
                      content.quiz.split("\n").map((p, i) => <p key={i}>{p}</p>)
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
