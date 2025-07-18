"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Course, Module } from "@/types/course"
import { ChevronLeft, Clock, BookOpen } from "lucide-react"

interface CourseOverviewCardProps {
  course: Course
  onBack: () => void
  onModuleSelect: (moduleId: string) => void
}

export default function CourseOverviewCard({ course, onBack, onModuleSelect }: CourseOverviewCardProps) {
  return (
    <Card className="w-full max-w-4xl shadow-xl border border-purple-200 bg-white/90 backdrop-blur-sm">
      <CardHeader className="relative p-6 sm:p-8">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 text-gray-600 hover:text-purple-700"
          onClick={onBack}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Back to generator</span>
        </Button>
        <div className="flex flex-col items-center text-center pt-8">
          <div className="relative w-full max-w-sm h-48 rounded-lg overflow-hidden mb-6 shadow-lg">
            <Image
              src={course.imageUrl || "/placeholder.svg?height=200&width=300"}
              alt={`Image for ${course.title}`}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
          <CardTitle className="text-4xl font-extrabold text-gray-900 mb-3 leading-tight">{course.title}</CardTitle>
          <CardDescription className="mt-2 text-xl text-muted-foreground max-w-2xl">
            {course.description}
          </CardDescription>
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-base text-gray-700">
            <div className="flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full shadow-sm">
              <Clock className="h-5 w-5 mr-2" />
              <span>{course.estimatedDuration}</span>
            </div>
            <div className="flex items-center bg-pink-100 text-pink-800 px-4 py-2 rounded-full shadow-sm">
              <BookOpen className="h-5 w-5 mr-2" />
              <span>{course.modules.length} Modules</span>
            </div>
            <div className="flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full shadow-sm capitalize">
              <span>{course.difficulty}</span>
            </div>
            <div className="flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full shadow-sm">
              <span>For {course.audience}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-8 p-6 sm:p-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">Course Modules</h3>
        <div className="grid gap-6">
          {course.modules.map((module: Module, index: number) => (
            <Card
              key={module.id}
              className="p-5 border border-gray-200 hover:border-purple-400 hover:shadow-lg transition-all duration-300 cursor-pointer bg-white"
              onClick={() => onModuleSelect(module.id)}
            >
              <CardTitle className="text-2xl font-semibold text-gray-800 mb-2">
                Module {index + 1}: {module.title}
              </CardTitle>
              <CardDescription className="mt-1 text-gray-600">{module.description}</CardDescription>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mt-3">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-purple-500" />
                  <span>{module.duration}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1 text-pink-500" />
                  <span>{module.lessons.length} Lessons</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
