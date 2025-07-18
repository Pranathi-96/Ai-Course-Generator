"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"

export default function LoginForm() {
  const [email, setEmail] = useState("demo@example.com")
  const [password, setPassword] = useState("password")
  const { signIn, isLoading, error } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signIn(email, password)
  }

  return (
    <Card className="w-full max-w-md shadow-xl border border-purple-200 bg-white/90 backdrop-blur-sm">
      <CardHeader className="space-y-1 text-center p-6">
        <CardTitle className="text-3xl font-bold text-gray-900">Welcome Back</CardTitle>
        <CardDescription className="text-lg text-muted-foreground">Sign in to access your courses.</CardDescription>
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
              placeholder="m@example.com"
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
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Button
            type="submit"
            className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center p-6">
        <p className="text-sm text-muted-foreground">
          Use email: `demo@example.com` and password: `password` to log in.
        </p>
      </CardFooter>
    </Card>
  )
}
