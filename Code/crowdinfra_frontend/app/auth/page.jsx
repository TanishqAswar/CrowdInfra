'use client'
import { useState } from 'react'
import Login from '../components/login'
import SignUpForm from '../components/signup'
import Navbar from '../components/navbar'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false)

  return (
    <>
      {/* <Navbar /> */}
      {isLogin ? (
        <Login setIsLogin={setIsLogin}  />
      ) : (
        <SignUpForm setIsLogin={setIsLogin} />
      )}
    </>
  )
}
