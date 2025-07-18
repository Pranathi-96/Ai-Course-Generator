"use client"

import { useState, useCallback, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import LoginForm from "@/components/auth/login-form"
import RegisterForm from "@/components/auth/register-form"
import WelcomeScreen from "@/components/auth/welcome-screen"
import CourseGeneratorForm from "@/components/course/course-generator-form"
import CourseContentReader from "@/components/course/course-content-reader"
import ModuleViewer from "@/components/course/module-viewer"
import LessonViewer from "@/components/course/lesson-viewer"
import CourseHistory from "@/components/course/course-history"
import type { Course, Module, Lesson } from "@/types/course"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GraduationCap, LogOut, History, Sparkles } from "lucide-react"

type ViewMode = "generator" | "course-content" | "module-detail" | "lesson-detail" | "course-history"
type AuthMode = "welcome" | "login" | "register"

export default function HomePage() {
  const { user, isLoading: authLoading, signOut } = useAuth()
  const [generatedCourse, setGeneratedCourse] = useState<Course | null>(null)
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>("generator")
  const [savedCourses, setSavedCourses] = useState<Course[]>([])
  const [authMode, setAuthMode] = useState<AuthMode>("welcome")

  // Load courses from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCourses = localStorage.getItem("generatedCourses")
      if (storedCourses) {
        setSavedCourses(JSON.parse(storedCourses))
      }
    }
  }, [])

  // Save courses to localStorage whenever savedCourses changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("generatedCourses", JSON.stringify(savedCourses))
    }
  }, [savedCourses])

  const handleCourseGenerated = useCallback(
    (course: Course) => {
      setGeneratedCourse(course)
      // Ensure the course has a userId before saving
      const courseWithUserId = { ...course, userId: user?.id || "anonymous" } // Fallback for safety
      setSavedCourses((prevCourses) => [...prevCourses, courseWithUserId])
      setViewMode("course-content")
      setSelectedModule(null)
      setSelectedLesson(null)
    },
    [setSavedCourses, user], // Add user to dependency array
  )

  const handleBackToGenerator = useCallback(() => {
    setGeneratedCourse(null)
    setViewMode("generator")
    setSelectedModule(null)
    setSelectedLesson(null)
  }, [])

  const handleModuleSelect = useCallback(
    (moduleId: string) => {
      const module = generatedCourse?.modules.find((m) => m.id === moduleId)
      if (module) {
        setSelectedModule(module)
        setViewMode("module-detail")
        setSelectedLesson(null)
      }
    },
    [generatedCourse],
  )

  const handleBackToCourseContent = useCallback(() => {
    setSelectedModule(null)
    setViewMode("course-content")
    setSelectedLesson(null)
  }, [])

  const handleLessonSelect = useCallback(
    (lessonId: string) => {
      const lesson = selectedModule?.lessons.find((l) => l.id === lessonId)
      if (lesson) {
        setSelectedLesson(lesson)
        setViewMode("lesson-detail")
      }
    },
    [selectedModule],
  )

  const handleBackToModuleDetail = useCallback(() => {
    setSelectedLesson(null)
    setViewMode("module-detail")
  }, [])

  const handleViewCourseFromHistory = useCallback((course: Course) => {
    setGeneratedCourse(course)
    setViewMode("course-content")
    setSelectedModule(null)
    setSelectedLesson(null)
  }, [])

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
        <p>Loading authentication...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
        {/* Background gradient for "interesting" effect */}
        <div className="absolute inset-0 animate-gradient-xy bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400 opacity-70" />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

        <div className="relative z-10">
          {authMode === "welcome" && (
            <WelcomeScreen
              onSwitchToLogin={() => setAuthMode("login")}
              onSwitchToRegister={() => setAuthMode("register")}
            />
          )}
          {authMode === "login" && (
            <>
              <LoginForm />
              <div className="mt-4 text-center">
                <p className="text-white text-sm">
                  Don't have an account?{" "}
                  <Button
                    variant="link"
                    onClick={() => setAuthMode("register")}
                    className="p-0 h-auto text-white/80 hover:text-white"
                  >
                    Register here
                  </Button>
                </p>
              </div>
            </>
          )}
          {authMode === "register" && (
            <>
              <RegisterForm onSwitchToLogin={() => setAuthMode("login")} />
              <div className="mt-4 text-center">
                <p className="text-white text-sm">
                  Already have an account?{" "}
                  <Button
                    variant="link"
                    onClick={() => setAuthMode("login")}
                    className="p-0 h-auto text-white/80 hover:text-white"
                  >
                    Login here
                  </Button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  // Filter courses for the current user
  const userCourses = savedCourses.filter((course) => course.userId === user.id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg shadow-md">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">AI Course Generator</h1>
            </div>

            <div className="flex items-center gap-4">
              {viewMode !== "course-history" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode("course-history")}
                  className="text-gray-700 hover:bg-gray-100"
                >
                  <History className="h-4 w-4 mr-2" />
                  My Courses
                </Button>
              )}
              {viewMode === "course-history" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode("generator")}
                  className="text-gray-700 hover:bg-gray-100"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate New
                </Button>
              )}
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 border-2 border-purple-400">
                  <AvatarImage src={user.avatarUrl || "/placeholder.svg?height=32&width=32"} alt={user.name} />
                  <AvatarFallback className="bg-purple-100 text-purple-800">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={signOut}
                className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] py-12 px-4">
        {viewMode === "generator" && (
          <div className="space-y-8 text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Unleash Your Learning Potential</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Generate personalized, in-depth educational courses on any topic with the power of AI. Dive into
              structured lessons, engaging videos, and thought-provoking questions.
            </p>
            <CourseGeneratorForm onCourseGenerated={handleCourseGenerated} />
          </div>
        )}

        {viewMode === "course-history" && (
          <CourseHistory courses={userCourses} onCourseSelect={handleViewCourseFromHistory} />
        )}

        {viewMode === "course-content" && generatedCourse && (
          <CourseContentReader
            course={generatedCourse}
            onBackToGenerator={handleBackToGenerator}
            onModuleSelect={handleModuleSelect}
          />
        )}

        {viewMode === "module-detail" && selectedModule && (
          <ModuleViewer
            module={selectedModule}
            onBack={handleBackToCourseContent}
            onLessonSelect={handleLessonSelect}
          />
        )}

        {viewMode === "lesson-detail" && selectedLesson && (
          <LessonViewer lesson={selectedLesson} onBack={handleBackToModuleDetail} />
        )}
      </main>
    </div>
  )
}
