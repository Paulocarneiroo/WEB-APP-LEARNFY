"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

// Adicione o useRouter no início do componente
export function StudyForm({ isLoading }: { isLoading: boolean }) {
  const [topic, setTopic] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (topic.trim()) {
      // Redirecionar para a página de aprendizado com o tópico na URL
      router.push(`/learn/${encodeURIComponent(topic)}`)
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">O que você quer estudar hoje?</h1>
        <p className="text-lg text-gray-600">
          Digite qualquer tópico e nossa IA irá gerar conteúdo personalizado para você
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Ex: Inteligência Artificial, História do Brasil, Física Quântica..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="pl-10 py-6 text-lg"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-lg py-6 px-8"
          disabled={isLoading || !topic.trim()}
        >
          {isLoading ? "Gerando..." : "Aprender"}
        </Button>
      </form>
    </div>
  )
}
