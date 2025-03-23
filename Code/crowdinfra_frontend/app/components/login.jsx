'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'; // For redirection
import axios from 'axios';
import { toast } from 'react-toastify'; // For toast messages

const LoginPage = ({ setIsLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter();
  
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

  console.log(JSON.stringify(formData, null, 2))

  if (Object.keys(newErrors).length === 0) {
    setIsSubmitting(true)
    try {
      const response = await axios.post(
        `http://localhost:5030/api/auth/login`,
        formData,
        { withCredentials: true } // Allow cookies to be sent
      )

      console.log('Login response:', response.data)

      if (response.data && response.data.success) {
        toast.success('Login successful! Redirecting to home...')
        setIsLogin(true)
        router.push('/home')
      } else {
        throw new Error('Login failed')
      }
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
    <div className='min-h-screen w-full bg-black py-5 text-white'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-full mx-auto'>
          <div className='bg-black backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden  p-8'>
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

              {/* Error message */}
              {errors.submit && (
                <div className='bg-red-500/20 border border-red-500 rounded-lg p-3 mb-4'>
                  <p className='text-red-500 text-sm'>{errors.submit}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type='submit'
                className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-600'
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className='flex items-center justify-center'>
                    <svg
                      className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    Logging in...
                  </span>
                ) : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage