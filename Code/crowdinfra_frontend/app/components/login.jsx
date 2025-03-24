// // 'use client'

// // import { useState } from 'react'
// // import Link from 'next/link'
// // import Navbar from '../components/navbar'
// // import { useRouter } from 'next/navigation'; // For redirection
// // import axios from 'axios';

// // const LoginPage = ({ setIsLogin }) => {
// //   const [formData, setFormData] = useState({
// //     email: '',
// //     password: '',
// //   })
// //   const [errors, setErrors] = useState({})
// //   const [isSubmitting, setIsSubmitting] = useState(false)
// //   const router = useRouter();
  
// //   const handleChange = (e) => {
// //     const { name, value } = e.target
// //     setFormData({
// //       ...formData,
// //       [name]: value,
// //     })
// //   }

// //   const validate = () => {
// //     const newErrors = {}

// //     if (!formData.email.trim()) newErrors.email = 'Email is required'
// //     else if (!/\S+@\S+\.\S+/.test(formData.email))
// //       newErrors.email = 'Email is invalid'

// //     if (!formData.password) newErrors.password = 'Password is required'
// //     else if (formData.password.length < 6)
// //       newErrors.password = 'Password must be at least 6 characters'

// //     return newErrors
// //   }

// // const handleSubmit = async (e) => {
// //   e.preventDefault()
// //   const newErrors = validate()

// //   console.log(JSON.stringify(formData, null, 2))

// //   if (Object.keys(newErrors).length === 0) {
// //     setIsSubmitting(true)
// //     try {
// //       const response = await axios.post(
// //         'http://localhost:5030/api/auth/login',
// //         formData
// //       )

// //       console.log('Login response:', response.data)

// //       if (response.data.token) {
// //         // Store the token securely
// //         localStorage.setItem('token', response.data.token) // Or sessionStorage

// //         alert('Login successful! Redirecting...')
// //         setIsLogin(true)
// //         router.push('/home')
// //       } else {
// //         throw new Error('Token not received')
// //       }
// //     } catch (error) {
// //       console.error('Login error:', error)
// //       setErrors({ submit: 'Failed to login. Please try again.' })
// //     } finally {
// //       setIsSubmitting(false)
      
// //     }
// //   } else {
// //     setErrors(newErrors)
// //   }
// // }


// //   return (
// //     <div className='min-h-screen w-full bg-black py-5 text-white'>
// //       <div className='container mx-auto px-4 py-8'>
// //         <div className='max-w-full mx-auto'>
// //           <div className='bg-black backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden  p-8'>
// //             <div className='text-center mb-8'>
// //               <h1 className='text-3xl font-bold text-white'>Login</h1>
// //               <p className='text-blue-400 mt-2'>
// //                 Welcome back! Please login to continue
// //               </p>
// //             </div>

// //             <form onSubmit={handleSubmit}>
// //               {/* Email */}
// //               <div className='mb-4'>
// //                 <label
// //                   className='block text-gray-300 mb-1 text-sm'
// //                   htmlFor='email'
// //                 >
// //                   Email Address
// //                 </label>
// //                 <input
// //                   type='email'
// //                   id='email'
// //                   name='email'
// //                   value={formData.email}
// //                   onChange={handleChange}
// //                   className={`w-full px-4 py-2 bg-gray-700/40 rounded-lg border ${
// //                     errors.email ? 'border-red-500' : 'border-gray-600'
// //                   } focus:outline-none focus:ring-2 focus:ring-blue-500`}
// //                   placeholder='your.email@example.com'
// //                 />
// //                 {errors.email && (
// //                   <p className='text-red-500 text-xs mt-1'>{errors.email}</p>
// //                 )}
// //               </div>

// //               {/* Password */}
// //               <div className='mb-4'>
// //                 <label
// //                   className='block text-gray-300 mb-1 text-sm'
// //                   htmlFor='password'
// //                 >
// //                   Password
// //                 </label>
// //                 <input
// //                   type='password'
// //                   id='password'
// //                   name='password'
// //                   value={formData.password}
// //                   onChange={handleChange}
// //                   className={`w-full px-4 py-2 bg-gray-700/40 rounded-lg border ${
// //                     errors.password ? 'border-red-500' : 'border-gray-600'
// //                   } focus:outline-none focus:ring-2 focus:ring-blue-500`}
// //                   placeholder='Enter your password'
// //                 />
// //                 {errors.password && (
// //                   <p className='text-red-500 text-xs mt-1'>{errors.password}</p>
// //                 )}
// //               </div>

// //               {/* Error message */}
// //               {errors.submit && (
// //                 <div className='bg-red-500/20 border border-red-500 rounded-lg p-3 mb-4'>
// //                   <p className='text-red-500 text-sm'>{errors.submit}</p>
// //                 </div>
// //               )}

// //               {/* Submit Button */}
// //               <button
// //                 type='submit'
// //                 className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-600'
// //                 disabled={isSubmitting}
// //               >
// //                 {isSubmitting ? (
// //                   <span className='flex items-center justify-center'>
// //                     <svg
// //                       className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
// //                       xmlns='http://www.w3.org/2000/svg'
// //                       fill='none'
// //                       viewBox='0 0 24 24'
// //                     >
// //                       <circle
// //                         className='opacity-25'
// //                         cx='12'
// //                         cy='12'
// //                         r='10'
// //                         stroke='currentColor'
// //                         strokeWidth='4'
// //                       ></circle>
// //                       <path
// //                         className='opacity-75'
// //                         fill='currentColor'
// //                         d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
// //                       ></path>
// //                     </svg>
// //                     Logging in...
// //                   </span>
// //                 ) : 'Login'}
// //               </button>
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default LoginPage


// 'use client'

// import { useState } from 'react'
// import Link from 'next/link'
// import Navbar from '../components/navbar'
// import { useRouter } from 'next/navigation'; // For redirection
// import axios from 'axios';

// const LoginPage = ({ setIsLogin }) => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   })
//   const [errors, setErrors] = useState({})
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const router = useRouter();
  
//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData({
//       ...formData,
//       [name]: value,
//     })
//   }

//   const validate = () => {
//     const newErrors = {}

//     if (!formData.email.trim()) newErrors.email = 'Email is required'
//     else if (!/\S+@\S+\.\S+/.test(formData.email))
//       newErrors.email = 'Email is invalid'

//     if (!formData.password) newErrors.password = 'Password is required'
//     else if (formData.password.length < 6)
//       newErrors.password = 'Password must be at least 6 characters'

//     return newErrors
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     const newErrors = validate()

//     console.log(JSON.stringify(formData, null, 2))

//     if (Object.keys(newErrors).length === 0) {
//       setIsSubmitting(true)
//       try {
//         const response = await axios.post(
//           'http://localhost:5030/api/auth/login',
//           formData
//         )

//         console.log('Login response:', response.data)

//         if (response.data.token) {
//           // Store the token securely
//           localStorage.setItem('token', response.data.token) // Or sessionStorage

//           alert('Login successful! Redirecting...')
//           setIsLogin(true)
//           router.push('/home')
//         } else {
//           throw new Error('Token not received')
//         }
//       } catch (error) {
//         console.error('Login error:', error)
//         setErrors({ submit: 'Failed to login. Please try again.' })
//       } finally {
//         setIsSubmitting(false)
//       }
//     } else {
//       setErrors(newErrors)
//     }
//   }

//   return (
//     <div className='min-h-screen w-full bg-black py-5 text-white'>
//       <div className='container mx-auto px-4 py-8'>
//         <div className='max-w-full mx-auto'>
//           <div className='bg-transparent backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden p-8 border border-gray-800 bg-gradient-to-br from-gray-900/40 to-gray-800/20'>
//             <div className='text-center mb-8'>
//               <h1 className='text-4xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500'>Login</h1>
//               <p className='text-blue-400 mt-2 mb-6'>
//                 Welcome back! Please login to continue
//               </p>
//               <div className="text-gray-400 text-sm mb-6">
//                 Don't have an account? <Link href="/signup" className="text-blue-400 hover:text-blue-300 underline transition-colors duration-300">Create account</Link>
//               </div>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Email */}
//               <div className='mb-4'>
//                 <label
//                   className='block text-gray-300 mb-2 text-sm font-medium'
//                   htmlFor='email'
//                 >
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <input
//                     type='email'
//                     id='email'
//                     name='email'
//                     value={formData.email}
//                     onChange={handleChange}
//                     className={`w-full px-4 py-3 bg-gray-800/30 rounded-lg border ${
//                       errors.email ? 'border-red-500' : 'border-gray-700'
//                     } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
//                     placeholder='your.email@example.com'
//                   />
//                   {errors.email && (
//                     <p className='text-red-500 text-xs mt-1'>{errors.email}</p>
//                   )}
//                 </div>
//               </div>

//               {/* Password */}
//               <div className='mb-4'>
//                 <label
//                   className='block text-gray-300 mb-2 text-sm font-medium'
//                   htmlFor='password'
//                 >
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type='password'
//                     id='password'
//                     name='password'
//                     value={formData.password}
//                     onChange={handleChange}
//                     className={`w-full px-4 py-3 bg-gray-800/30 rounded-lg border ${
//                       errors.password ? 'border-red-500' : 'border-gray-700'
//                     } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
//                     placeholder='Enter your password'
//                   />
//                   {errors.password && (
//                     <p className='text-red-500 text-xs mt-1'>{errors.password}</p>
//                   )}
//                 </div>
//               </div>

//               {/* Forgot Password Link */}
//               <div className="flex justify-end mb-6">
//                 <Link href="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300">
//                   Forgot password?
//                 </Link>
//               </div>

//               {/* Error message */}
//               {errors.submit && (
//                 <div className='bg-red-500/20 border border-red-500 rounded-lg p-3 mb-4'>
//                   <p className='text-red-500 text-sm'>{errors.submit}</p>
//                 </div>
//               )}

//               {/* Submit Button */}
//               <button
//                 type='submit'
//                 className='w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg'
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? (
//                   <span className='flex items-center justify-center'>
//                     <svg
//                       className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
//                       xmlns='http://www.w3.org/2000/svg'
//                       fill='none'
//                       viewBox='0 0 24 24'
//                     >
//                       <circle
//                         className='opacity-25'
//                         cx='12'
//                         cy='12'
//                         r='10'
//                         stroke='currentColor'
//                         strokeWidth='4'
//                       ></circle>
//                       <path
//                         className='opacity-75'
//                         fill='currentColor'
//                         d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
//                       ></path>
//                     </svg>
//                     Logging in...
//                   </span>
//                 ) : 'Login'}
//               </button>
//             </form>

//             {/* Social Login Options */}
//             <div className="mt-8">
//               <div className="flex items-center mb-4">
//                 <div className="flex-grow h-px bg-gray-700"></div>
//                 <span className="px-3 text-sm text-gray-400">or continue with</span>
//                 <div className="flex-grow h-px bg-gray-700"></div>
//               </div>
              
//               <div className="flex justify-center space-x-4">
//                 <button className="p-2 rounded-full bg-gray-800/60 hover:bg-gray-700 transition-colors duration-300">
//                   <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
//                   </svg>
//                 </button>
//                 <button className="p-2 rounded-full bg-gray-800/60 hover:bg-gray-700 transition-colors duration-300">
//                   <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
//                   </svg>
//                 </button>
//                 <button className="p-2 rounded-full bg-gray-800/60 hover:bg-gray-700 transition-colors duration-300">
//                   <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm5.144 14.5h-10.288c-.472 0-.856-.384-.856-.856v-6.788c0-.472.384-.856.856-.856h10.288c.472 0 .856.384.856.856v6.788c0 .472-.384.856-.856.856zm-5.144-9.5c-1.105 0-2 .896-2 2s.895 2 2 2 2-.896 2-2-.895-2-2-2zm-1.5 6c0 .828.672 1.5 1.5 1.5s1.5-.672 1.5-1.5-.672-1.5-1.5-1.5-1.5.672-1.5 1.5zm5.5-1h1.5v-1.5h-1.5v1.5zm-2 0h1.5v-1.5h-1.5v1.5z" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default LoginPage



'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const LoginPage = ({ setIsLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  
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
          'http://localhost:5030/api/auth/login',
          formData
        )

        console.log('Login response:', response.data)

        if (response.data.token) {
          // Store the token securely
          localStorage.setItem('token', response.data.token) // Or sessionStorage

          alert('Login successful! Redirecting...')
          setIsLogin(true)
          router.push('/home')
        } else {
          throw new Error('Token not received')
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
    <div className='min-h-screen w-full bg-transparent py-5 text-white'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-full mx-auto'>
          <div className='bg-transparent backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden p-8 border-none'>
            <div className='text-center mb-8'>
              <h1 className='text-4xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500'>Login</h1>
              <div className="text-gray-400 text-sm mt-2 mb-6" onClick={()=>setIsLogin(false)}>
                Don't have an account? <Link href="/auth" className="text-blue-400 hover:text-blue-300 underline-none transition-colors duration-300">Create account</Link>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className='mb-4'>
                <label
                  className='block text-gray-300 mb-2 text-sm font-medium'
                  htmlFor='email'
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-transparent rounded-lg border ${
                      errors.email ? 'border-red-500' : 'border-gray-700'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                    placeholder='your.email@example.com'
                  />
                  {errors.email && (
                    <p className='text-red-500 text-xs mt-1'>{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Password */}
              <div className='mb-4'>
                <label
                  className='block text-gray-300 mb-2 text-sm font-medium'
                  htmlFor='password'
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type='password'
                    id='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-transparent rounded-lg border ${
                      errors.password ? 'border-red-500' : 'border-gray-700'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                    placeholder='Enter your password'
                  />
                  {errors.password && (
                    <p className='text-red-500 text-xs mt-1'>{errors.password}</p>
                  )}
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end mb-6">
                <Link href="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300">
                  Forgot password?
                </Link>
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
                className='w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg'
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