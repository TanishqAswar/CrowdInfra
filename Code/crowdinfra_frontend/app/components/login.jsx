import React from 'react'

const LoginForm = () => {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-96'>
        <h2 className='text-2xl font-semibold text-center text-gray-700 mb-6'>
          Login
        </h2>
        <form>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='email'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter your email'
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='password'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter your password'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300'
          >
            Login
          </button>
        </form>
        <p className='text-center text-gray-600 text-sm mt-4'>
          Don't have an account?{' '}
          <a href='#' className='text-blue-500 hover:underline'>
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}

export default LoginForm
