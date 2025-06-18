import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
export async function POST(request: Request) {
  try {
    // Get the username and password from the request
    const { username, password } = await request.json()

    // Get credentials from environment variables
    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD
    const jwtSecret = process.env.JWT_SECRET
    const cookieStore = await cookies()
    // Check if environment variables are set
    if (!adminEmail || !adminPassword || !jwtSecret) {
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Validate credentials against environment variables
    if (username === adminEmail && password === adminPassword) {
      // Create JWT token
      const token = jwt.sign(
        { 
          username: username,
          isAdmin: true,
          loginTime: new Date().toISOString()
        },
        jwtSecret,
        { expiresIn: '1h' } // Token expires in  hours
      )

      cookieStore.set('authToken', token, { httpOnly: true, maxAge: 60 * 60 }) // Set cookie with 1 hour expiration
      console.log('Token set in cookies:', token)


      return NextResponse.json({
        success: true,
        token: token,
        message: 'Login successful'
      })
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid username or password' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: 'Server error occurred' },
      { status: 500 }
    )
  }
}