'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight } from 'lucide-react'
import axios from 'axios'
import Cookies from 'js-cookie'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  // Submit login form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('') // Reset error state // Debugging log

    try {
      const response = await axios.post('https://be-most.smktelkom-mlg.sch.id/api/v1/auth/', {
        username,
        password,
      }) // Debugging log

      if (response.data.token) {
        // Save token to cookies using js-cookie
        Cookies.set('token', response.data.token, {
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          expires: 7 // 7 days
        })

        router.push('/dashboard')
      } else {
        setError('Invalid response from server. Token missing.')
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.message || 'Login failed. Please check your credentials.')
      } else {
        setError('An error occurred. Please try again.')
      }
      console.error('Login error:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-red-600">BUPATI CUP</CardTitle>
          <p className="text-center text-gray-600">Enter your credentials to access your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-2 text-sm text-red-600 bg-red-100 rounded">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  type="text" 
                  placeholder="Enter your username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white">
              Sign In
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
