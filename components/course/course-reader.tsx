"use client"

import { useState } from "react"
import type { Course, Module, Lesson } from "@/types/course"
import CourseViewer from "./course-viewer"
import ModuleViewer from "./module-viewer"
import LessonViewer from "./lesson-viewer"

interface CourseReaderProps {
  course: Course
  onBackToGenerator: () => void
}

export default function CourseReader({ course, onBackToGenerator }: CourseReaderProps) {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)

  const handleModuleSelect = (moduleId: string) => {
    const module = course.modules.find((m) => m.id === moduleId)
    if (module) {
      setSelectedModule(module)
      setSelectedLesson(null)
    }
  }

  const handleBackToCourseViewer = () => {
    setSelectedModule(null)
    setSelectedLesson(null)
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

  const formatContent = (content: string) => {
    return content.split("\n").map((line, index) => {
      if (line.startsWith("# ")) {
        return (
          <h1 key={index} className="text-3xl font-bold mt-8 mb-6 text-gray-900">
            {line.substring(2)}
          </h1>
        )
      }
      if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="text-2xl font-semibold mt-6 mb-4 text-gray-800">
            {line.substring(3)}
          </h2>
        )
      }
      if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="text-xl font-medium mt-5 mb-3 text-gray-700">
            {line.substring(4)}
          </h3>
        )
      }
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="ml-6 mb-2 text-gray-700">
            {line.substring(2)}
          </li>
        )
      }
      if (line.match(/^\d+\. /)) {
        return (
          <li key={index} className="ml-6 mb-2 list-decimal text-gray-700">
            {line.substring(line.indexOf(". ") + 2)}
          </li>
        )
      }
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <p key={index} className="font-semibold mb-3 text-gray-800">
            {line.slice(2, -2)}
          </p>
        )
      }
      if (line.trim() === "") {
        return <div key={index} className="mb-4" />
      }
      return (
        <p key={index} className="mb-3 leading-relaxed text-gray-700">
          {line}
        </p>
      )
    })
  }

  if (!selectedModule) {
    return <CourseViewer course={course} onBack={onBackToGenerator} onModuleSelect={handleModuleSelect} />
  }

  if (!selectedLesson) {
    return (
      <ModuleViewer module={selectedModule} onBack={handleBackToCourseViewer} onLessonSelect={handleLessonSelect} />
    )
  }

  return <LessonViewer lesson={selectedLesson} onBack={handleBackToModuleViewer} />
}
