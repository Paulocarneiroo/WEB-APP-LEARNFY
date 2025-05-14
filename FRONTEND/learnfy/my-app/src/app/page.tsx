"use client"

import { Header } from "@/components/header"
import { StudyForm } from "@/components/study-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <StudyForm isLoading={false} />

        <div className="mt-16 text-center text-gray-500">
          <p className="text-xl">Comece digitando um tópico que você deseja estudar</p>
          <p className="mt-2">Nossa IA irá gerar conteúdo personalizado para você</p>
        </div>
      </div>
    </main>
  )
}
