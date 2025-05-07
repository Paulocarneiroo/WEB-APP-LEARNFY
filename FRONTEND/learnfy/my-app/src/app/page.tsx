"use client"

import { Header } from "@/components/header"
import { StudyForm } from "@/components/study-form"
import { ContentDisplay } from "@/components/content-display"
import { useState } from "react"
import type { StudyContent } from "@/types/study-content"

export default function Home() {
  const [content, setContent] = useState<StudyContent | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleStudyRequest = async (topic: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/generate-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      })

      if (!response.ok) {
        throw new Error("Falha ao gerar conteúdo. Tente novamente.")
      }

      const data = await response.json()
      setContent(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro inesperado")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <StudyForm onSubmit={handleStudyRequest} isLoading={isLoading} />

        {error && <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">{error}</div>}

        {content && !isLoading && <ContentDisplay content={content} />}

        {!content && !isLoading && !error && (
          <div className="mt-16 text-center text-gray-500">
            <p className="text-xl">Comece digitando um tópico que você deseja estudar</p>
            <p className="mt-2">Nossa IA irá gerar conteúdo personalizado para você</p>
          </div>
        )}

        {isLoading && (
          <div className="mt-8 flex justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-emerald-200"></div>
              <p className="mt-4 text-emerald-600 font-medium">Gerando seu conteúdo personalizado...</p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
