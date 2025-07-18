"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Course } from "@/types/course"
import Image from "next/image"
import { Clock, BookOpen, Sparkles, History } from "lucide-react"

interface CourseHistoryProps {
  courses: Course[]
  onCourseSelect: (course: Course) => void
}

export default function CourseHistory({ courses, onCourseSelect }: CourseHistoryProps) {
  return (
    <Card className="w-full max-w-4xl shadow-xl border border-blue-200 bg-white/90 backdrop-blur-sm">
      <CardHeader className="relative p-6 sm:p-8 text-center">
        <CardTitle className="text-4xl font-extrabold text-gray-900 mb-3 leading-tight">Your Courses</CardTitle>
        <CardDescription className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Browse and revisit the courses you&apos;ve generated.
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-8 p-6 sm:p-8">
        {courses.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <History className="h-16 w-16 text-gray-400 mx-auto" />
            <p className="text-xl text-muted-foreground">You haven&apos;t generated any courses yet.</p>
            <Button
              onClick={() => window.location.reload()} // Simple way to go back to generator
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Generate Your First Course
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="p-4 border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 cursor-pointer bg-white flex flex-col"
                onClick={() => onCourseSelect(course)}
              >
                <div className="relative w-full h-36 rounded-md overflow-hidden mb-4">
                  <Image
                    src={course.imageUrl || "/placeholder.svg?height=144&width=256"}
                    alt={`Image for ${course.title}`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">{course.title}</CardTitle>
                <CardDescription className="text-gray-600 text-sm line-clamp-3 flex-grow">
                  {course.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2 mt-3 text-xs text-gray-500">
                  <div className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{course.estimatedDuration}</span>
                  </div>
                  <div className="flex items-center bg-green-50 text-green-700 px-2 py-1 rounded-full">
                    <BookOpen className="h-3 w-3 mr-1" />
                    <span>{course.modules.length} Modules</span>
                  </div>
                  <div className="flex items-center bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full capitalize">
                    <span>{course.difficulty}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="mt-4 w-full border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                >
                  View Course
                </Button>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
