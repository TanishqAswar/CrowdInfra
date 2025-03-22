// // 'use client'
// // import { useEffect, useRef } from 'react'
// // import * as THREE from 'three'

// // const RotatingEarth = () => {
// //   const containerRef = useRef(null)
  
// //   useEffect(() => {
// //     if (!containerRef.current) return
    
// //     // Set up scene
// //     const scene = new THREE.Scene()
    
// //     // Set up camera
// //     const camera = new THREE.PerspectiveCamera(
// //       75, 
// //       containerRef.current.clientWidth / containerRef.current.clientHeight, 
// //       0.1, 
// //       1000
// //     )
// //     camera.position.z = 2
    
// //     // Set up renderer
// //     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
// //     renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
// //     renderer.setClearColor(0x000000, 0)
// //     containerRef.current.appendChild(renderer.domElement)
    
// //     // Create sphere for Earth
// //     const geometry = new THREE.SphereGeometry(1, 64, 64)
    
// //     // Load Earth texture
// //     const textureLoader = new THREE.TextureLoader()
// //     const earthTexture = textureLoader.load('/earth.webp') 
    
// //     // Create material with the texture
// //     const material = new THREE.MeshBasicMaterial({
// //       map: earthTexture
// //     })
    
// //     // Create the Earth mesh
// //     const earth = new THREE.Mesh(geometry, material)
// //     scene.add(earth)
    
// //     // Add subtle ambient light
// //     const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
// //     scene.add(ambientLight)
    
// //     // Add directional light to create shadows
// //     const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
// //     directionalLight.position.set(5, 3, 5)
// //     scene.add(directionalLight)
    
// //     // Animation loop
// //     const animate = () => {
// //       requestAnimationFrame(animate)
      
// //       // Rotate the earth
// //       earth.rotation.y += 0.002
      
// //       renderer.render(scene, camera)
// //     }
    
// //     // Handle window resize
// //     const handleResize = () => {
// //       if (!containerRef.current) return
      
// //       camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
// //       camera.updateProjectionMatrix()
// //       renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
// //     }
    
// //     window.addEventListener('resize', handleResize)
    
// //     // Start animation
// //     animate()
    
// //     // Cleanup
// //     return () => {
// //       window.removeEventListener('resize', handleResize)
// //       if (containerRef.current) {
// //         containerRef.current.removeChild(renderer.domElement)
// //       }
// //     }
// //   }, [])
  
// //   return <div ref={containerRef} className="w-full h-full" />
// // }

// // export default RotatingEarth

// 'use client'
// import { useEffect, useRef } from 'react'
// import * as THREE from 'three'

// const RotatingEarth = () => {
//   const containerRef = useRef(null)
  
//   useEffect(() => {
//     if (!containerRef.current) return
    
//     // Set up scene
//     const scene = new THREE.Scene()
    
//     // Set up camera with better positioning
//     const camera = new THREE.PerspectiveCamera(
//       60, 
//       containerRef.current.clientWidth / containerRef.current.clientHeight, 
//       0.1, 
//       1000
//     )
//     camera.position.z = 2.5
    
//     // Set up renderer with better quality
//     const renderer = new THREE.WebGLRenderer({ 
//       antialias: true, 
//       alpha: true,
//       powerPreference: "high-performance"
//     })
//     renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
//     renderer.setPixelRatio(window.devicePixelRatio)
//     renderer.setClearColor(0x000000, 0)
//     containerRef.current.appendChild(renderer.domElement)
    
//     // Create higher quality sphere for Earth
//     const geometry = new THREE.SphereGeometry(1, 128, 128)
    
//     // Load Earth texture
//     const textureLoader = new THREE.TextureLoader()
    
//     // Load multiple textures for better realism
//     const earthTexture = textureLoader.load('/earth.webp')
//     // Optional: Add these if you have them available
//     // const bumpMap = textureLoader.load('/earth-bump.webp')
//     // const specularMap = textureLoader.load('/earth-specular.webp')
//     // const cloudsTexture = textureLoader.load('/earth-clouds.webp')
    
//     // Create improved material with the texture
//     const material = new THREE.MeshPhongMaterial({
//       map: earthTexture,
//       // bumpMap: bumpMap,
//       // bumpScale: 0.05,
//       // specularMap: specularMap,
//       // shininess: 5,
//     })
    
//     // Create the Earth mesh
//     const earth = new THREE.Mesh(geometry, material)
//     scene.add(earth)
    
//     // Optional: Create cloud layer
//     // const cloudsGeometry = new THREE.SphereGeometry(1.01, 128, 128)
//     // const cloudsMaterial = new THREE.MeshPhongMaterial({
//     //   map: cloudsTexture,
//     //   transparent: true,
//     //   opacity: 0.4
//     // })
//     // const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial)
//     // scene.add(clouds)
    
//     // Add better lighting
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
//     scene.add(ambientLight)
    
//     // Add directional light to create shadows and highlight
//     const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5)
//     directionalLight.position.set(5, 3, 5)
//     scene.add(directionalLight)
    
//     // Add a subtle blue point light to enhance the atmosphere effect
//     const blueLight = new THREE.PointLight(0x3677ac, 0.5)
//     blueLight.position.set(-5, -3, -5)
//     scene.add(blueLight)
    
//     // Animation loop with smoother rotation
//     let lastTime = 0
//     const rotationSpeed = 0.05 // Degrees per second
    
//     const animate = (time) => {
//       const delta = (time - lastTime) / 1000
//       lastTime = time
      
//       // Rotate the earth with consistent speed regardless of frame rate
//       earth.rotation.y += rotationSpeed * delta
      
//       // If using clouds, rotate them at a slightly different speed
//       // if (clouds) clouds.rotation.y += 0.0015 * delta
      
//       renderer.render(scene, camera)
//       requestAnimationFrame(animate)
//     }
    
//     // Improved window resize handler
//     const handleResize = () => {
//       if (!containerRef.current) return
      
//       const width = containerRef.current.clientWidth
//       const height = containerRef.current.clientHeight
      
//       camera.aspect = width / height
//       camera.updateProjectionMatrix()
//       renderer.setSize(width, height)
//       renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//     }
    
//     window.addEventListener('resize', handleResize)
    
//     // Start animation
//     requestAnimationFrame(animate)
    
//     // Cleanup
//     return () => {
//       window.removeEventListener('resize', handleResize)
//       if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
//         containerRef.current.removeChild(renderer.domElement)
//       }
//       geometry.dispose()
//       material.dispose()
//       // if (cloudsGeometry) cloudsGeometry.dispose()
//       // if (cloudsMaterial) cloudsMaterial.dispose()
//     }
//   }, [])
  
//   return <div ref={containerRef} className="w-full h-full" />
// }

// export default RotatingEarth


'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const RotatingEarth = () => {
  const containerRef = useRef(null)
  
  useEffect(() => {
    if (!containerRef.current) return
    
    // Set up scene
    const scene = new THREE.Scene()
    
    // Set up camera with perfect positioning
    const camera = new THREE.PerspectiveCamera(
      50, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    )
    camera.position.z = 2.8
    
    // Set up high-quality renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)
    
    // Create detailed sphere for Earth
    const geometry = new THREE.SphereGeometry(1, 128, 128)
    
    // Load Earth texture
    const textureLoader = new THREE.TextureLoader()
    const earthTexture = textureLoader.load('/earth.webp')
    
    // Create atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(1.02, 128, 128)
    const atmosphereMaterial = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.3, 0.6, 1.0, 0.5) * intensity;
        }
      `
    })
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
    scene.add(atmosphere)
    
    // Create enhanced material with the texture
    const material = new THREE.MeshPhongMaterial({
      map: earthTexture,
      shininess: 10,
      specular: new THREE.Color(0x333333)
    })
    
    // Create the Earth mesh
    const earth = new THREE.Mesh(geometry, material)
    scene.add(earth)
    
    // Add ambient light for base illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambientLight)
    
    // Add directional light for sunlight effect
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8)
    directionalLight.position.set(5, 3, 5)
    scene.add(directionalLight)
    
    // Add a subtle blue point light for atmosphere effect
    const blueLight = new THREE.PointLight(0x3677ac, 0.8)
    blueLight.position.set(-5, -3, -5)
    scene.add(blueLight)
    
    // Add stars in the background
    const starsGeometry = new THREE.BufferGeometry()
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.02,
      transparent: true
    })
    
    const starsVertices = []
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 20
      const y = (Math.random() - 0.5) * 20
      const z = (Math.random() - 0.5) * 20
      
      // Ensure stars are not too close to Earth
      if (Math.sqrt(x*x + y*y + z*z) > 5) {
        starsVertices.push(x, y, z)
      }
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3))
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)
    
    // Animation loop with smooth rotation
    let lastTime = 0
    const rotationSpeed = 0.05 // Degrees per second
    
    const animate = (time) => {
      const delta = (time - lastTime) / 1000
      lastTime = time
      
      // Rotate the earth with consistent speed
      earth.rotation.y += rotationSpeed * delta
      atmosphere.rotation.y += rotationSpeed * delta
      
      // Subtle floating animation for stars
      stars.rotation.y += 0.0005
      
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    
    // Responsive window resizing
    const handleResize = () => {
      if (!containerRef.current) return
      
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    
    window.addEventListener('resize', handleResize)
    
    // Start animation
    requestAnimationFrame(animate)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      atmosphereGeometry.dispose()
      atmosphereMaterial.dispose()
      starsGeometry.dispose()
      starsMaterial.dispose()
    }
  }, [])
  
  return <div ref={containerRef} className="w-full h-full" />
}

export default RotatingEarth