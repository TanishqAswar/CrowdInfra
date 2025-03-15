'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Navbar from '../components/navbar'
import { Camera, Upload } from 'lucide-react'
import { Router } from 'next/router'

const SignupPage = ({setIsLogin}) => {
  const fileInputRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: '',
    age: '',
    address: '',
    bio: '',
    agreeTerms: false,
  })
  const [profilePhoto, setProfilePhoto] = useState(null)
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfilePhoto(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email is invalid'

    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters'

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match'
    if (!formData.agreeTerms)
      newErrors.agreeTerms = 'You must agree to the Terms and Conditions'

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true)
      try {
        // Here you would typically make an API call to register the user
        // For example:
        // const formDataWithPhoto = new FormData();
        // Object.keys(formData).forEach(key => {
        //   formDataWithPhoto.append(key, formData[key]);
        // });
        // if (profilePhoto) {
        //   formDataWithPhoto.append('profilePhoto', profilePhoto);
        // }
        // await fetch('/api/register', {
        //   method: 'POST',
        //   body: formDataWithPhoto
        // });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Redirect to login or dashboard
        alert('Registration successful! Redirecting to login...')
        // window.location.href = "/login";
        setIsLogin(true)
      } catch (error) {
        console.error('Registration error:', error)
        setErrors({ submit: 'Failed to register. Please try again.' })
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
          <div className='bg-black backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden p-8'>
            <div className='text-center mb-8'>
              <h1 className='text-3xl font-bold text-white'>
                Create Your Account
              </h1>
              <p className='text-blue-400 mt-2'>
                Join our community of real estate enthusiasts
              </p>
            </div>

            {/* Profile Photo Upload */}
            <div className='mb-8 flex flex-col items-center'>
              <div
                className='relative w-28 h-28 rounded-full overflow-hidden bg-gray-700 border-4 border-gray-600 mb-4 cursor-pointer'
                onClick={triggerFileInput}
              >
                {profilePhotoPreview ? (
                  <img
                    src={profilePhotoPreview}
                    alt='Profile preview'
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <div className='flex items-center justify-center h-full'>
                    <Camera className='w-10 h-10 text-gray-400' />
                  </div>
                )}
                <div className='absolute bottom-0 right-0 bg-blue-600 rounded-full p-1'>
                  <Upload className='w-4 h-4' />
                </div>
              </div>
              <input
                type='file'
                ref={fileInputRef}
                onChange={handlePhotoChange}
                accept='image/*'
                className='hidden'
              />
              <p className='text-gray-300 text-sm'>Upload profile photo</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Name */}
                <div className='col-span-2 md:col-span-1'>
                  <label
                    className='block text-gray-300 mb-1 text-sm'
                    htmlFor='name'
                  >
                    Full Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 bg-gray-700/40 rounded-lg border ${
                      errors.name ? 'border-red-500' : 'border-gray-600'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder='John Doe'
                  />
                  {errors.name && (
                    <p className='text-red-500 text-xs mt-1'>{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className='col-span-2 md:col-span-1'>
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

                {/* Phone */}
                <div className='col-span-2 md:col-span-1'>
                  <label
                    className='block text-gray-300 mb-1 text-sm'
                    htmlFor='phone'
                  >
                    Phone Number
                  </label>
                  <input
                    type='tel'
                    id='phone'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    className='w-full px-4 py-2 bg-gray-700/40 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder='+91 9876543210'
                  />
                </div>

                {/* Gender */}
                <div className='col-span-2 md:col-span-1'>
                  <label
                    className='block text-gray-300 mb-1 text-sm'
                    htmlFor='gender'
                  >
                    Gender
                  </label>
                  <select
                    id='gender'
                    name='gender'
                    value={formData.gender}
                    onChange={handleChange}
                    className='w-full px-4 py-2 bg-gray-700/40 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  >
                    <option value='' disabled>
                      Select gender
                    </option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Other'>Other</option>
                    <option value='Prefer not to say'>Prefer not to say</option>
                  </select>
                </div>

                {/* Age */}
                <div className='col-span-2 md:col-span-1'>
                  <label
                    className='block text-gray-300 mb-1 text-sm'
                    htmlFor='age'
                  >
                    Age
                  </label>
                  <input
                    type='number'
                    id='age'
                    name='age'
                    value={formData.age}
                    onChange={handleChange}
                    min='18'
                    max='120'
                    className='w-full px-4 py-2 bg-gray-700/40 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder='30'
                  />
                </div>

                {/* Address */}
                <div className='col-span-2 md:col-span-1'>
                  <label
                    className='block text-gray-300 mb-1 text-sm'
                    htmlFor='address'
                  >
                    Address
                  </label>
                  <input
                    type='text'
                    id='address'
                    name='address'
                    value={formData.address}
                    onChange={handleChange}
                    className='w-full px-4 py-2 bg-gray-700/40 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder='123, Main Street, City'
                  />
                </div>

                {/* Password */}
                <div className='col-span-2 md:col-span-1'>
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
                    placeholder='••••••••'
                  />
                  {errors.password && (
                    <p className='text-red-500 text-xs mt-1'>
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className='col-span-2 md:col-span-1'>
                  <label
                    className='block text-gray-300 mb-1 text-sm'
                    htmlFor='confirmPassword'
                  >
                    Confirm Password
                  </label>
                  <input
                    type='password'
                    id='confirmPassword'
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 bg-gray-700/40 rounded-lg border ${
                      errors.confirmPassword
                        ? 'border-red-500'
                        : 'border-gray-600'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder='••••••••'
                  />
                  {errors.confirmPassword && (
                    <p className='text-red-500 text-xs mt-1'>
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Bio */}
                <div className='col-span-2'>
                  <label
                    className='block text-gray-300 mb-1 text-sm'
                    htmlFor='bio'
                  >
                    Bio (Optional)
                  </label>
                  <textarea
                    id='bio'
                    name='bio'
                    value={formData.bio}
                    onChange={handleChange}
                    rows='3'
                    className='w-full px-4 py-2 bg-gray-700/40 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder='Tell us a bit about yourself...'
                  ></textarea>
                </div>

                {/* Terms & Conditions */}
                <div className='col-span-2'>
                  <div className='flex items-start'>
                    <input
                      type='checkbox'
                      id='agreeTerms'
                      name='agreeTerms'
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className='mt-1 h-4 w-4 text-blue-600 border-gray-500 rounded focus:ring-blue-500'
                    />
                    <label
                      className='ml-2 block text-sm text-gray-300'
                      htmlFor='agreeTerms'
                    >
                      I agree to the{' '}
                      <Link
                        href='/terms'
                        className='text-blue-400 hover:underline'
                      >
                        Terms and Conditions
                      </Link>{' '}
                      and{' '}
                      <Link
                        href='/privacy'
                        className='text-blue-400 hover:underline'
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  {errors.agreeTerms && (
                    <p className='text-red-500 text-xs mt-1'>
                      {errors.agreeTerms}
                    </p>
                  )}
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className='col-span-2 bg-red-500/20 border border-red-500 rounded-lg p-3 mb-4'>
                    <p className='text-red-500 text-sm'>{errors.submit}</p>
                  </div>
                )}

                {/* Submit Button */}
                <div className='col-span-2 mt-4'>
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed'
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
                        Creating Account...
                      </span>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
