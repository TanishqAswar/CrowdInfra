'use client'
import {
  Search,
  MapPin,
  Route,
  RefreshCcw,
  LogIn,
  UserPlus,
  Home,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import PlaceAutocomplete from './autocomplete'
import { useUserContext } from './user_context'

export default function Navbar() {
  const { overlayOn, setOverlayOn, isLoggedIn } = useUserContext()

  return (
    <nav className='bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg shadow-black/20 flex items-center justify-between px-6 py-3 rounded-full h-16 mx-auto w-[90%]'>
      {/* Left Section - Search Bar */}
      <div className='flex items-center px-4 py-2 rounded-full w-1/3 mr-8'>
        <Search className='text-white/70 w-5 h-5 mr-2 drop-shadow-sm' />
        <PlaceAutocomplete />
      </div>

      {/* Center Section - Navigation Icons */}
        <div className='flex items-center space-x-10 group'>
        <Link href='/home'>
            <div className="relative flex flex-col items-center">
          <Home
            className='w-6 h-6 text-gray-500 hover:text-black transition duration-300 cursor-pointer'
          />
          <span className="absolute -bottom-7 opacity-0 group-hover:opacity-100 hover:opacity-100 text-xs bg-gray-800 text-white px-2 py-1 rounded transition-opacity duration-300">Home</span>
            </div>
          </Link>
          <Link href='/raise-request'>
            <div className="relative flex flex-col items-center">
          <MapPin
            className='w-6 h-6 text-gray-500 hover:text-black transition duration-300 cursor-pointer'
          />
          <span className="absolute -bottom-7 opacity-0 group-hover:opacity-100 hover:opacity-100 text-xs bg-gray-800 text-white px-2 py-1 rounded transition-opacity duration-300">Demands</span>
            </div>
          </Link>

          <Link href='/search-demands'>
            <div className="relative flex flex-col items-center">
          <Search
            className='w-6 h-6 text-gray-500 hover:text-black transition duration-300 cursor-pointer'
          />
          <span className="absolute -bottom-7 opacity-0 group-hover:opacity-100 hover:opacity-100 text-xs bg-gray-800 text-white px-2 py-1 rounded transition-opacity duration-300">Search</span>
            </div>
          </Link>

          <Link href='/property'>
            <div className="relative flex flex-col items-center">
          <Route
            className={`w-6 h-6 cursor-pointer transition duration-300 ${
              overlayOn ? 'text-blue-500' : 'text-gray-500 hover:text-black'
            }`}
          />
          <span className="absolute -bottom-7 opacity-0 group-hover:opacity-100 hover:opacity-100 text-xs bg-gray-800 text-white px-2 py-1 rounded transition-opacity duration-300">Property</span>
            </div>
          </Link>
        </div>

        {/* Right Section - Auth & Logo */}
      <div className='flex items-center gap-4 ml-auto'>
 
          <Link href='/profile'>
            <div
              className='w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400 transition-all duration-300 cursor-pointer flex items-center justify-center'
              title='Profile'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 text-gray-600'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          </Link>

        <Link href='/home'>
          <div className='w-10 h-10 relative'>
            <Image
              className='object-contain cursor-pointer hover:opacity-80 transition-opacity duration-300'
              src='/logo.png'
              fill
              sizes='40px'
              alt='crowdinfra'
              style={{ borderRadius: '50%' }}
            />
          </div>
        </Link>
      </div>
    </nav>
  )
}
