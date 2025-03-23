// // // // 'use client'
// // // // import { useState } from 'react'
// // // // import Login from '../components/login'
// // // // import SignUpForm from '../components/signup'
// // // // import Navbar from '../components/navbar'

// // // // export default function Auth() {
// // // //   const [isLogin, setIsLogin] = useState(false)

// // // //   return (
// // // //     <div className="flex min-h-screen bg-black w-full items-center justify-center">
// // // //       <div className="relative flex w-full h-full shadow-lg rounded-2xl overflow-hidden">
// // // //         {/* Image Section */}
// // // //         <div
// // // //           className={`flex-1 flex items-center justify-center transition-all duration-500 ease-in-out ${
// // // //             isLogin ? 'order-last' : ''
// // // //           } bg-black text-white`}
// // // //         >
// // // //           <img
// // // //             src="https://images.unsplash.com/photo-1505231509341-30534a9372ee?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNvbW11bml0eXxlbnwwfDF8MHx8fDA%3D"
// // // //             alt="Auth Illustration"
// // // //             className="w-full transition-all duration-500 ease-in-out"
// // // //             onError={(e) => (e.target.src = '/fallback-image.jpg')} // Fix empty src issue
// // // //           />
// // // //         </div>

// // // //         {/* Form Section */}
// // // //         <div className="flex-1 flex flex-col items-center justify-center">
// // // //           {/* Toggle Link */}
// // // //           <p className="mt-8 text-base text-gray-600">
// // // //             {isLogin ? "Don't have an account?" : "Already have an account?"}
// // // //             <button
// // // //               onClick={() => setIsLogin(!isLogin)}
// // // //               className="ml-1 text-blue-500 hover:underline"
// // // //             >
// // // //               {isLogin ? 'Sign Up' : 'Log In'}
// // // //             </button>
// // // //           </p>
// // // //           {isLogin ? (
// // // //             <Login setIsLogin={setIsLogin} />
// // // //           ) : (
// // // //             <SignUpForm setIsLogin={setIsLogin} />
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }

// // // 'use client'
// // // import { useState } from 'react'
// // // import Login from '../components/login'
// // // import SignUpForm from '../components/signup'
// // // import Navbar from '../components/navbar'
// // // import RotatingEarth from '../components/RotatingEarth' // Import the new component

// // // export default function Auth() {
// // //   const [isLogin, setIsLogin] = useState(false)

// // //   return (
// // //     <div className="flex min-h-screen bg-black w-full items-center justify-center">
// // //       <div className="relative flex w-full h-full shadow-lg rounded-2xl overflow-hidden">
// // //         {/* Earth Animation Section */}
// // //         <div
// // //           className={`flex-1 flex items-center justify-center transition-all duration-500 ease-in-out ${
// // //             isLogin ? 'order-last' : ''
// // //           } bg-black text-white relative`}
// // //         >
// // //           {/* Container for the 3D Earth with higher z-index */}
// // //           <div className="absolute inset-0 z-10">
// // //             <RotatingEarth />
// // //           </div>

// // //           {/* Optional overlay for better text contrast if needed */}
// // //           <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
// // //         </div>

// // //         {/* Form Section */}
// // //         <div className="flex-1 flex flex-col items-center justify-center">
// // //           {/* Toggle Link */}
// // //           <p className="mt-8 text-base text-gray-600">
// // //             {isLogin ? "Don't have an account?" : "Already have an account?"}
// // //             <button
// // //               onClick={() => setIsLogin(!isLogin)}
// // //               className="ml-1 text-blue-500 hover:underline"
// // //             >
// // //               {isLogin ? 'Sign Up' : 'Log In'}
// // //             </button>
// // //           </p>
// // //           {isLogin ? (
// // //             <Login setIsLogin={setIsLogin} />
// // //           ) : (
// // //             <SignUpForm setIsLogin={setIsLogin} />
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   )
// // // }

// // // 'use client'

// // // import { useState, useEffect } from 'react'
// // // import Login from '../components/login'
// // // import SignUpForm from '../components/signup'
// // // import Navbar from '../components/navbar'
// // // import RotatingEarth from '../components/RotatingEarth'

// // // export default function Auth() {
// // //   const [isLogin, setIsLogin] = useState(false)
// // //   const [loading, setLoading] = useState(true)

// // //   // Add a loading state to prevent flickering when the Earth loads
// // //   useEffect(() => {
// // //     const timer = setTimeout(() => {
// // //       setLoading(false)
// // //     }, 1000)

// // //     return () => clearTimeout(timer)
// // //   }, [])

// // //   return (
// // //     <div className="flex min-h-screen bg-gradient-to-b from-black to-gray-900 w-full items-center justify-center overflow-hidden">
// // //       {/* Optional Navbar */}
// // //       {/* <Navbar /> */}

// // //       <div className="relative flex w-full max-w-7xl h-[80vh] shadow-2xl rounded-3xl overflow-hidden bg-black/80 backdrop-blur-sm">
// // //         {/* Earth Animation Section */}
// // //         <div
// // //           className={`flex-1 flex items-center justify-center transition-all duration-700 ease-in-out ${
// // //             isLogin ? 'order-last' : ''
// // //           } bg-black text-white relative overflow-hidden`}
// // //         >
// // //           {/* Loading state */}
// // //           {loading && (
// // //             <div className="absolute inset-0 z-20 flex items-center justify-center">
// // //               <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
// // //             </div>
// // //           )}

// // //           {/* Container for the 3D Earth */}
// // //           <div className={`absolute inset-0 transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
// // //             <RotatingEarth />
// // //           </div>

// // //           {/* Overlay text/branding */}
// // //           <div className="relative z-10 text-center px-8 max-w-md">
// // //             <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
// // //               {isLogin ? 'Welcome Back' : 'Join Our Global Network'}
// // //             </h1>
// // //             <p className="text-lg md:text-xl text-gray-200 drop-shadow-md">
// // //               {isLogin
// // //                 ? 'Access your account and connect with the world'
// // //                 : 'Create an account to begin your journey'
// // //               }
// // //             </p>
// // //           </div>

// // //           {/* Subtle gradient overlay for better contrast */}
// // //           <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-black/60 z-0"></div>
// // //         </div>

// // //         {/* Form Section */}
// // //         <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-900">
// // //           <div className="w-full max-w-md">
// // //             <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
// // //               {isLogin ? 'Log In' : 'Create Account'}
// // //             </h2>

// // //             {isLogin ? (
// // //               <Login setIsLogin={setIsLogin} />
// // //             ) : (
// // //               <SignUpForm setIsLogin={setIsLogin} />
// // //             )}

// // //             {/* Toggle Link */}
// // //             <div className="mt-8 text-center">
// // //               <p className="text-gray-600 dark:text-gray-400">
// // //                 {isLogin ? "Don't have an account?" : "Already have an account?"}
// // //                 <button
// // //                   onClick={() => setIsLogin(!isLogin)}
// // //                   className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:underline transition-colors"
// // //                 >
// // //                   {isLogin ? 'Sign Up' : 'Log In'}
// // //                 </button>
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Decorative elements */}
// // //       <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
// // //         <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
// // //         <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
// // //         <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
// // //       </div>
// // //     </div>
// // //   )
// // // }

// // "use client";

// // import { useState, useEffect, useRef } from "react";
// // import Login from "../components/login";
// // import SignUpForm from "../components/signup";
// // import RotatingEarth from "../components/RotatingEarth";
// // import { Camera, Upload } from "lucide-react";

// // const handlePhotoChange = (e) => {
// //   const file = e.target.files[0];
// //   if (file) {
// //     setProfilePhoto(file);
// //     const reader = new FileReader();
// //     reader.onloadend = () => {
// //       setProfilePhotoPreview(reader.result);
// //     };
// //     reader.readAsDataURL(file);
// //   }
// // };

// // const triggerFileInput = () => {
// //   fileInputRef.current.click();
// // };

// // export default function Auth() {
// //   const [isLogin, setIsLogin] = useState(false);
// //   const [loading, setLoading] = useState(true);
// //   const fileInputRef = useRef(null);

// //   const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);
// //   const [profilePhoto, setProfilePhoto] = useState(null);

// //   useEffect(() => {
// //     const timer = setTimeout(() => setLoading(false), 800);
// //     return () => clearTimeout(timer);
// //   }, []);

// //   return (
// //     <div className="flex min-h-screen bg-gradient-to-b from-black via-blue-950 to-black w-full items-center justify-center overflow-hidden">
// //       <div className="relative flex w-full max-w-6xl h-[85vh] shadow-2xl rounded-3xl overflow-hidden backdrop-blur-sm">
// //         {/* Earth Animation Section */}
// //         <div
// //           className={`flex-1 flex items-center justify-center transition-all duration-700 ease-in-out ${
// //             isLogin ? "order-last" : ""
// //           } relative overflow-hidden rounded-l-3xl`}
// //         >
// //           {loading && (
// //             <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
// //               <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
// //             </div>
// //           )}

// //           <div
// //             className={`absolute inset-0 transition-opacity duration-1000 ${
// //               loading ? "opacity-0" : "opacity-100"
// //             }`}
// //           >
// //             <RotatingEarth />
// //           </div>

// //           <div className="relative z-10 text-center px-8 max-w-md">
// //             {/* <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">
// //               {isLogin ? 'Welcome Back' : 'Explore Together'}
// //             </h1> */}
// //             <p className="text-xl text-gray-200 drop-shadow-md">
// //               {isLogin ? (
// //                 "Your journey continues here"
// //               ) : (
// //                 <div className="mb-8 flex flex-col items-center">
// //                   <div
// //                     className="relative w-28 h-28 rounded-full overflow-hidden bg-gray-700 border-4 border-gray-600 mb-4 cursor-pointer"
// //                     onClick={triggerFileInput}
// //                   >
// //                     {profilePhotoPreview ? (
// //                       <img
// //                         src={profilePhotoPreview}
// //                         alt="Profile preview"
// //                         className="w-full h-full object-cover"
// //                       />
// //                     ) : (
// //                       <div className="flex items-center justify-center h-full">
// //                         <Camera className="w-10 h-10 text-gray-400" />
// //                       </div>
// //                     )}
// //                     <div
// //                       className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1 cursor-pointer"
// //                       onClick={triggerFileInput}
// //                     >
// //                       <Upload className="w-4 h-4" />
// //                     </div>
// //                   </div>
// //                   <input
// //                     type="file"
// //                     ref={fileInputRef}
// //                     onChange={handlePhotoChange}
// //                     accept="image/*"
// //                     className="hidden"
// //                   />
// //                   <p className="text-gray-300 text-sm">Upload profile photo</p>
// //                 </div>
// //               )}
// //             </p>
// //           </div>

// //           <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-black/70 z-0"></div>
// //         </div>

// //         {/* Form Section */}
// //         <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-900 rounded-r-3xl">
// //           <div className="w-full max-w-md">
// //             <div className="mb-8">
// //               <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
// //                 {isLogin ? "Sign In" : "Create Account"}
// //               </h2>
// //               <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-2 rounded-full"></div>
// //             </div>

// //             {isLogin ? (
// //               <Login setIsLogin={setIsLogin} />
// //             ) : (
// //               <SignUpForm setIsLogin={setIsLogin} />
// //             )}

// //             <div className="mt-8 text-center">
// //               <p className="text-gray-600 dark:text-gray-400">
// //                 {isLogin
// //                   ? "Don't have an account?"
// //                   : "Already have an account?"}
// //                 <button
// //                   onClick={() => setIsLogin(!isLogin)}
// //                   className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:underline transition-colors"
// //                 >
// //                   {isLogin ? "Sign Up" : "Sign In"}
// //                 </button>
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Enhanced decorative elements */}
// //       <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
// //         <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
// //         <div className="absolute top-10 -right-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse"></div>
// //         <div className="absolute -bottom-20 left-40 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
// //       </div>
// //     </div>
// //   );
// // }


// "use client";

// import { useState, useEffect } from "react";
// import Login from "../components/login";
// import SignupPage from "../components/signup";
// import RotatingEarth from "../components/RotatingEarth";

// export default function Auth() {
//   const [isLogin, setIsLogin] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 800);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-gradient-to-b from-black via-blue-950 to-black w-full items-center justify-center overflow-hidden">
//       <div className="relative flex w-full max-w-6xl h-[85vh] shadow-2xl rounded-3xl overflow-hidden backdrop-blur-sm">
//         {/* Earth Animation Section */}
//         <div
//           className={`flex-1 flex items-center justify-center transition-all duration-700 ease-in-out ${
//             isLogin ? "order-last" : ""
//           } relative overflow-hidden rounded-l-3xl`}
//         >
//           {loading && (
//             <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
//               <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//             </div>
//           )}

//           <div
//             className={`absolute inset-0 transition-opacity duration-1000 ${
//               loading ? "opacity-0" : "opacity-100"
//             }`}
//           >
//             <RotatingEarth />
//           </div>

//           <div className="relative z-10 text-center px-8 max-w-md">
//             <p className="text-xl text-gray-200 drop-shadow-md">
//               {isLogin ? "Your journey continues here" : "Join us to explore the world together"}
//             </p>
//           </div>

//           <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-black/70 z-0"></div>
//         </div>

//         {/* Form Section */}
//         <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-900 rounded-r-3xl">
//           <div className="w-full max-w-md">
//             <div className="mb-8">
//               <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
//                 {isLogin ? "Sign In" : "Create Account"}
//               </h2>
//               <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-2 rounded-full"></div>
//               {!isLogin && (
//                 <p className="text-center mt-3 text-gray-600 dark:text-gray-400">
//                   Already have an account?{" "}
//                   <button
//                     onClick={() => setIsLogin(true)}
//                     className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:underline transition-colors"
//                   >
//                     Login
//                   </button>
//                 </p>
//               )}
//             </div>

//             {isLogin ? (
//               <Login setIsLogin={setIsLogin} />
//             ) : (
//               <SignupPage setIsLogin={setIsLogin} />
//             )}

//             <div className="mt-8 text-center">
//               <p className="text-gray-600 dark:text-gray-400">
//                 {isLogin ? "Don't have an account?" : "Already have an account?"}
//                 <button
//                   onClick={() => setIsLogin(!isLogin)}
//                   className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:underline transition-colors"
//                 >
//                   {isLogin ? "Sign Up" : "Sign In"}
//                 </button>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Enhanced decorative elements */}
//       <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
//         <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//         <div className="absolute top-10 -right-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse"></div>
//         <div className="absolute -bottom-20 left-40 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import Login from "../components/login";
import SignupPage from "../components/signup";
import RotatingEarth from "../components/RotatingEarth";
import { Camera, Upload } from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-black via-blue-950 to-black w-full items-center justify-center overflow-hidden">
      <div className="relative flex w-full max-w-6xl h-[85vh] shadow-2xl rounded-3xl overflow-hidden backdrop-blur-sm">
        {/* Earth Animation Section */}
        <div
          className={`flex-1 flex items-center justify-center transition-all duration-700 ease-in-out ${
            isLogin ? "order-last" : ""
          } relative overflow-hidden rounded-l-3xl`}
        >
          {loading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          <div
            className={`absolute inset-0 transition-opacity duration-1000 ${
              loading ? "opacity-0" : "opacity-100"
            }`}
          >
            <RotatingEarth />
          </div>

          <div className="relative z-10 text-center px-8 max-w-md">
            <p className="text-2xl text-gray-200 drop-shadow-md">
              {isLogin ? "Your journey continues here" : (
                <div className="mb-8 flex flex-col items-center">
                  <div
                    className="relative w-28 h-28 rounded-full overflow-hidden bg-gray-700 border-4 border-gray-600 mb-4 cursor-pointer"
                    onClick={triggerFileInput}
                  >
                    {profilePhotoPreview ? (
                      <img
                        src={profilePhotoPreview}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Camera className="w-10 h-10 text-gray-400" />
                      </div>
                    )}
                    <div
                      className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1 cursor-pointer"
                      onClick={triggerFileInput}
                    >
                      <Upload className="w-4 h-4" />
                    </div>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <p className="text-gray-300 text-sm">Upload profile photo</p>
                </div>
              )}
            </p>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-black/70 z-0"></div>
        </div>

        {/* Form Section */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-900 rounded-r-3xl">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
                {isLogin ? "Sign In" : "Create Account"}
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-2 rounded-full"></div>
              {/* {!isLogin && (
                <p className="text-center mt-3 text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:underline transition-colors"
                  >
                    Login
                  </button>
                </p>
              )} */}
            </div>

            {isLogin ? (
              <Login setIsLogin={setIsLogin} />
            ) : (
              <SignupPage setIsLogin={setIsLogin} profilePhoto={profilePhoto} />
            )}

            <div className="mt- text-center">
              <p className="text-gray-600 dark:text-gray-400">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={() => setIsLogin(true)}
                  className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:underline transition-colors"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-10 -right-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse"></div>
        <div className="absolute -bottom-20 left-40 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>
    </div>
  );
}