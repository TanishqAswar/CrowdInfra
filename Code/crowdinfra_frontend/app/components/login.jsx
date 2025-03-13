'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '../components/navbar'

const LoginPage = ({ setIsLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email is invalid'

    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters'

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        alert('Login successful! Redirecting...')
        setIsLogin(true)
      } catch (error) {
        console.error('Login error:', error)
        setErrors({ submit: 'Failed to login. Please try again.' })
      } finally {
        setIsSubmitting(false)
      }
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-5 text-white'>
      {/* <Navbar /> */}

      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-md mx-auto'>
          <div className='bg-gray-800/50 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-700/50 p-8'>
            <div className='text-center mb-8'>
              <h1 className='text-3xl font-bold text-white'>Login</h1>
              <p className='text-blue-400 mt-2'>
                Welcome back! Please login to continue
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className='mb-4'>
                <label
                  className='block text-gray-300 mb-1 text-sm'
                  htmlFor='email'
                >
                  Email Address
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-gray-700/40 rounded-lg border ${
                    errors.email ? 'border-red-500' : 'border-gray-600'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder='your.email@example.com'
                />
                {errors.email && (
                  <p className='text-red-500 text-xs mt-1'>{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className='mb-4'>
                <label
                  className='block text-gray-300 mb-1 text-sm'
                  htmlFor='password'
                >
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-gray-700/40 rounded-lg border ${
                    errors.password ? 'border-red-500' : 'border-gray-600'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder='Enter your password'
                />
                {errors.password && (
                  <p className='text-red-500 text-xs mt-1'>{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-600'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </form>

            {/* Signup Redirect */}
            <p className='text-gray-400 text-sm mt-4 text-center'>
              Don't have an account?{' '}
              <a href='/signup' className='text-blue-400 hover:underline' onClick={() => setIsLogin(false)}>
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
