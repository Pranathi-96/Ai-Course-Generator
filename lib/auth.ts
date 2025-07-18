import type { User } from "@/types/course"

// This is a mock authentication library. In a real application,
// you would integrate with a service like NextAuth.js, Clerk, or Supabase Auth.

// In-memory mock user database
const MOCK_USERS: User[] = [
  {
    id: "user-123",
    name: "Demo User",
    email: "demo@example.com",
    avatarUrl: "/placeholder.svg?height=32&width=32",
  },
]

// Simulate a session token in localStorage
const MOCK_SESSION_KEY = "mock_auth_session_user_id"

export async function signIn(email: string, password: string): Promise<{ user: User } | { error: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

  const user = MOCK_USERS.find((u) => u.email === email)

  if (user && password === "password") {
    // In a real app, you'd generate a secure token here
    if (typeof window !== "undefined") {
      localStorage.setItem(MOCK_SESSION_KEY, user.id)
    }
    return { user }
  } else {
    return { error: "Invalid credentials" }
  }
}

export async function signUp(email: string, password: string): Promise<{ user: User } | { error: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API call

  if (MOCK_USERS.some((u) => u.email === email)) {
    return { error: "User with this email already exists." }
  }

  // For simplicity, all new users get a generic name and avatar
  const newUser: User = {
    id: `user-${Date.now()}`, // Unique ID
    name: email.split("@")[0] || "New User", // Simple name from email
    email: email,
    avatarUrl: "/placeholder.svg?height=32&width=32",
  }

  MOCK_USERS.push(newUser) // Add to our mock database

  if (typeof window !== "undefined") {
    localStorage.setItem(MOCK_SESSION_KEY, newUser.id)
  }
  return { user: newUser }
}

export async function signOut(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API call
  if (typeof window !== "undefined") {
    localStorage.removeItem(MOCK_SESSION_KEY)
  }
}

export async function getCurrentUser(): Promise<User | null> {
  await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API call
  if (typeof window !== "undefined") {
    const userId = localStorage.getItem(MOCK_SESSION_KEY)
    if (userId) {
      return MOCK_USERS.find((u) => u.id === userId) || null
    }
  }
  return null
}
