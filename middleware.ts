import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export default async function middleware(request: NextRequest) {
  // Define which routes should be protected
  const protectedPaths = ['/dashboard', '/admin', '/profile']
  const currentPath = request.nextUrl.pathname
  
  // Check if the current path needs protection
  const isProtectedPath = protectedPaths.some(path => 
    currentPath.startsWith(path)
  )
  
  if (isProtectedPath) {
    // Look for token in cookies or Authorization header
    let token = request.cookies.get('authToken')?.value
    
    // If no token in cookies, check Authorization header
    if (!token) {
      const authHeader = request.headers.get('authorization')
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7)
      }
    }
    
    // If no token found, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    
    try {
      // Verify the token using JOSE
      const jwtSecret = process.env.JWT_SECRET
      if (!jwtSecret) {
        console.error('JWT_SECRET not found in environment variables')
        return NextResponse.redirect(new URL('/auth/login', request.url))
      }
      
      // Convert secret to Uint8Array for JOSE
      const secret = new TextEncoder().encode(jwtSecret)
      
      // Verify token
      const { payload } = await jwtVerify(token, secret)
      
      // Token is valid, allow the request to continue
      return NextResponse.next()
      
    } catch (error) {
      // Token is invalid or expired, redirect to login
      console.log('Token verification failed:', error)
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }
  
  // If path is not protected, allow the request to continue
  return NextResponse.next()
}