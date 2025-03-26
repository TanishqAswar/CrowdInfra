// 'use client'


// import { Search, MapPin, Route, RefreshCcw, Home } from 'lucide-react'
// import Image from 'next/image'
// import Link from 'next/link'
// import PlaceAutocomplete from './autocomplete'
// import { useUserContext } from './user_context'
// import { LogOut } from 'lucide-react'
// import { useRouter } from 'next/navigation'

// export default function Navbar() {
//   const router = useRouter()
//   const { overlayOn, setOverlayOn, user } = useUserContext()

//   // Construct the profile image URL using the user's data from context
//   // Assuming user is already signed in and has a profileImage field in the database
//   const profileImageUrl = user?.profileImage
//     ? `/api/uploads/${user.profileImage}`
//     : '/default-avatar.png' // Fallback image

//   const handleLogout = async() => {
//     localStorage.removeItem('token')
//     await router.push('/auth')
//   }

//   return (
//     <nav className='bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg shadow-black/20 flex items-center justify-between px-6 py-3 rounded-full h-16 mx-auto w-[90%]'>
//       {/* Left Section - Search Bar */}
//       <div className='flex items-center px-4 py-2 rounded-full w-1/3 mr-8'>
//         <Search className='text-white/70 w-5 h-5 mr-2 drop-shadow-sm' />
//         <PlaceAutocomplete />
//       </div>

//       {/* Center Section - Navigation Icons */}
//       <div className='flex items-center space-x-10'>
//         <Link href='/'>
//           <div className='group relative cursor-pointer'>
//             <Home
//               className='w-6 h-6 text-gray-500 group-hover:text-black group-hover:scale-110 transition duration-300'
//               title='Go Home'
//             />
//             <span className='absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs bg-black/70 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>
//               Go Home
//             </span>
//           </div>
//         </Link>
//         <Link href='/raise-request'>
//           <div className='group relative cursor-pointer'>
//             <MapPin
//               className='w-6 h-6 text-gray-500 group-hover:text-black group-hover:scale-110 transition duration-300'
//               title='Raise a Request'
//             />
//             <span className='absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs bg-black/70 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>
//               Raise Request
//             </span>
//           </div>
//         </Link>

//         <Link href='/search-demands'>
//           <div className='group relative cursor-pointer'>
//             <Search
//               className='w-6 h-6 text-gray-500 group-hover:text-black group-hover:scale-110 transition duration-300'
//               title='Search Demands'
//             />
//             <span className='absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs bg-black/70 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>
//               Search Demands
//             </span>
//           </div>
//         </Link>

//         <Link href='/property'>
//           <div className='group relative cursor-pointer'>
//             <Route
//               className={`w-6 h-6 transition duration-300 group-hover:scale-110 ${
//                 overlayOn
//                   ? 'text-blue-500'
//                   : 'text-gray-500 group-hover:text-black'
//               }`}
//               title='Raise Your Property'
//             />
//             <span className='absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs bg-black/70 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>
//               Your Property
//             </span>
//           </div>
//         </Link>
//       </div>

//       {/* Right Section - Profile & Logo */}
//       <div className='flex items-center gap-4 ml-auto'>
//      {/* <button
//           className='flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
//              bg-red-500 text-white hover:bg-red-600 active:scale-95 
//              transition-all duration-300 shadow-md'
//           onClick={handleLogout}
//         >
//           <LogOut size={16} /> <span>Logout</span>
//         </button> */}

//         <Link href='/profile'>
//           <div
//             className='w-8 h-8 rounded-full overflow-hidden border border-white/30 hover:border-white/60 hover:scale-110 hover:shadow-md hover:shadow-blue-500/30 transition-all duration-300 cursor-pointer'
//             title='Profile'
//           >
//             <Image
//               src={profileImageUrl}
//               width={32}
//               height={32}
//               alt='Profile'
//               className='object-cover w-full h-full transform hover:brightness-110 transition-all duration-300'
//             />
//           </div>
//         </Link>

//         <Link href='/'>
//           <div className='w-10 h-10 relative transform hover:scale-110 transition-all duration-300'>
//             <Image
//               className='object-contain cursor-pointer hover:opacity-90 hover:brightness-110 transition-all duration-300'
//               src='/logo.png'
//               fill
//               sizes='40px'
//               alt='crowdinfra'
//               style={{ borderRadius: '50%' }}
//             />
//           </div>
//         </Link>
//       </div>
//     </nav>
//   )
// }




'use client'

import { Search, MapPin, Route, Home } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import PlaceAutocomplete from './autocomplete'
import { useUserContext } from './user_context'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
  const router = useRouter()
  const { overlayOn, user } = useUserContext()
  const [activeTab, setActiveTab] = useState('/home')
  
  const profileImageUrl = user?.profileImage
    ? `/api/uploads/${user.profileImage}`
    : '/default-avatar.png'

  const NavItem = ({ href, icon: Icon, title, isActive = false }) => (
    <Link 
      href={href} 
      className="group relative flex-1 flex justify-center"
      onClick={() => setActiveTab(href)}
    >
      <div className={`
        relative p-3 rounded-xl transition-all duration-500 
        ${activeTab === href 
          ? 'bg-gradient-to-br from-blue-500/30 to-blue-500/40 shadow-xl' 
          : 'hover:bg-white/10 hover:scale-105'
        }
      `}>
        <Icon 
          className={`
            w-6 h-6 transition-all duration-300 
            ${activeTab === href 
              ? 'text-blue-400 scale-110' 
              : 'text-white/70 group-hover:text-white group-hover:scale-110'
            }
          `}
        />
        {activeTab === href && (
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-zinc-400 rounded-full animate-pulse"></span>
        )}
        {/* Tooltip now specifically on the icon */}
        <div className='
          absolute -bottom-8 left-1/2 -translate-x-1/2 
          bg-black/80 text-white 
          px-3 py-1 rounded-full 
          text-xs opacity-0 group-hover:opacity-100 
          transition-all duration-300 
          whitespace-nowrap
          shadow-lg
          pointer-events-none
          z-50
        '>
          {title}
        </div>
      </div>
    </Link>
  )

  return (
    <nav className='
      fixed top-4 left-1/2 -translate-x-1/2 z-50 
      bg-gradient-to-br from-gray-900/70 to-gray-800/70 
      backdrop-blur-2xl 
      shadow-2xl shadow-blue-500/20 
      flex items-center justify-between 
      px-6 py-4 
      rounded-2xl 
      w-[95%] max-w-6xl
      border border-white/10
      transition-all duration-500 
      hover:shadow-blue-500/30
    '>
      {/* Left Section - Search Bar */}
      <div className='
        flex items-center 
        rounded-xl  
        px-4 py-2 
        w-1/3 
        mr-8 
        hover:bg-zinc-700
        transition-all duration-300
        focus-within:ring-2 
        focus-within:ring-zinc-500/50
      '>
        <Search className='text-white/70 w-5 h-5 mr-2 drop-shadow-sm placeholder:Search' />
        <PlaceAutocomplete/>
      </div>
     

      {/* Center Section - Navigation Icons */}
      <div className='
        flex items-center 
        justify-between 
        w-1/2 
        rounded-xl 
        px-12 py-2
        bg-white/2
        border-none
        space-x-8
      '>
        <NavItem href='/home' icon={Home} title='Go Home' />
        <NavItem href='/raise-request' icon={MapPin} title='Raise a Request' />
        <NavItem href='/search-demands' icon={Search} title='Search Demands' />
        <NavItem 
          href='/property' 
          icon={Route} 
          title='Your Property' 
          isActive={overlayOn} 
        />
      </div>

      {/* Right Section - Profile & Logo */}
      <div className='flex items-center gap-6 ml-auto'>
        {/* Profile Image */}
        <Link href='/profile' className='group'>
          <div className='
            w-12 h-12 
            rounded-full 
            overflow-hidden 
            border-2 border-white/20 
            transition-all duration-300 
            hover:border-blue-500/35
            hover:scale-110 
            hover:z-10
            hover:shadow-xl 
            hover:shadow-blue-500/10
          '>
            <Image
             src={profileImageUrl}
             width={48}
             height={48}
             alt='Profile'
             priority
             className='
               object-cover 
               w-full 
               h-full 
               rounded-full 
               shadow-md 
               transition-all 
               duration-300 
               group-hover:scale-105 
               group-hover:brightness-90 
               group-hover:shadow-lg 
               ring-2 
               ring-white/20 
               group-hover:ring-blue-500/30
             '
            />
          </div>
        </Link>

        {/* Logo */}
        <Link href='/home' className='group'>
          <div className='
            w-14 h-14 
            relative 
            transition-all duration-300 
            hover:scale-110 
            hover:z-10
          '>
            <Image
              className='
                object-contain 
                cursor-pointer 
                transition-all duration-300 
                group-hover:brightness-110
                group-hover:animate-pulse
              '
              src='/logo.png'
              fill
              sizes='56px'
              alt='crowdinfra'
              priority
              style={{ 
                borderRadius: '50%', 
                boxShadow: '0 8px 15px rgba(0,0,0,0.2)' 
              }}
            />
          </div>
        </Link>
      </div>
    </nav>
  )
}