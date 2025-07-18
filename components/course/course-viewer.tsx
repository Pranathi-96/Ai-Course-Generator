"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Course, Module } from "@/types/course"
import { ChevronLeft, Clock, BookOpen } from "lucide-react"

interface CourseViewerProps {
  course: Course
  onBack: () => void
  onModuleSelect: (moduleId: string) => void
}

export default function CourseViewer({ course, onBack, onModuleSelect }: CourseViewerProps) {
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader className="relative">
        <Button variant="ghost" size="icon" className="absolute top-4 left-4" onClick={onBack}>
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Back to generator</span>
        </Button>
        <div className="flex flex-col items-center text-center pt-8">
          <Image
            src={course.imageUrl || "/placeholder.svg?height=200&width=300"}
            alt={`Image for ${course.title}`}
            width={300}
            height={200}
            className="rounded-md object-cover mb-4"
          />
          <CardTitle className="text-3xl font-bold">{course.title}</CardTitle>
          <CardDescription className="mt-2 text-lg text-muted-foreground">{course.description}</CardDescription>
          <div className="flex items-center space-x-4 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{course.estimatedDuration}</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>{course.modules.length} Modules</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-6">
        <h3 className="text-2xl font-semibold mb-4">Course Modules</h3>
        <div className="grid gap-4">
          {course.modules.map((module: Module, index: number) => (
            <Card
              key={module.id}
              className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onModuleSelect(module.id)}
            >
              <CardTitle className="text-xl font-semibold">{module.title}</CardTitle>
              <CardDescription className="mt-1 text-muted-foreground">{module.description}</CardDescription>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
                <Clock className="h-4 w-4" />
                <span>{module.duration}</span>
                <BookOpen className="h-4 w-4 ml-4" />
                <span>{module.lessons.length} Lessons</span>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
