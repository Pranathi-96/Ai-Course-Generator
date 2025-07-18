export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

export interface Course {
  id: string
  title: string
  description: string
  topic: string
  difficulty: "beginner" | "intermediate" | "advanced"
  audience: string
  imageUrl?: string
  modules: Module[]
  createdAt: Date
  estimatedDuration: string
  userId: string // Added userId to associate course with a user
}

export interface Module {
  id: string
  title: string
  description: string
  lessons: Lesson[]
  duration: string
}

export interface Lesson {
  id: string
  title: string
  content: string
  duration: string
  videoUrl?: string
  videoTitle?: string
  videoDescription?: string
  keyPoints: string[]
  questions: Question[]
}

export type QuestionType = "multiple-choice" | "short-answer" | "true-false"

export interface Question {
  id: string
  question: string
  answer: string // For short-answer, this is the correct answer. For MC/TF, it's the correct option text.
  type: QuestionType
  options?: string[] // For multiple-choice questions
}
