import type { StudyContent } from "@/types/study-content"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ContentDisplayProps {
  content: StudyContent
}

export function ContentDisplay({ content }: ContentDisplayProps) {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">{content.title}</h2>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="exercises">Exercícios</TabsTrigger>
          <TabsTrigger value="resources">Recursos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Sobre este tópico</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-lg">{content.overview}</p>

                {content.keyPoints && (
                  <>
                    <h3 className="text-xl font-medium mt-6 mb-3">Pontos-chave</h3>
                    <ul>
                      {content.keyPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Conteúdo Detalhado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content.detailedContent }} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exercises" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Exercícios Práticos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {content.exercises.map((exercise, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <p className="font-medium mb-2">Exercício {index + 1}:</p>
                    <p>{exercise.question}</p>

                    <details className="mt-4">
                      <summary className="cursor-pointer text-emerald-600 font-medium">Ver resposta</summary>
                      <div className="mt-2 p-3 bg-gray-50 rounded">{exercise.answer}</div>
                    </details>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recursos Adicionais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {content.additionalResources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-medium text-emerald-600">{resource.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
