
// "use client";
// import { useEffect, useRef, useState } from "react";
// import { useRouter } from 'next/navigation'
// import Script from "next/script";
// import * as THREE from "three";
// import Maps from "./maps/page";
// import Navbar from "./components/navbar";
// import { useUserContext } from "./components/user_context";
// import Link from "next/link";
// import Footer from "./components/footer";
// import NearbyDemandsMap from "./components/NearbyDemandsMap";
// import Loading from "./components/loading";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function GlobePage() {
//   const globeRef = useRef();
//   const [isMapExpanded, setIsMapExpanded] = useState(false);
//   const [showMap, setShowMap] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const router = useRouter()
//    useEffect(() => {
//      const verifyUser = async () => {
//        try {
//          const response = await axios.get(
//            'http://localhost:5030/api/auth/verify',
//            {
//              withCredentials: true, // Send cookies with the request
//            }
//          )
//          if (response.data.valid) {
//            console.log('User is authenticated:', response.data.user)
//            setIsAuthenticated(true)
//          } else {
//            console.log('Invalid token. Redirecting...')
//            toast.error('Please login to continue')
//            router.push('/landing')
//          }
//        } catch (error) {
//          console.error('Error verifying user:', error)
//          router.push('/landing')
//        }
//      }
//      verifyUser()
//    }, [])
//    if (isAuthenticated === null) {
//      return <Loading text='Verifying user...' />
//    }
//   const initGlobe = () => {
//     const world = (globeRef.current.__world = new Globe(globeRef.current, {
//       animateIn: false,
//     })
//       .globeImageUrl(
//         "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
//       )
//       .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png"));
//       // Auto-rotate
//       world.controls().autoRotate = true;
//       world.controls().autoRotateSpeed = 0.35;
//       // Add clouds sphere
//       const CLOUDS_IMG_URL = "./clouds.png";
//       const CLOUDS_ALT = 0.004;
//       const CLOUDS_ROTATION_SPEED = -0.006; // deg/frame
//       new THREE.TextureLoader().load(CLOUDS_IMG_URL, (cloudsTexture) => {
//         const clouds = new THREE.Mesh(
//           new THREE.SphereGeometry(
//           world.getGlobeRadius() * (1 + CLOUDS_ALT),
//           75,
//           75
//         ),
//         new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true })
//       );
//       world.scene().add(clouds);
//       (function rotateClouds() {
//         clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
//         requestAnimationFrame(rotateClouds);
//       })();
//     });
//     // Add double-click event listener to toggle map expansion
//     globeRef.current.addEventListener('dblclick', handleMapToggle);
//     // Make globe responsive
//     const handleResize = () => {
//       if (world) {
//         world.width(window.innerWidth);
//         world.height(window.innerHeight * 0.8);
//       }
//     };
//     window.addEventListener('resize', handleResize);
//     handleResize(); // Initial sizing
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       globeRef.current?.removeEventListener('dblclick', handleMapToggle);
//     };
//   };
//   const handleMapToggle = () => {
//     if (!showMap) return; // Don't toggle if map shouldn't be shown
//     setIsMapExpanded(!isMapExpanded);
//     if (!isMapExpanded) {
//       // Expand map
//       const mapElement = document.getElementById("map");
//       if (mapElement) {
//         mapElement.scrollIntoView({ behavior: 'smooth' });
        
//         // Show map with transition
//         mapElement.style.transition = `opacity 1000ms`;
//         mapElement.style.opacity = "1";
//       } else {
//         // If map element doesn't exist yet, scroll to bottom
//         window.scrollTo({
//           top: document.body.scrollHeight,
//           behavior: 'smooth'
//         });
//       }
//       const navC = document.getElementById("navC");
//       if (navC) {
//         navC.style.background = "transparent";
//       }
//     } else {
//       // Collapse map - scroll to top
//       window.scrollTo({
//         top: 0,
//         behavior: 'smooth'
//       });
//       // Hide map
//       const bottomElement = document.getElementById("map");
//       if (bottomElement) {
//         bottomElement.style.opacity = "0";
//       }
//       // Reset navbar
//       const navC = document.getElementById("navC");
//       if (navC) {
//         navC.style.background = "black";
//       }
//     }
//   };
//   return (
//     <>
//         <Script src="//unpkg.com/globe.gl" onLoad={initGlobe} />
//         <div id="navC" className="bg-black pt-4 md:pt-8 pb-2 md:pb-4 sticky top-0 z-[999]">
//           <Navbar />
//         </div>
//         <div style={{ marginTop: "0px", padding:"0px" }} className="z-10 h-[50vh] md:h-[70vh] lg:h-[80vh]">
//           <div ref={globeRef} id="globeViz" className="z-1000 cursor-pointer w-full h-full" />
//         </div>
//         <div className="bg-black py-8 md:py-16 px-4 text-white" style={{marginTop: "-1px"}}>
//           <div className="max-w-7xl mx-auto">
//             <div className="text-center mb-8 md:mb-16">
//               <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gray-200">CrowdInfra - India's First Crowdsourced Infrastructure Platform</h1>
//               <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">Contribute to improving infrastructure around you and be a part of your community's development.</p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16">
//               <div className="bg-gray-800/50 backdrop-blur-lg p-6 md:p-8 rounded-2xl border border-gray-700/50 shadow-xl hover:transform hover:scale-105 transition-all duration-300">
//                 <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-blue-400">Find Properties</h3>
//                 <p className="text-gray-300 mb-4 md:mb-6">Discover available properties in your area and get detailed information about them.</p>
//                 <Link href="/property" className="inline-block px-4 py-2 md:px-6 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base">
//                   View Properties
//                 </Link>
//               </div>

//               <div className="bg-gray-800/50 backdrop-blur-lg p-6 md:p-8 rounded-2xl border border-gray-700/50 shadow-xl hover:transform hover:scale-105 transition-all duration-300">
//                 <div className="bg-purple-600/20 p-4 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-4 md:mb-6">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                   </svg>
//                 </div>
//                 <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-purple-400">View Demands</h3>
//                 <p className="text-gray-300 mb-4 md:mb-6">See infrastructure demands made by the community and support them.</p>
//                 <Link href="/search-demands" className="inline-block px-4 py-2 md:px-6 md:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm md:text-base">
//                   Browse Demands
//                 </Link>
//               </div>
//               <div className="bg-gray-800/50 backdrop-blur-lg p-6 md:p-8 rounded-2xl border border-gray-700/50 shadow-xl hover:transform hover:scale-105 transition-all duration-300">
//                 <div className="bg-green-600/20 p-4 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-4 md:mb-6">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                   </svg>
//                 </div>
//                 <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-green-400">Make Requests</h3>
//                 <p className="text-gray-300 mb-4 md:mb-6">Request necessary infrastructure in your area and gather community support.</p>
//                 <Link href="/raise-request" className="inline-block px-4 py-2 md:px-6 md:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm md:text-base">
//                   Raise Request
//                 </Link>
//               </div>
//             </div>
//             <div className="bg-gray-800/30 backdrop-blur-lg p-6 md:p-8 rounded-2xl border border-gray-700/50 shadow-xl mb-8 md:mb-16">
//               <div className="text-center">
//                 <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">How It Works</h2>
//                 <p className="text-gray-300 mb-6 md:mb-8 max-w-3xl mx-auto">CrowdInfra connects citizens, government agencies, and private developers to collaboratively improve infrastructure.</p>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
//                   <div className="flex flex-col items-center">
//                     <div className="bg-blue-600/20 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 md:mb-4">
//                       <span className="text-xl md:text-2xl font-bold text-blue-400">1</span>
//                     </div>
//                     <h3 className="text-lg md:text-xl font-semibold mb-2">Identify Needs</h3>
//                     <p className="text-gray-400">Identify infrastructure needs in your community and create requests</p>
//                   </div>
//                   <div className="flex flex-col items-center">
//                     <div className="bg-purple-600/20 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 md:mb-4">
//                       <span className="text-xl md:text-2xl font-bold text-purple-400">2</span>
//                     </div>
//                     <h3 className="text-lg md:text-xl font-semibold mb-2">Gather Support</h3>
//                     <p className="text-gray-400">Community members upvote and comment on important requests</p>
//                   </div>
//                   <div className="flex flex-col items-center">
//                     <div className="bg-green-600/20 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 md:mb-4">
//                       <span className="text-xl md:text-2xl font-bold text-green-400">3</span>
//                     </div>
//                     <h3 className="text-lg md:text-xl font-semibold mb-2">Implementation</h3>
//                     <p className="text-gray-400">Authorities and developers respond to community-backed requests</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="text-center">
//               <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Ready to improve your community?</h2>
//               <Link href="/raise-request" className="inline-block px-4 py-2 md:px-5 md:py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 text-base md:text-lg font-semibold">
//                 Lets Bring a Change
//               </Link>
//             </div>
//           </div>
//         </div>
//         <NearbyDemandsMap />
//         {showMap && <Maps />}
//         <Footer />
//     </>
//   );
// }







// // -----------------------------------------------------------------



// // "use client";
// // import { useEffect, useRef, useState } from "react";
// // import { useRouter } from 'next/navigation'
// // import Script from "next/script";
// // import * as THREE from "three";
// // import Maps from "./maps/page";
// // import Navbar from "./components/navbar";
// // import Link from "next/link";
// // import Footer from "./components/footer";
// // import NearbyDemandsMap from "./components/NearbyDemandsMap";
// // import Loading from "./components/loading";
// // import axios from "axios";
// // import { toast } from "react-toastify";

// // export default function GlobePage() {
// //   const globeRef = useRef();
// //   const [isMapExpanded, setIsMapExpanded] = useState(false);
// //   const [showMap, setShowMap] = useState(false);
// //   const [isAuthenticated, setIsAuthenticated] = useState(false)
// //   const router = useRouter()

// //   useEffect(() => {
// //     const verifyUser = async () => {
// //       try {
// //         const response = await axios.get(
// //           'http://localhost:5030/api/auth/verify',
// //           {
// //             withCredentials: true,
// //           }
// //         )
// //         if (response.data.valid) {
// //           console.log('User is authenticated:', response.data.user)
// //           setIsAuthenticated(true)
// //         } else {
// //           console.log('Invalid token. Redirecting...')
// //           toast.error('Please login to continue')
// //           router.push('/landing')
// //         }
// //       } catch (error) {
// //         console.error('Error verifying user:', error)
// //         router.push('/landing')
// //       }
// //     }
// //     verifyUser()
// //   }, [])

// //   if (isAuthenticated === null) {
// //     return <Loading text='Verifying user...' />
// //   }

// //   const initGlobe = () => {
// //     const world = (globeRef.current.__world = new Globe(globeRef.current, {
// //       animateIn: false,
// //     })
// //       .globeImageUrl(
// //         "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
// //       )
// //       .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png"));
// //       world.controls().autoRotate = true;
// //       world.controls().autoRotateSpeed = 0.35;
// //       const CLOUDS_IMG_URL = "./clouds.png";
// //       const CLOUDS_ALT = 0.004;
// //       const CLOUDS_ROTATION_SPEED = -0.006;
// //       new THREE.TextureLoader().load(CLOUDS_IMG_URL, (cloudsTexture) => {
// //         const clouds = new THREE.Mesh(
// //           new THREE.SphereGeometry(
// //           world.getGlobeRadius() * (1 + CLOUDS_ALT),
// //           75,
// //           75
// //         ),
// //         new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true })
// //       );
// //       world.scene().add(clouds);
// //       (function rotateClouds() {
// //         clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
// //         requestAnimationFrame(rotateClouds);
// //       })();
// //     });
// //     globeRef.current.addEventListener('dblclick', handleMapToggle);
// //     const handleResize = () => {
// //       if (world) {
// //         world.width(window.innerWidth);
// //         world.height(window.innerHeight * 0.8);
// //       }
// //     };
// //     window.addEventListener('resize', handleResize);
// //     handleResize();
// //     return () => {
// //       window.removeEventListener('resize', handleResize);
// //       globeRef.current?.removeEventListener('dblclick', handleMapToggle);
// //     };
// //   };

// //   const handleMapToggle = () => {
// //     if (!showMap) return;
// //     setIsMapExpanded(!isMapExpanded);
// //     if (!isMapExpanded) {
// //       const mapElement = document.getElementById("map");
// //       if (mapElement) {
// //         mapElement.scrollIntoView({ behavior: 'smooth' });
// //         mapElement.style.transition = `opacity 1000ms`;
// //         mapElement.style.opacity = "1";
// //       } else {
// //         window.scrollTo({
// //           top: document.body.scrollHeight,
// //           behavior: 'smooth'
// //         });
// //       }
// //       const navC = document.getElementById("navC");
// //       if (navC) {
// //         navC.style.background = "transparent";
// //       }
// //     } else {
// //       window.scrollTo({
// //         top: 0,
// //         behavior: 'smooth'
// //       });
// //       const bottomElement = document.getElementById("map");
// //       if (bottomElement) {
// //         bottomElement.style.opacity = "0";
// //       }
// //       const navC = document.getElementById("navC");
// //       if (navC) {
// //         navC.style.background = "black";
// //       }
// //     }
// //   };

// //   return (
// //     <>
// //       <Script src="//unpkg.com/globe.gl" onLoad={initGlobe} />
// //       <div id="navC" className="bg-black pt-4 md:pt-8 pb-2 md:pb-4 sticky top-0 z-[999]">
// //         <Navbar />
// //       </div>
// //       <div style={{ marginTop: "0px", padding:"0px" }} className="z-10 h-[50vh] md:h-[70vh] lg:h-[80vh]">
// //         <div 
// //           ref={globeRef} 
// //           id="globeViz" 
// //           className="z-1000 cursor-pointer w-full h-full transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl"
// //         />
// //       </div>
// //       <div className="bg-gradient-to-br from-black via-gray-900 to-black py-8 md:py-16 px-4 text-white" style={{marginTop: "-1px"}}>
// //         <div className="max-w-7xl mx-auto">
// //           <div className="text-center mb-8 md:mb-16">
// //             <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse">
// //               CrowdInfra - India's First Crowdsourced Infrastructure Platform
// //             </h1>
// //             <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
// //               Contribute to improving infrastructure around you and be a part of your community's development.
// //             </p>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16">
// //             {[
// //               {
// //                 icon: (
// //                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
// //                   </svg>
// //                 ),
// //                 title: "Find Properties",
// //                 description: "Discover available properties in your area and get detailed information about them.",
// //                 link: "/property",
// //                 bgColor: "bg-blue-600/20",
// //                 textColor: "text-blue-400",
// //                 buttonColor: "bg-blue-600 hover:bg-blue-700"
// //               },
// //               {
// //                 icon: (
// //                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
// //                   </svg>
// //                 ),
// //                 title: "View Demands",
// //                 description: "See infrastructure demands made by the community and support them.",
// //                 link: "/search-demands",
// //                 bgColor: "bg-purple-600/20",
// //                 textColor: "text-purple-400",
// //                 buttonColor: "bg-purple-600 hover:bg-purple-700"
// //               },
// //               {
// //                 icon: (
// //                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
// //                   </svg>
// //                 ),
// //                 title: "Make Requests",
// //                 description: "Request necessary infrastructure in your area and gather community support.",
// //                 link: "/raise-request",
// //                 bgColor: "bg-green-600/20",
// //                 textColor: "text-green-400",
// //                 buttonColor: "bg-green-600 hover:bg-green-700"
// //               }
// //             ].map((card, index) => (
// //               <div 
// //                 key={index} 
// //                 className={`
// //                   ${card.bgColor} backdrop-blur-lg p-6 md:p-8 rounded-3xl border border-opacity-50 
// //                   transition-all duration-500 ease-in-out transform hover:-translate-y-2 hover:scale-105 
// //                   hover:shadow-2xl hover:border-opacity-100 relative overflow-hidden group
// //                 `}
// //               >
// //                 <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
// //                 <div className={`${card.bgColor} p-4 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-4 md:mb-6`}>
// //                   {card.icon}
// //                 </div>
// //                 <h3 className={`text-xl md:text-2xl font-bold mb-2 md:mb-3 ${card.textColor}`}>
// //                   {card.title}
// //                 </h3>
// //                 <p className="text-gray-300 mb-4 md:mb-6">
// //                   {card.description}
// //                 </p>
// //                 <Link 
// //                   href={card.link} 
// //                   className={`
// //                     inline-block px-4 py-2 md:px-6 md:py-3 text-white rounded-lg transition-all 
// //                     duration-300 text-sm md:text-base ${card.buttonColor} 
// //                     hover:shadow-lg hover:translate-x-1 hover:-translate-y-1
// //                   `}
// //                 >
// //                   Explore Now
// //                 </Link>
// //               </div>
// //             ))}
// //           </div>

// //           {/* Rest of the page remains the same */}
// //           <div className="bg-gray-800/30 backdrop-blur-lg p-6 md:p-8 rounded-2xl border border-gray-700/50 shadow-xl mb-8 md:mb-16">
// //             <div className="text-center">
// //               <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
// //                 How It Works
// //               </h2>
// //               <p className="text-gray-300 mb-6 md:mb-8 max-w-3xl mx-auto">
// //                 CrowdInfra connects citizens, government agencies, and private developers to collaboratively improve infrastructure.
// //               </p>
// //               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
// //                 {[
// //                   { 
// //                     number: "1", 
// //                     title: "Identify Needs", 
// //                     desc: "Identify infrastructure needs in your community and create requests",
// //                     bgColor: "bg-blue-600/20",
// //                     textColor: "text-blue-400"
// //                   },
// //                   { 
// //                     number: "2", 
// //                     title: "Gather Support", 
// //                     desc: "Community members upvote and comment on important requests",
// //                     bgColor: "bg-purple-600/20",
// //                     textColor: "text-purple-400"
// //                   },
// //                   { 
// //                     number: "3", 
// //                     title: "Implementation", 
// //                     desc: "Authorities and developers respond to community-backed requests",
// //                     bgColor: "bg-green-600/20",
// //                     textColor: "text-green-400"
// //                   }
// //                 ].map((step, index) => (
// //                   <div 
// //                     key={index} 
// //                     className="flex flex-col items-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl p-4 rounded-2xl"
// //                   >
// //                     <div className={`${step.bgColor} w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 md:mb-4`}>
// //                       <span className={`text-xl md:text-2xl font-bold ${step.textColor}`}>
// //                         {step.number}
// //                       </span>
// //                     </div>
// //                     <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">
// //                       {step.title}
// //                     </h3>
// //                     <p className="text-gray-400 text-center">
// //                       {step.desc}
// //                     </p>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
          
// //           <div className="text-center bg-gray-900 p-8 rounded-3xl shadow-2xl">
// //             <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse">
// //               Ready to improve your community?
// //             </h2>
// //             <Link 
// //               href="/raise-request" 
// //               className="
// //                 inline-block px-6 py-3 md:px-8 md:py-4 
// //                 bg-gradient-to-r from-blue-500 to-purple-600 
// //                 text-white rounded-full 
// //                 transition-all duration-500 
// //                 transform hover:scale-110 hover:rotate-6 
// //                 hover:shadow-2xl text-base md:text-lg font-semibold
// //                 animate-shimmer
// //               "
// //             >
// //               Let's Bring a Change
// //             </Link>
// //           </div>
// //         </div>
// //       </div>
// //       <NearbyDemandsMap />
// //       {showMap && <Maps />}
// //       <Footer />
// //     </>
// //   );
// // }


// --------------------------------------------------------------------------------

"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation'
import Script from "next/script";
import * as THREE from "three";
import Maps from "./maps/page";
import Navbar from "./components/navbar";
import Link from "next/link";
import Footer from "./components/footer";
import NearbyDemandsMap from "./components/NearbyDemandsMap";
import Loading from "./components/loading";
import axios from "axios";
import { toast } from "react-toastify";
import DecryptedText from './ui_comp/de_para'
import GradientText from './components/ui/gradientText'
import Rating from "./components/ratings";

export default function GlobePage() {
  const globeRef = useRef();
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5030/api/auth/verify',
          {
            withCredentials: true,
          }
        )
        if (response.data.valid) {
          console.log('User is authenticated:', response.data.user)
          setIsAuthenticated(true)
        } else {
          console.log('Invalid token. Redirecting...')
          toast.error('Please login to continue')
          router.push('/landing')
        }
      } catch (error) {
        console.error('Error verifying user:', error)
        router.push('/landing')
      }
    }
    verifyUser()
  }, [])

  if (isAuthenticated === null) {
    return <Loading text='Verifying user...' />
  }

  const initGlobe = () => {
    const world = (globeRef.current.__world = new Globe(globeRef.current, {
      animateIn: false,
    })
      .globeImageUrl(
        "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      )
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png"));
      world.controls().autoRotate = true;
      world.controls().autoRotateSpeed = 0.35;
      const CLOUDS_IMG_URL = "./clouds.png";
      const CLOUDS_ALT = 0.004;
      const CLOUDS_ROTATION_SPEED = -0.006;
      new THREE.TextureLoader().load(CLOUDS_IMG_URL, (cloudsTexture) => {
        const clouds = new THREE.Mesh(
          new THREE.SphereGeometry(
          world.getGlobeRadius() * (1 + CLOUDS_ALT),
          75,
          75
        ),
        new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true })
      );
      world.scene().add(clouds);
      (function rotateClouds() {
        clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
        requestAnimationFrame(rotateClouds);
      })();
    });
    globeRef.current.addEventListener('dblclick', handleMapToggle);
    const handleResize = () => {
      if (world) {
        world.width(window.innerWidth);
        world.height(window.innerHeight * 0.8);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
      globeRef.current?.removeEventListener('dblclick', handleMapToggle);
    };
  };

  const handleMapToggle = () => {
    if (!showMap) return;
    setIsMapExpanded(!isMapExpanded);
    if (!isMapExpanded) {
      const mapElement = document.getElementById("map");
      if (mapElement) {
        mapElement.scrollIntoView({ behavior: 'smooth' });
        mapElement.style.transition = `opacity 1000ms`;
        mapElement.style.opacity = "1";
      } else {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }
      const navC = document.getElementById("navC");
      if (navC) {
        navC.style.background = "transparent";
      }
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      const bottomElement = document.getElementById("map");
      if (bottomElement) {
        bottomElement.style.opacity = "0";
      }
      const navC = document.getElementById("navC");
      if (navC) {
        navC.style.background = "black";
      }
    }
  };

  return (
    <>
      <Script src="//unpkg.com/globe.gl" onLoad={initGlobe} />
      <div 
        id="navC" 
        className="bg-gradient-to-r from-black via-gray-900 to-black pt-4 md:pt-8 pb-2 md:pb-4 sticky top-0 z-[999] shadow-2xl transition-all duration-500 ease-in-out"
      >
        <Navbar />
      </div>

      {/* Animated Globe Section */}
      <div 
        className="relative w-full h-[50vh] md:h-[70vh] lg:h-[80vh] overflow-hidden bg-gradient-to-b from-black via-gray-900 to-gray-800 perspective-1000"
      >
        <div 
          ref={globeRef} 
          id="globeViz" 
          className="z-1000 cursor-pointer w-full h-full transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
        />
        <div className="absolute inset-0 bg-black opacity-20 mix-blend-overlay"></div>
      </div>
      <div
        id='navC'
        className='bg-black pt-4 md:pt-8 pb-2 md:pb-4 sticky top-0 z-[999]'
      >
        <Navbar />
        <Script src='//unpkg.com/globe.gl' onLoad={initGlobe} />
      </div>
      <div
        style={{ marginTop: '0px', padding: '0px' }}
        className='z-10 h-[50vh] md:h-[70vh] lg:h-[80vh]'
      >
        <div
          ref={globeRef}
          id='globeViz'
          className='z-1000 cursor-pointer w-full h-full'
        />
      </div>

      {/* Main Content with Enhanced Styling */}
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 py-16 px-4 text-white relative overflow-hidden">
        {/* Animated Glow Effects */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Title with Glowing Effect */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x">
              CrowdInfra - India's First Crowdsourced Infrastructure Platform
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto opacity-80 hover:opacity-100 transition-opacity duration-500">
              Contribute to improving infrastructure around you and be a part of your community's development.
            </p>
          </div>

          {/* Cards with Advanced Hover Effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Find Properties",
                description: "Discover available properties in your area and get detailed information about them.",
                link: "/property",
                color: "blue",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                )
              },
              {
                title: "View Demands",
                description: "See infrastructure demands made by the community and support them.",
                link: "/search-demands",
                color: "purple",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: "Make Requests",
                description: "Request necessary infrastructure in your area and gather community support.",
                link: "/raise-request",
                color: "green",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                )
              }
            ].map(({ title, description, link, color, icon }, index) => (
              <div 
                key={index} 
                className={`
                  group relative p-8 rounded-2xl border border-gray-800 
                  bg-gradient-to-br from-gray-800 to-gray-900 
                  transform transition-all duration-500 
                  hover:-translate-y-4 hover:shadow-2xl 
                  hover:border-${color}-500 
                  hover:bg-gradient-to-br hover:from-gray-900 hover:to-${color}-900
                `}
              >
                <div className={`
                  absolute inset-0 bg-${color}-500 
                  opacity-0 group-hover:opacity-10 
                  transition-opacity duration-500 
                  rounded-2xl blur-lg
                `}></div>
                
                <div className={`
                  bg-${color}-600/20 p-4 rounded-full w-16 h-16 
                  flex items-center justify-center mb-6 
                  transition-transform duration-500 
                  group-hover:rotate-12
                  group-hover:z-10
                `}>
                  {icon}
                </div>
                
                <h3 className={`text-2xl font-bold mb-3 text-${color}-400 group-hover:text-white transition-colors`}>
                  {title}
                </h3>
                
                <p className="text-gray-300 mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                  {description}
                </p>
                
                <Link 
                  href={link} 
                  className={`
                    inline-block px-6 py-3 
                    bg-${color}-600 text-white 
                    rounded-lg hover:bg-${color}-700 
                    transition-all duration-300 
                    transform hover:scale-105 
                    hover:shadow-lg
                  `}
                >
                  {title.split(" ")[1]}
                </Link>
              </div>
            ))}
          </div>

          {/* How It Works Section */}
          <div className="bg-gray-800/30 backdrop-blur-lg p-8 rounded-2xl border border-gray-700/50 shadow-xl mb-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                How It Works
              </h2>
              <p className="text-gray-300 mb-8 max-w-3xl mx-auto opacity-80 hover:opacity-100 transition-opacity">
                CrowdInfra connects citizens, government agencies, and private developers to collaboratively improve infrastructure.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { number: "1", title: "Identify Needs", description: "Identify infrastructure needs in your community and create requests" },
                  { number: "2", title: "Gather Support", description: "Community members upvote and comment on important requests" },
                  { number: "3", title: "Implementation", description: "Authorities and developers respond to community-backed requests" }
                ].map(({ number, title, description }, index) => (
                  <div 
                    key={index} 
                    className="
                      flex flex-col items-center 
                      transform transition-all duration-500 
                      hover:-translate-y-2 hover:scale-105
                    "
                  >
                    <div 
                      className={`
                        w-16 h-16 rounded-full 
                        flex items-center justify-center mb-4 
                        bg-gradient-to-br from-blue-600/20 to-purple-600/20
                        shadow-lg transform transition-transform hover:rotate-12
                      `}
                    >
                      <span className="text-2xl font-bold text-blue-400">{number}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
                    <p className="text-gray-400 text-center">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              Ready to improve your community?
            </h2>
            <Link 
              href="/raise-request" 
              className="
                inline-block px-8 py-4 
                bg-gradient-to-r from-green-500 to-blue-600 
                text-white rounded-lg 
                hover:from-green-600 hover:to-blue-700 
                transition-all duration-500 
                transform hover:scale-110 
                hover:shadow-2xl 
                text-lg font-semibold
                animate-pulse hover:animate-none
              "
            >
              Let's Bring a Change
            </Link>
          </div>
        </div>
      </div>

      <NearbyDemandsMap />
      {showMap && <Maps />}
      <Footer />
    </>
  );
}