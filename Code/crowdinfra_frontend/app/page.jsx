// // // 'use client'
// // // import React from 'react'
// // // import { useRouter } from 'next/navigation'
// // // import HeroSection from './components/hero_section'
// // // import DecryptedText from '@/app/ui_comp/de_para'

// // // export default function Home() {
// // //   const router = useRouter()

// // //   return (
// // //     <main className='min-h-screen bg-black'>
// // //       <HeroSection />
// // //       <div className='flex flex-col items-center justify-center gap-16 mt-16 px-4'>
// // //         {/* Main Heading */}
// // //         <div className='text-center'>
// // //           <DecryptedText
// // //             text='Empowering Communities Through Smart Infrastructure'
// // //             className='text-white text-4xl font-bold'
// // //             animateOn='view'
// // //             speed={100}
// // //             revealDirection='center'
// // //             parentClassName='mb-4'
// // //           />
// // //           <DecryptedText
// // //             text='Voice Your Needs, Shape Your Community'
// // //             className='text-blue-500 text-2xl'
// // //             animateOn='view'
// // //             speed={150}
// // //             revealDirection='center'
// // //           />
// // //         </div>

// // //         {/* Key Features */}
// // //         <div className='grid md:grid-cols-3 gap-8 max-w-6xl'>
// // //           <div className='bg-gray-900 p-8 rounded-xl'>
// // //             <DecryptedText
// // //               text='📍 Location Pinning'
// // //               className='text-white text-xl font-bold mb-4'
// // //               animateOn='view'
// // //               parentClassName='block'
// // //             />
// // //             <DecryptedText
// // //               text='Mark areas that need essential services like hospitals, banks, and canteens'
// // //               className='text-gray-300'
// // //               animateOn='view'
// // //               speed={80}
// // //             />
// // //           </div>

// // //           <div className='bg-gray-900 p-8 rounded-xl'>
// // //             <DecryptedText
// // //               text='👥 Community Voting'
// // //               className='text-white text-xl font-bold mb-4'
// // //               animateOn='view'
// // //               parentClassName='block'
// // //             />
// // //             <DecryptedText
// // //               text='Upvote and prioritize the most needed infrastructure in your area'
// // //               className='text-gray-300'
// // //               animateOn='view'
// // //               speed={80}
// // //             />
// // //           </div>

// // //           <div className='bg-gray-900 p-8 rounded-xl'>
// // //             <DecryptedText
// // //               text='🤖 Smart Analysis'
// // //               className='text-white text-xl font-bold mb-4'
// // //               animateOn='view'
// // //               parentClassName='block'
// // //             />
// // //             <DecryptedText
// // //               text='ML-powered insights on market viability and resource optimization'
// // //               className='text-gray-300'
// // //               animateOn='view'
// // //               speed={80}
// // //             />
// // //           </div>
// // //         </div>

// // //         {/* Call to Action */}
// // //         <div className='flex flex-col items-center justify-center space-y-8 min-h-[50vh] py-24 px-4'>
// // //           <DecryptedText
// // //             text='Ready to transform your community?'
// // //             className='text-white text-4xl font-bold mb-8 max-w-2xl'
// // //             animateOn='view'
// // //             speed={120}
// // //             revealDirection='center'
// // //             parentClassName='block text-center'
// // //           />
// // //           <DecryptedText
// // //             text='Join us in building better infrastructure for everyone'
// // //             className='text-gray-400 text-xl mb-12 max-w-2xl'
// // //             animateOn='view'
// // //             speed={100}
// // //             revealDirection='center'
// // //             parentClassName='text-center'
// // //           />
// // //           <div className='flex gap-4'>
// // //             <button
// // //               className='bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
// // //               onClick={() => router.push('/auth')}
// // //             >
// // //               Sign Up
// // //             </button>
// // //             <button
// // //               className='bg-transparent border border-blue-500 text-blue-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-500/10 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
// // //               onClick={() => router.push('/auth')}
// // //             >
// // //               Log In
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </main>
// // //   )
// // // }

'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import DecryptedText from '@/app/ui_comp/de_para'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Custom HeroSection component with Three.js
const HeroSection = () => {
  const mountRef = useRef(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    mountRef.current.appendChild(renderer.domElement)
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2)
    scene.add(ambientLight)
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)
    
    // City grid
    const gridSize = 50
    const cityGroup = new THREE.Group()
    scene.add(cityGroup)
    
    // Ground plane with grid
    const gridHelper = new THREE.GridHelper(gridSize * 2, gridSize * 2, 0x0088ff, 0x001a33)
    gridHelper.position.y = -0.1
    cityGroup.add(gridHelper)
    
    // Create buildings
    const buildingGeometries = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.BoxGeometry(1, 2, 1),
      new THREE.BoxGeometry(1, 3, 1),
      new THREE.BoxGeometry(1, 4, 1),
      new THREE.CylinderGeometry(0.5, 0.5, 2, 6)
    ]
    
    const buildingMaterials = [
      new THREE.MeshPhongMaterial({ color: 0x3498db, emissive: 0x0a2e52 }),
      new THREE.MeshPhongMaterial({ color: 0x2ecc71, emissive: 0x0b4d28 }),
      new THREE.MeshPhongMaterial({ color: 0xe74c3c, emissive: 0x5c1d16 }),
      new THREE.MeshPhongMaterial({ color: 0xf1c40f, emissive: 0x614e06 }),
      new THREE.MeshPhongMaterial({ color: 0x9b59b6, emissive: 0x3d2348 })
    ]
    
    // Create city layout
    for (let x = -gridSize / 2; x < gridSize / 2; x += 2) {
      for (let z = -gridSize / 2; z < gridSize / 2; z += 2) {
        // Skip some positions to create roads and empty spaces
        if (Math.random() > 0.7) continue
        
        const geoIndex = Math.floor(Math.random() * buildingGeometries.length)
        const matIndex = Math.floor(Math.random() * buildingMaterials.length)
        
        const building = new THREE.Mesh(
          buildingGeometries[geoIndex],
          buildingMaterials[matIndex]
        )
        
        const height = buildingGeometries[geoIndex].parameters.height || 1
        building.position.set(x, height / 2, z)
        building.scale.y = Math.random() * 2 + 0.5
        
        // Rotate some buildings
        if (Math.random() > 0.5) {
          building.rotation.y = Math.PI / (Math.random() * 4)
        }
        
        cityGroup.add(building)
      }
    }
    
    // Add pulsing marker points for "needed infrastructure"
    const markerPositions = [
      { x: 10, z: 10, type: 'hospital', color: 0xff3333 },
      { x: -15, z: 5, type: 'bank', color: 0x33ff33 },
      { x: 0, z: -20, type: 'school', color: 0x3333ff },
      { x: -8, z: -12, type: 'market', color: 0xffff33 },
      { x: 20, z: -5, type: 'transport', color: 0xff33ff }
    ]
    
    const markers = []
    markerPositions.forEach(marker => {
      const markerGeometry = new THREE.SphereGeometry(0.5, 16, 16)
      const markerMaterial = new THREE.MeshPhongMaterial({ 
        color: marker.color,
        emissive: marker.color,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.8
      })
      
      const markerMesh = new THREE.Mesh(markerGeometry, markerMaterial)
      markerMesh.position.set(marker.x, 5, marker.z)
      markerMesh.userData = { 
        type: marker.type,
        initialScale: 1,
        pulseDirection: 1,
        pulseSpeed: 0.02 + Math.random() * 0.01
      }
      
      // Add connecting line to ground
      const lineMaterial = new THREE.LineBasicMaterial({ color: marker.color })
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(marker.x, 0, marker.z),
        new THREE.Vector3(marker.x, 5, marker.z)
      ])
      const line = new THREE.Line(lineGeometry, lineMaterial)
      
      cityGroup.add(markerMesh)
      cityGroup.add(line)
      markers.push(markerMesh)
    })
    
    // Add floating particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particleCount = 500
    const posArray = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      color: 0x0088ff,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true
    })
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)
    
    // Position camera
    camera.position.set(30, 20, 30)
    camera.lookAt(0, 0, 0)
    
    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.maxPolarAngle = Math.PI / 2 - 0.1
    controls.minDistance = 15
    controls.maxDistance = 60
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    
    window.addEventListener('resize', handleResize)
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      
      // Rotate city slowly
      cityGroup.rotation.y += 0.001
      
      // Animate particles
      particlesMesh.rotation.y += 0.0005
      
      // Animate markers (pulsing effect)
      markers.forEach(marker => {
        const data = marker.userData
        
        // Pulsing scale
        if (data.initialScale > 1.3) data.pulseDirection = -1
        if (data.initialScale < 0.7) data.pulseDirection = 1
        
        data.initialScale += data.pulseSpeed * data.pulseDirection
        marker.scale.set(data.initialScale, data.initialScale, data.initialScale)
        
        // Float up and down
        marker.position.y = 5 + Math.sin(Date.now() * 0.001 + markers.indexOf(marker)) * 0.5
      })
      
      controls.update()
      renderer.render(scene, camera)
    }
    
    animate()
    setIsReady(true)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      mountRef.current?.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return (
    <div className="relative w-full h-screen">
      <div ref={mountRef} className="absolute inset-0" />
      <div className="absolute inset-0 flex items-center justify-center z-10 p-4">
        <div className={`text-center transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
          <DecryptedText
            text="CROWD INFRA"
            className="text-white text-7xl font-bold tracking-wider mb-4 text-shadow-lg"
            animateOn="view"
            speed={80}
            revealDirection="center"
          />
          <br />
          <DecryptedText
            text="Mapping Community Infrastructure Together"
            className="text-white text-2xl mt-4"
            animateOn="view"
            speed={120}
            revealDirection="center"
          />
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const router = useRouter()
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className='min-h-screen bg-black overflow-x-hidden scrollbar-hide'>
      <HeroSection />
      
      <div className='flex flex-col items-center justify-center gap-16 mt-16 px-4 relative scrollbar-hide'>
        {/* Parallax particles background */}
        <div 
          className="fixed inset-0 pointer-events-none z-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(3,37,84,0.3) 0%, rgba(0,0,0,0) 70%)`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            transform: `translateY(${scrollPosition * 0.3}px)`
          }}
        />
        
        {/* Main Heading */}
        <div className='text-center relative z-10'>
          <DecryptedText
            text='Empowering Communities Through Smart Infrastructure'
            className='text-white text-2xl md:text-5xl lg:text-4xl font-bold'
            animateOn='view'
            speed={100}
            revealDirection='center'
            parentClassName='mb-4'
          />
          <br />
          <DecryptedText
            text='Voice Your Needs, Shape Your Community'
            className='text-zinc-400 text-2xl'
            animateOn='view'
            speed={150}
            revealDirection='center'
          />
        </div>
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto relative z-10 px-4">
  <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-8 rounded-xl shadow-xl hover:scale-105 transform transition-all duration-300">
    <div className="mb-6 text-5xl">📍</div>
    <DecryptedText
      text="Location Pinning"
      className="text-white text-2xl font-bold mb-4"
      animateOn="view"
      speed={60}
      delay={0}
      parentClassName="block"
    />
    <DecryptedText
      text="Mark areas that need essential services like hospitals, banks, and canteens"
      className="text-gray-100"
      animateOn="view"
      speed={70}
      delay={600}
    />
  </div>

  <div className="bg-gradient-to-r from-green-400 to-green-500 p-8 rounded-xl shadow-xl hover:scale-105 transform transition-all duration-300">
    <div className="mb-6 text-5xl">👥</div>
    <DecryptedText
      text="Community Voting"
      className="text-white text-2xl font-bold mb-4"
      animateOn="view"
      speed={60}
      delay={200}
      parentClassName="block"
    />
    <DecryptedText
      text="Upvote and prioritize the most needed infrastructure in your area"
      className="text-gray-100"
      animateOn="view"
      speed={70}
      delay={800}
    />
  </div>

  <div className="bg-gradient-to-r from-purple-400 to-purple-500 p-8 rounded-xl shadow-xl hover:scale-105 transform transition-all duration-300">
    <div className="mb-6 text-5xl">🤖</div>
    <DecryptedText
      text="Smart Analysis"
      className="text-white text-2xl font-bold mb-4"
      animateOn="view"
      speed={60}
      delay={400}
      parentClassName="block"
    />
    <DecryptedText
      text="ML-powered insights on market viability and resource optimization"
      className="text-gray-100"
      animateOn="view"
      speed={70}
      delay={1000}
    />
  </div>
       </div>
<div className="w-full max-w-6xl bg-gradient-to-br from-gray-900/90 to-gray-800/80 backdrop-blur-md p-10 rounded-xl border border-blue-700/30 shadow-lg shadow-blue-900/20 mt-16 relative z-10">
  <div className="text-center mb-16">
    <DecryptedText
      text="How It Works"
      className="text-white text-4xl font-bold mb-6 tracking-wide"
      animateOn="view"
      speed={100}
      revealDirection="center"
    />
    <div className="w-24 h-1 bg-blue-500 mx-auto mb-6 rounded-full" />
    <DecryptedText
      text="Our platform bridges community needs with smart urban planning"
      className="text-gray-300 text-lg max-w-2xl mx-auto"
      animateOn="view"
      speed={80}
      revealDirection="center"
    />
  </div>
  
  <div className="grid md:grid-cols-3 gap-12">
    <div className="flex flex-col items-center text-center group hover:transform hover:scale-105 transition-all duration-300 p-6 rounded-lg hover:bg-blue-900/20">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center mb-6 text-3xl font-bold text-white shadow-lg shadow-blue-800/30 group-hover:shadow-blue-500/40 transition-all duration-300">
        1
      </div>
      <h3 className="text-white text-xl font-bold mb-4">Community Input</h3>
      <p className="text-gray-400">Citizens mark locations and vote on needed infrastructure through our intuitive mapping interface</p>
    </div>
    
    <div className="flex flex-col items-center text-center group hover:transform hover:scale-105 transition-all duration-300 p-6 rounded-lg hover:bg-blue-900/20">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center mb-6 text-3xl font-bold text-white shadow-lg shadow-blue-800/30 group-hover:shadow-blue-500/40 transition-all duration-300">
        2
      </div>
      <h3 className="text-white text-xl font-bold mb-4">Data Analysis</h3>
      <p className="text-gray-400">Our AI processes community needs, evaluates feasibility, and generates detailed impact reports</p>
    </div>
    
    <div className="flex flex-col items-center text-center group hover:transform hover:scale-105 transition-all duration-300 p-6 rounded-lg hover:bg-blue-900/20">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center mb-6 text-3xl font-bold text-white shadow-lg shadow-blue-800/30 group-hover:shadow-blue-500/40 transition-all duration-300">
        3
      </div>
      <h3 className="text-white text-xl font-bold mb-4">Implementation</h3>
      <p className="text-gray-400">Prioritized infrastructure proposals are presented to local authorities with supporting community data</p>
    </div>
  </div>
  
</div>
        <div className="w-full max-w-6xl py-12 relative z-10">
  <div className="bg-gray-900/70 backdrop-blur-md rounded-2xl border border-blue-900/30 p-8 shadow-lg shadow-blue-900/10">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      <div className="flex flex-col items-center p-4 hover:bg-blue-900/20 rounded-xl transition-all duration-300 transform hover:scale-105">
        <div className="relative">
          <div className="text-blue-400 text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">250+</div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500/20 rounded-full blur-xl"></div>
        </div>
        <div className="text-gray-300 text-lg font-medium">Communities</div>
        <div className="w-16 h-1 bg-blue-500/50 rounded-full mt-3"></div>
      </div>
      
      <div className="flex flex-col items-center p-4 hover:bg-blue-900/20 rounded-xl transition-all duration-300 transform hover:scale-105">
        <div className="relative">
          <div className="text-blue-400 text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">15K+</div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500/20 rounded-full blur-xl"></div>
        </div>
        <div className="text-gray-300 text-lg font-medium">Active Users</div>
        <div className="w-16 h-1 bg-blue-500/50 rounded-full mt-3"></div>
      </div>
      
      <div className="flex flex-col items-center p-4 hover:bg-blue-900/20 rounded-xl transition-all duration-300 transform hover:scale-105">
        <div className="relative">
          <div className="text-blue-400 text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">3.2K</div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500/20 rounded-full blur-xl"></div>
        </div>
        <div className="text-gray-300 text-lg font-medium">Projects Completed</div>
        <div className="w-16 h-1 bg-blue-500/50 rounded-full mt-3"></div>
      </div>
      
      <div className="flex flex-col items-center p-4 hover:bg-blue-900/20 rounded-xl transition-all duration-300 transform hover:scale-105">
        <div className="relative">
          <div className="text-blue-400 text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">98%</div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500/20 rounded-full blur-xl"></div>
        </div>
        <div className="text-gray-300 text-lg font-medium">Satisfaction</div>
        <div className="w-16 h-1 bg-blue-500/50 rounded-full mt-3"></div>
      </div>
    </div>
  </div>
</div>
<div className="flex flex-col items-center justify-center space-y-4 min-h-[50vh] py-24 px-4 relative z-10">
  <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center p-8 rounded-xl transition-all duration-300 hover:bg-blue-900/10 hover:shadow-lg hover:shadow-blue-500/10">
    <h2 className="text-white text-4xl font-bold mb-6 transition-all duration-300 transform group-hover:text-blue-300">
      Ready to transform your community?
    </h2>
    
    <div className="w-16 h-1 bg-blue-500 rounded-full mb-6 transition-all duration-300 hover:w-24 hover:bg-blue-400"></div>
    
    <p className="text-gray-300 text-lg mb-10 max-w-xl transition-all duration-300 hover:text-gray-200">
      Join us in building better infrastructure for everyone
    </p>
    
    <button
      className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium transition-all duration-300 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105 active:scale-95 active:bg-blue-700"
      onClick={() => router.push('/auth')}
    >
      Get Started
    </button>
    
    <div className="mt-10 text-sm text-gray-400 transition-all duration-300 hover:text-gray-300">
      <p className="mb-4">Trusted by communities worldwide</p>
      <div className="flex items-center justify-center space-x-6">
        <div className="w-8 h-8 bg-gray-700 rounded-full transition-all duration-300 hover:bg-blue-700 hover:scale-110"></div>
        <div className="w-8 h-8 bg-gray-700 rounded-full transition-all duration-300 hover:bg-blue-700 hover:scale-110"></div>
        <div className="w-8 h-8 bg-gray-700 rounded-full transition-all duration-300 hover:bg-blue-700 hover:scale-110"></div>
      </div>
    </div>
  </div>
</div>
      </div>
      
      {/* Footer */}
      <footer className='bg-gray-900 py-8 mt-4 relative z-10'>
        <div className='container mx-auto px-4 text-center'>
          <p className='text-gray-400 text-sm'>© 2025 Urban Navigator. Building smarter communities together.</p>
        </div>
      </footer>
    </main>
  )
}
