'use client'
import { useState } from 'react'
import Login from '../components/login'
import SignUpForm from '../components/signup'
import Navbar from '../components/navbar'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false)

  return (
    <div className="flex min-h-screen bg-black w-full items-center justify-center">
      <div className="relative flex w-full h-full  shadow-lg rounded-2xl overflow-hidden">
        {/* Image Section */}
        <div 
          className={`flex-1 flex items-center justify-center transition-all duration-500 ease-in-out ${
            isLogin ? 'order-last' : ''
          } bg-black text-white`}
        >
          <img 
            src={isLogin ? 'https://images.unsplash.com/photo-1597310032540-e0adcfc7fdb0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHVibGljJTIwcHJvdGVzdHxlbnwwfDF8MHx8fDA%3D' : 'https://images.unsplash.com/photo-1597310032540-e0adcfc7fdb0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHVibGljJTIwcHJvdGVzdHxlbnwwfDF8MHx8fDA%3D'}
            alt="Auth Illustration"
            className="w-full transition-all duration-500 ease-in-out"
          />
        </div>
        
        {/* Form Section */}
        <div className="flex-1 flex flex-col items-center justify-center ">
           {/* Toggle Link */}
           <p className="mt-8 text-base text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-blue-500 hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
          {isLogin ? (
            <Login setIsLogin={setIsLogin} />
          ) : (
            <SignUpForm setIsLogin={setIsLogin} />
          )}
        </div>
      </div>
    </div>
  )
}
