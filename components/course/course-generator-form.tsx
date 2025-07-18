"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { CourseGenerator } from "@/lib/course-generator"
import type { Course } from "@/types/course"
import { Loader2, Sparkles } from "lucide-react"

interface CourseGeneratorFormProps {
  onCourseGenerated: (course: Course) => void
}

export default function CourseGeneratorForm({ onCourseGenerated }: CourseGeneratorFormProps) {
  const [topic, setTopic] = useState("")
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "advanced" | null>(null)
  const [audience, setAudience] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      const course = await CourseGenerator.generateCourse(topic, difficulty, audience)
      onCourseGenerated(course)
    } catch (err) {
      console.error("Error generating course:", err)
      setError("Failed to generate course. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl shadow-xl border border-green-200 bg-white/90 backdrop-blur-sm">
      <CardHeader className="text-center p-6">
        <CardTitle className="text-3xl font-bold text-gray-900">AI Course Generator</CardTitle>
        <CardDescription className="text-lg text-muted-foreground">
          Generate a comprehensive course on any topic, tailored to your needs.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="topic" className="text-lg font-medium text-gray-700">
              Course Topic
            </Label>
            <Input
              id="topic"
              placeholder="e.g., Artificial Intelligence, Web Development, Digital Marketing"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              className="p-3 text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="difficulty" className="text-lg font-medium text-gray-700">
                Difficulty Level
              </Label>
              <Select
                value={difficulty}
                onValueChange={(value) => setDifficulty(value as "beginner" | "intermediate" | "advanced")}
              >
                <SelectTrigger
                  id="difficulty"
                  className="p-3 text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                >
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="audience" className="text-lg font-medium text-gray-700">
                Target Audience
              </Label>
              <Input
                id="audience"
                placeholder="e.g., Beginners, Developers, Marketers"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                required
                className="p-3 text-base border-gray-300 focus:border-pink-500 focus:ring-pink-500"
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Button
            type="submit"
            className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating Course...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Course
              </>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center p-6">
        <p className="text-sm text-muted-foreground">Course generation may take a few moments.</p>
      </CardFooter>
    </Card>
  )
}
