"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Module, Lesson } from "@/types/course"
import { ChevronLeft, Clock, PlayCircle, Youtube } from "lucide-react"

interface ModuleViewerProps {
  module: Module
  onBack: () => void
  onLessonSelect: (lessonId: string) => void
}

export default function ModuleViewer({ module, onBack, onLessonSelect }: ModuleViewerProps) {
  return (
    <Card className="w-full max-w-4xl shadow-xl border border-pink-200 bg-white/90 backdrop-blur-sm">
      <CardHeader className="relative p-6 sm:p-8">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 text-gray-600 hover:text-pink-700"
          onClick={onBack}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Back to course overview</span>
        </Button>
        <div className="flex flex-col items-center text-center pt-8">
          <CardTitle className="text-4xl font-extrabold text-gray-900 mb-3 leading-tight">{module.title}</CardTitle>
          <CardDescription className="mt-2 text-xl text-muted-foreground max-w-2xl">
            {module.description}
          </CardDescription>
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-base text-gray-700">
            <div className="flex items-center bg-pink-100 text-pink-800 px-4 py-2 rounded-full shadow-sm">
              <Clock className="h-5 w-5 mr-2" />
              <span>{module.duration}</span>
            </div>
            <div className="flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full shadow-sm">
              <PlayCircle className="h-5 w-5 mr-2" />
              <span>{module.lessons.length} Lessons</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-8 p-6 sm:p-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">Lessons in this Module</h3>
        <div className="grid gap-6">
          {module.lessons.map((lesson: Lesson, index: number) => (
            <Card
              key={lesson.id}
              className="p-5 border border-gray-200 hover:border-pink-400 hover:shadow-lg transition-all duration-300 cursor-pointer bg-white"
              onClick={() => onLessonSelect(lesson.id)}
            >
              <CardTitle className="text-2xl font-semibold text-gray-800 mb-2">
                Lesson {index + 1}: {lesson.title}
              </CardTitle>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mt-3">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-pink-500" />
                  <span>{lesson.duration}</span>
                </div>
                {lesson.videoUrl && (
                  <div className="flex items-center">
                    <Youtube className="h-4 w-4 mr-1 text-red-500" />
                    <span>Video Available</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
