export interface StudyContent {
  topic: string;
  overview: string;
  keyPoints?: string[];
  detailedContent?: string;
  exercises?: {
    question: string;
    answer: string;
  }[];
  additionalResources?: {
    url: string;
    title: string;
    description: string;
  }[];
}
