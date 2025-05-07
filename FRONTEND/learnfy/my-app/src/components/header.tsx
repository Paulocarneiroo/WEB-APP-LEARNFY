import { BookOpen } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-emerald-600" />
          <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            LearnFy
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Link href="#" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
            Sobre
          </Link>
          <Link href="#" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
            Como Funciona
          </Link>
          <Link
            href="#"
            className="px-4 py-2 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-700 transition-colors"
          >
            Entrar
          </Link>
        </div>
      </div>
    </header>
  )
}
