"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { signIn as authSignIn, signOut as authSignOut, signUp as authSignUp, getCurrentUser } from "@/lib/auth"
import type { User } from "@/types/course"
import type { ReactNode } from "react" // Import ReactNode

interface AuthContextType {
  user: User | null
  isLoading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  // Corrected type for children
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true)
      const currentUser = await getCurrentUser()
      setUser(currentUser)
      setIsLoading(false)
    }
    fetchUser()
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    const result = await authSignIn(email, password)
    if ("user" in result) {
      setUser(result.user)
      setIsLoading(false)
      return { success: true }
    } else {
      setError(result.error)
      setIsLoading(false)
      return { success: false, error: result.error }
    }
  }, [])

  const signUp = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    const result = await authSignUp(email, password)
    if ("user" in result) {
      setUser(result.user)
      setIsLoading(false)
      return { success: true }
    } else {
      setError(result.error)
      setIsLoading(false)
      return { success: false, error: result.error }
    }
  }, [])

  const signOut = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    await authSignOut()
    setUser(null)
    setIsLoading(false)
  }, [])

  const value: AuthContextType = { user, isLoading, error, signIn, signUp, signOut }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
