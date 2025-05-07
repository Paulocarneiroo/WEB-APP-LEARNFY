export interface Exercise {
  question: string
  answer: string
}

export interface Resource {
  title: string
  description: string
  url: string
}

export interface StudyContent {
  title: string
  overview: string
  keyPoints?: string[]
  detailedContent: string
  exercises: Exercise[]
  additionalResources: Resource[]
}
