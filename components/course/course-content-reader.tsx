"use client"

import { useState } from "react"
import type { Course, Module, Lesson } from "@/types/course"
import CourseOverviewCard from "./course-overview-card"
import ModuleViewer from "./module-viewer"
import LessonViewer from "./lesson-viewer"
import { Button } from "@/components/ui/button"
import { BookOpen, LayoutList, Youtube, Lightbulb, HelpCircle, ChevronLeft } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CourseContentReaderProps {
  course: Course
  onBackToGenerator: () => void
  onModuleSelect: (moduleId: string) => void // This is for navigating from overview to module
}

export default function CourseContentReader({ course, onBackToGenerator }: CourseContentReaderProps) {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [readMode, setReadMode] = useState(true) // Start in read mode by default

  const handleInternalModuleSelect = (moduleId: string) => {
    const module = course.modules.find((m) => m.id === moduleId)
    if (module) {
      setSelectedModule(module)
      setSelectedLesson(null)
      setReadMode(false) // Switch to overview if a module is selected
    }
  }

  const handleBackToCourseOverview = () => {
    setSelectedModule(null)
    setSelectedLesson(null)
    setReadMode(false) // Ensure we go back to the module list overview
  }

  const handleLessonSelect = (lessonId: string) => {
    const lesson = selectedModule?.lessons.find((l) => l.id === lessonId)
    if (lesson) {
      setSelectedLesson(lesson)
    }
  }

  const handleBackToModuleViewer = () => {
    setSelectedLesson(null)
  }

  const renderFullCourseContent = () => {
    return (
      <Card className="w-full max-w-4xl shadow-xl border border-orange-200 bg-white/90 backdrop-blur-sm">
        <CardHeader className="relative p-6 sm:p-8 text-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 text-gray-600 hover:text-orange-700"
            onClick={onBackToGenerator}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Back to generator</span>
          </Button>
          <CardTitle className="text-4xl font-extrabold text-gray-900 mb-3 leading-tight">{course.title}</CardTitle>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{course.description}</p>
          <div className="flex justify-center gap-4 mt-6">
            <Button
              onClick={() => setReadMode(true)}
              variant={readMode ? "default" : "outline"}
              className={
                readMode
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                  : "text-orange-700 border-orange-300 hover:bg-orange-50"
              }
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Read Mode
            </Button>
            <Button
              onClick={() => setReadMode(false)}
              variant={readMode ? "outline" : "default"}
              className={
                !readMode
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                  : "text-purple-700 border-purple-300 hover:bg-purple-50"
              }
            >
              <LayoutList className="h-5 w-5 mr-2" />
              Overview Mode
            </Button>
          </div>
        </CardHeader>
        <CardContent className="mt-8 p-6 sm:p-8 space-y-12">
          {course.modules.map((module, moduleIndex) => (
            <div key={module.id} className="space-y-8">
              <div className="border-l-4 border-orange-500 pl-6 py-2 bg-orange-50 rounded-r-lg shadow-sm">
                <h2 className="text-3xl font-bold text-orange-800 mb-2">
                  Module {moduleIndex + 1}: {module.title}
                </h2>
                <p className="text-orange-700 text-lg">{module.description}</p>
              </div>

              <div className="space-y-10 ml-6">
                {module.lessons.map((lesson, lessonIndex) => (
                  <div key={lesson.id} className="space-y-6 p-4 border border-gray-100 rounded-lg shadow-sm bg-white">
                    <div className="flex items-start gap-4">
                      <div className="bg-orange-100 text-orange-600 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold flex-shrink-0 mt-1 shadow-sm">
                        {lessonIndex + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{lesson.title}</h3>
                        <div className="flex items-center gap-3 text-base text-gray-600">
                          <span>{lesson.duration}</span>
                          {lesson.videoUrl && (
                            <span className="flex items-center gap-1 text-red-500">
                              <Youtube className="h-4 w-4" /> Video
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      className="prose prose-lg dark:prose-invert max-w-none text-black leading-relaxed
                                  prose-h1:mb-6 prose-h2:mb-4 prose-h3:mb-3 prose-p:mb-4 prose-li:mb-2
                                  prose-h1:text-black prose-h2:text-black prose-h3:text-black prose-p:text-black prose-li:text-black prose-strong:text-black prose-em:text-black ml-14"
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{lesson.content}</ReactMarkdown>
                    </div>

                    {lesson.videoUrl && (
                      <div className="space-y-4 p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg shadow-md border border-red-200 ml-14">
                        <h4 className="text-xl font-semibold flex items-center text-red-800">
                          <Youtube className="h-6 w-6 mr-2 text-red-600" />
                          Video Lecture: {lesson.videoTitle}
                        </h4>
                        <p className="text-red-700 text-base">{lesson.videoDescription}</p>
                        <Button asChild className="bg-red-600 hover:bg-red-700 text-white shadow-md">
                          <a href={lesson.videoUrl} target="_blank" rel="noopener noreferrer">
                            Watch on YouTube
                          </a>
                        </Button>
                      </div>
                    )}

                    {lesson.keyPoints && lesson.keyPoints.length > 0 && (
                      <div className="space-y-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg shadow-md border border-green-200 ml-14">
                        <h4 className="text-xl font-semibold flex items-center text-green-800">
                          <Lightbulb className="h-6 w-6 mr-2 text-green-600" />
                          Key Takeaways
                        </h4>
                        <ul className="list-disc list-inside space-y-2 text-lg text-green-800">
                          {lesson.keyPoints.map((point, idx) => (
                            <li key={idx}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {lesson.questions && lesson.questions.length > 0 && (
                      <div className="space-y-4 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg shadow-md border border-purple-200 ml-14">
                        <h4 className="text-xl font-semibold flex items-center text-purple-800">
                          <HelpCircle className="h-6 w-6 mr-2 text-purple-600" />
                          Questions to Ponder
                        </h4>
                        <div className="grid gap-4">
                          {lesson.questions.map((question, qIdx) => (
                            <div key={question.id} className="space-y-2">
                              <p className="text-lg font-medium text-purple-800">{question.question}</p>
                              <details className="mt-2">
                                <summary className="cursor-pointer text-purple-700 font-semibold text-base hover:underline">
                                  Show Answer
                                </summary>
                                <div className="mt-2 p-3 bg-purple-100 rounded-md border border-purple-200">
                                  <p className="text-purple-800 text-base">{question.answer}</p>
                                </div>
                              </details>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  if (!selectedModule && readMode) {
    return renderFullCourseContent()
  }

  if (!selectedModule) {
    return <CourseOverviewCard course={course} onBack={onBackToGenerator} onModuleSelect={handleInternalModuleSelect} />
  }

  if (!selectedLesson) {
    return (
      <ModuleViewer module={selectedModule} onBack={handleBackToCourseOverview} onLessonSelect={handleLessonSelect} />
    )
  }

  return <LessonViewer lesson={selectedLesson} onBack={handleBackToModuleViewer} />
}
