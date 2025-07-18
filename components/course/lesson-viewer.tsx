"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Lesson, Question } from "@/types/course"
import { ChevronLeft, Youtube, Lightbulb, HelpCircle, Clock } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface LessonViewerProps {
  lesson: Lesson
  onBack: () => void
}

export default function LessonViewer({ lesson, onBack }: LessonViewerProps) {
  return (
    <Card className="w-full max-w-4xl shadow-xl border border-green-200 bg-white/90 backdrop-blur-sm">
      <CardHeader className="relative p-6 sm:p-8">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 text-gray-600 hover:text-green-700"
          onClick={onBack}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Back to module overview</span>
        </Button>
        <div className="flex flex-col items-center text-center pt-8">
          <CardTitle className="text-4xl font-extrabold text-gray-900 mb-3 leading-tight">{lesson.title}</CardTitle>
          <div className="flex items-center space-x-4 mt-4 text-base text-gray-700">
            <div className="flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full shadow-sm">
              <Clock className="h-5 w-5 mr-2" />
              <span>{lesson.duration}</span>
            </div>
            {lesson.videoUrl && (
              <div className="flex items-center bg-red-100 text-red-800 px-4 py-2 rounded-full shadow-sm">
                <Youtube className="h-5 w-5 mr-2" />
                <span>Video Lecture</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-8 p-6 sm:p-8 space-y-10">
        <div
          className="prose prose-lg dark:prose-invert max-w-none text-black leading-relaxed
                    prose-h1:mb-6 prose-h2:mb-4 prose-h3:mb-3 prose-p:mb-4 prose-li:mb-2
                    prose-h1:text-black prose-h2:text-black prose-h3:text-black prose-p:text-black prose-li:text-black prose-strong:text-black prose-em:text-black
                    prose-code:text-gray-200 prose-pre:text-gray-200"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{lesson.content}</ReactMarkdown>
        </div>

        {lesson.videoUrl && (
          <div className="space-y-4 p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg shadow-md border border-red-200">
            <h3 className="text-2xl font-semibold flex items-center text-red-800">
              <Youtube className="h-7 w-7 mr-3 text-red-600" />
              Video Lecture
            </h3>
            <Card className="p-5 bg-white/80 border border-red-100">
              <CardTitle className="text-xl font-semibold mb-2 text-red-700">{lesson.videoTitle}</CardTitle>
              <p className="text-muted-foreground text-base mb-4 text-red-600">{lesson.videoDescription}</p>
              <Button asChild className="bg-red-600 hover:bg-red-700 text-white shadow-md">
                <a href={lesson.videoUrl} target="_blank" rel="noopener noreferrer">
                  Watch on YouTube
                </a>
              </Button>
            </Card>
          </div>
        )}

        {lesson.keyPoints && lesson.keyPoints.length > 0 && (
          <div className="space-y-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg shadow-md border border-green-200">
            <h3 className="text-2xl font-semibold flex items-center text-green-800">
              <Lightbulb className="h-7 w-7 mr-3 text-green-600" />
              Key Takeaways
            </h3>
            <ul className="list-disc list-inside space-y-3 text-lg text-green-800">
              {lesson.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-green-600">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {lesson.questions && lesson.questions.length > 0 && (
          <div className="space-y-4 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg shadow-md border border-purple-200">
            <h3 className="text-2xl font-semibold flex items-center text-purple-800">
              <HelpCircle className="h-7 w-7 mr-3 text-purple-600" />
              Questions to Ponder
            </h3>
            <div className="grid gap-6">
              {lesson.questions.map((question: Question) => (
                <Card key={question.id} className="p-5 bg-white/80 border border-purple-100">
                  <CardTitle className="text-xl font-semibold mb-3 text-purple-800">{question.question}</CardTitle>
                  {question.type === "multiple-choice" && question.options && (
                    <div className="grid gap-3">
                      {question.options.map((option, idx) => (
                        <div key={idx} className="flex items-center space-x-3 text-lg text-purple-700">
                          <input
                            type="radio"
                            id={`q-${question.id}-option-${idx}`}
                            name={`q-${question.id}`}
                            value={option}
                            className="h-5 w-5 text-purple-600 focus:ring-purple-500"
                          />
                          <label htmlFor={`q-${question.id}-option-${idx}`} className="cursor-pointer">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                  {question.type === "short-answer" && (
                    <p className="text-muted-foreground italic text-base text-purple-600">
                      (Think about your answer, then reveal below)
                    </p>
                  )}
                  {question.type === "true-false" && (
                    <div className="flex items-center space-x-4 mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
                      >
                        True
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
                      >
                        False
                      </Button>
                    </div>
                  )}
                  <details className="mt-5">
                    <summary className="cursor-pointer text-purple-700 font-semibold text-lg hover:underline">
                      Show Answer
                    </summary>
                    <div className="mt-3 p-4 bg-purple-100 rounded-md border border-purple-200">
                      <p className="text-purple-800 text-base">{question.answer}</p>
                    </div>
                  </details>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
