export interface Questions {
  name: string
  email: string
  questions: QuestionAnswer[]
}

export interface QuestionAnswer {
  question?: string
  answer: string
  correctAnswer?: string
}
