'use client'
import { Geist, Geist_Mono } from 'next/font/google'
import { useEffect } from 'react'
import 'tailwindcss/tailwind.css'

import './globals.css'
import { UserProvider } from './components/user_context'
import { APIProvider } from '@vis.gl/react-google-maps'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'
import Cursor from './components/ui/cursor'
// import { useLoadScript } from "@react-google-maps/api"

// const libraries = ["places"] // Declare globally

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({ children }) {
  const [isLogin, setIsLogin] = useState(false)

  // State to track whether to show cursor based on performance
  const [showCursor, setShowCursor] = useState(true);
  
  // Effect to monitor performance and disable cursor if needed
  useEffect(() => {
    let lastTime = performance.now();
    let frameCount = 0;
    let lowPerformanceCount = 0;
    
    const checkPerformance = () => {
      const now = performance.now();
      const elapsed = now - lastTime;
      frameCount++;
      
      // Check every second
      if (elapsed >= 1000) {
        const fps = frameCount / (elapsed / 1000);
        
        // If FPS is below threshold, increment counter
        if (fps < 30) {
          lowPerformanceCount++;
          if (lowPerformanceCount >= 3 && showCursor) {
            setShowCursor(false);
          }
        } else {
          // Reset counter if performance improves
          lowPerformanceCount = 0;
          if (!showCursor) {
            setShowCursor(true);
          }
        }
        
        frameCount = 0;
        lastTime = now;
      }
      
      requestAnimationFrame(checkPerformance);
    };
    
    requestAnimationFrame(checkPerformance);
    
    return () => cancelAnimationFrame(checkPerformance);
  }, [showCursor]);

  return (
    <html lang='en' style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* {showCursor && <Cursor style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999 }} />} */}
        <UserProvider>
          <ToastContainer position='top-right' autoClose={3000} />
          <APIProvider
            apiKey={'AIzaSyCBUWqISO_DOQUKhwb7q09wQteK87WOEec'}
            libraries={['places']}
          >
            {children}
          </APIProvider>
        </UserProvider>
      </body>
    </html>
  )
}
