"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, LogIn, UserPlus } from "lucide-react"

interface WelcomeScreenProps {
  onSwitchToLogin: () => void
  onSwitchToRegister: () => void
}

export default function WelcomeScreen({ onSwitchToLogin, onSwitchToRegister }: WelcomeScreenProps) {
  return (
    <Card className="w-full max-w-md shadow-xl border border-purple-200 bg-white/90 backdrop-blur-sm text-center">
      <CardHeader className="space-y-4 p-6">
        <div className="flex justify-center">
          <Sparkles className="h-16 w-16 text-purple-600" />
        </div>
        <CardTitle className="text-4xl font-extrabold text-gray-900 leading-tight">
          Welcome to AI Course Generator
        </CardTitle>
        <CardDescription className="text-lg text-muted-foreground">
          Unlock personalized learning experiences with AI-powered course creation.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 p-6">
        <Button
          onClick={onSwitchToRegister}
          className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
        >
          <UserPlus className="mr-2 h-5 w-5" />
          Get Started - Register
        </Button>
        <Button
          variant="outline"
          onClick={onSwitchToLogin}
          className="w-full py-3 text-lg font-semibold border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent shadow-md"
        >
          <LogIn className="mr-2 h-5 w-5" />
          Already have an account? Login
        </Button>
      </CardContent>
    </Card>
  )
}
