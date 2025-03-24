'use client'


import { Search, MapPin, Route, RefreshCcw, Home } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import PlaceAutocomplete from './autocomplete'
import { useUserContext } from './user_context'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()
  const { overlayOn, setOverlayOn, user } = useUserContext()

  // Construct the profile image URL using the user's data from context
  // Assuming user is already signed in and has a profileImage field in the database
  const profileImageUrl = user?.profileImage
    ? `/api/uploads/${user.profileImage}`
    : '/default-avatar.png' // Fallback image

  const handleLogout = async() => {
    localStorage.removeItem('token')
    await router.push('/auth')
  }

  return (
    <nav className='bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg shadow-black/20 flex items-center justify-between px-6 py-3 rounded-full h-16 mx-auto w-[90%]'>
      {/* Left Section - Search Bar */}
      <div className='flex items-center px-4 py-2 rounded-full w-1/3 mr-8'>
        <Search className='text-white/70 w-5 h-5 mr-2 drop-shadow-sm' />
        <PlaceAutocomplete />
      </div>

      {/* Center Section - Navigation Icons */}
      <div className='flex items-center space-x-10'>
        <Link href='/'>
          <div className='group relative cursor-pointer'>
            <Home
              className='w-6 h-6 text-gray-500 group-hover:text-black group-hover:scale-110 transition duration-300'
              title='Go Home'
            />
            <span className='absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs bg-black/70 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>
              Go Home
            </span>
          </div>
        </Link>
        <Link href='/raise-request'>
          <div className='group relative cursor-pointer'>
            <MapPin
              className='w-6 h-6 text-gray-500 group-hover:text-black group-hover:scale-110 transition duration-300'
              title='Raise a Request'
            />
            <span className='absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs bg-black/70 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>
              Raise Request
            </span>
          </div>
        </Link>

        <Link href='/search-demands'>
          <div className='group relative cursor-pointer'>
            <Search
              className='w-6 h-6 text-gray-500 group-hover:text-black group-hover:scale-110 transition duration-300'
              title='Search Demands'
            />
            <span className='absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs bg-black/70 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>
              Search Demands
            </span>
          </div>
        </Link>

        <Link href='/property'>
          <div className='group relative cursor-pointer'>
            <Route
              className={`w-6 h-6 transition duration-300 group-hover:scale-110 ${
                overlayOn
                  ? 'text-blue-500'
                  : 'text-gray-500 group-hover:text-black'
              }`}
              title='Raise Your Property'
            />
            <span className='absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs bg-black/70 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>
              Your Property
            </span>
          </div>
        </Link>
      </div>

      {/* Right Section - Profile & Logo */}
      <div className='flex items-center gap-4 ml-auto'>
     {/* <button
          className='flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
             bg-red-500 text-white hover:bg-red-600 active:scale-95 
             transition-all duration-300 shadow-md'
          onClick={handleLogout}
        >
          <LogOut size={16} /> <span>Logout</span>
        </button> */}

        <Link href='/profile'>
          <div
            className='w-8 h-8 rounded-full overflow-hidden border border-white/30 hover:border-white/60 hover:scale-110 hover:shadow-md hover:shadow-blue-500/30 transition-all duration-300 cursor-pointer'
            title='Profile'
          >
            <Image
              src={profileImageUrl}
              width={32}
              height={32}
              alt='Profile'
              className='object-cover w-full h-full transform hover:brightness-110 transition-all duration-300'
            />
          </div>
        </Link>

        <Link href='/'>
          <div className='w-10 h-10 relative transform hover:scale-110 transition-all duration-300'>
            <Image
              className='object-contain cursor-pointer hover:opacity-90 hover:brightness-110 transition-all duration-300'
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
