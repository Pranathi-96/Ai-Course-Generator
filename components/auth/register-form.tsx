"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"

interface RegisterFormProps {
  onSwitchToLogin: () => void
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { signUp, isLoading, error } = useAuth()
  const [localError, setLocalError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null) // Clear previous local errors

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match.")
      return
    }

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters long.")
      return
    }

    const result = await signUp(email, password)
    if (!result.success) {
      setLocalError(result.error || "Registration failed. Please try again.")
    }
  }

  return (
    <Card className="w-full max-w-md shadow-xl border border-purple-200 bg-white/90 backdrop-blur-sm">
      <CardHeader className="space-y-1 text-center p-6">
        <CardTitle className="text-3xl font-bold text-gray-900">Create Your Account</CardTitle>
        <CardDescription className="text-lg text-muted-foreground">
          Sign up to generate personalized AI courses.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 p-6">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-base font-medium text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-3 text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" className="text-base font-medium text-gray-700">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-3 text-base border-gray-300 focus:border-pink-500 focus:ring-pink-500"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password" className="text-base font-medium text-gray-700">
              Confirm Password
            </Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="p-3 text-base border-gray-300 focus:border-pink-500 focus:ring-pink-500"
            />
          </div>
          {(error || localError) && <p className="text-red-500 text-sm text-center">{error || localError}</p>}
          <Button
            type="submit"
            className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center p-6">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button variant="link" onClick={onSwitchToLogin} className="p-0 h-auto text-purple-600 hover:text-purple-800">
            Login here
          </Button>
        </p>
      </CardFooter>
    </Card>
  )
}
