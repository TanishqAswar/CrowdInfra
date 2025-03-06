"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import * as THREE from "three";
import Maps from "../maps/page";
import Navbar from "../components/navbar";
import { useUserContext } from "../components/user_context";
import Link from "next/link";

export default function GlobePage() {
  const globeRef = useRef();
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const initGlobe = () => {
    const world = (globeRef.current.__world = new Globe(globeRef.current, {
      animateIn: false,
    })
      .globeImageUrl(
        "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      )
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png"));

    // Auto-rotate
    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 0.35;

    // Add clouds sphere
    const CLOUDS_IMG_URL = "./clouds.png";
    const CLOUDS_ALT = 0.004;
    const CLOUDS_ROTATION_SPEED = -0.006; // deg/frame

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

    // Add double-click event listener to toggle map expansion
    globeRef.current.addEventListener('dblclick', handleMapToggle);
    
    // Make globe responsive
    const handleResize = () => {
      if (world) {
        world.width(window.innerWidth);
        world.height(window.innerHeight * 0.8);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial sizing
    
    return () => {
      window.removeEventListener('resize', handleResize);
      globeRef.current?.removeEventListener('dblclick', handleMapToggle);
    };
  };

  const handleMapToggle = () => {
    if (!showMap) return; // Don't toggle if map shouldn't be shown
    
    setIsMapExpanded(!isMapExpanded);
    
    if (!isMapExpanded) {
      // Expand map
      const mapElement = document.getElementById("map");
      if (mapElement) {
        mapElement.scrollIntoView({ behavior: 'smooth' });
        
        // Show map with transition
        mapElement.style.transition = `opacity 1000ms`;
        mapElement.style.opacity = "1";
      } else {
        // If map element doesn't exist yet, scroll to bottom
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }
      
      // Change navbar background
      const navC = document.getElementById("navC");
      if (navC) {
        navC.style.background = "transparent";
      }
    } else {
      // Collapse map - scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Hide map
      const bottomElement = document.getElementById("map");
      if (bottomElement) {
        bottomElement.style.opacity = "0";
      }
      
      // Reset navbar
      const navC = document.getElementById("navC");
      if (navC) {
        navC.style.background = "black";
      }
    }
  };

  // When the selectedPlace is not null or changed we need to rotate the map at high speed and zoom and scroll to the bottom of the screen.
  const { selectedPlace } = useUserContext();
  
  useEffect(() => {
    // Only show map when a place is selected
    setShowMap(!!selectedPlace);
    
    if (selectedPlace) {
      const world = globeRef.current.__world;
      if (world) {
        // Increase rotation speed and zoom in with transition
        const targetRotationSpeed = 5;
        const targetZoom = 20; // Double the zoom value
        const transitionDuration = 2000; // Transition duration in milliseconds

        const initialRotationSpeed = world.controls().autoRotateSpeed;
        const initialZoom = world.camera().position.z;

        const startTime = performance.now();

        const animateTransition = (currentTime) => {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / transitionDuration, 1);

          world.controls().autoRotateSpeed =
            initialRotationSpeed +
            (targetRotationSpeed - initialRotationSpeed) * progress;
          world.camera().position.z =
            initialZoom + (targetZoom - initialZoom) * progress;

          if (progress < 1) {
            requestAnimationFrame(animateTransition);
          } else {
            setIsMapExpanded(true);
            
            // Scroll to the map element if it exists
            const mapElement = document.getElementById("map");
            if (mapElement) {
              mapElement.scrollIntoView({ behavior: 'smooth' });
              mapElement.style.transition = `opacity ${transitionDuration}ms`;
              mapElement.style.opacity = "1";
            } else {
              // Fallback to scrolling to bottom
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
              });
            }
            
            const navC = document.getElementById("navC");
            if (navC) {
              navC.style.background="transparent";
            }
          }
        };

        requestAnimationFrame(animateTransition);
      }
    }
  }, [selectedPlace]);

  useEffect(() => {
    // Add instruction tooltip for users
    const tooltip = document.createElement('div');
    tooltip.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800/80 text-white px-4 py-2 rounded-full shadow-lg z-50 text-sm md:text-base';
    tooltip.innerHTML = 'Double-click to toggle map, scroll normally to navigate page';
    document.body.appendChild(tooltip);

    // Remove tooltip after 5 seconds
    setTimeout(() => {
      tooltip.style.opacity = '0';
      tooltip.style.transition = 'opacity 1s';
      setTimeout(() => tooltip.remove(), 1000);
    }, 5000);

    return () => {
      tooltip.remove();
    };
  }, []);

  return (
    <>
        <Script src="//unpkg.com/globe.gl" onLoad={initGlobe} />
        <div id="navC" className="bg-black pt-4 md:pt-8 pb-2 md:pb-4 sticky top-0 z-[999]">
          <Navbar />
        </div>
        <div style={{ margin: 0 }} className="z-10 h-[50vh] md:h-[70vh] lg:h-[80vh]">
          <div ref={globeRef} id="globeViz" className="z-1000 cursor-pointer w-full h-full" />
        </div>

        <div className="bg-black py-8 md:py-16 px-4 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 md:mb-16">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gray-200">CrowdInfra - India's First Crowdsourced Infrastructure Platform</h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">Contribute to improving infrastructure around you and be a part of your community's development.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16">
              <div className="bg-gray-800/50 backdrop-blur-lg p-6 md:p-8 rounded-2xl border border-gray-700/50 shadow-xl hover:transform hover:scale-105 transition-all duration-300">
                <div className="bg-blue-600/20 p-4 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-4 md:mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-blue-400">Find Properties</h3>
                <p className="text-gray-300 mb-4 md:mb-6">Discover available properties in your area and get detailed information about them.</p>
                <Link href="/property" className="inline-block px-4 py-2 md:px-6 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base">
                  View Properties
                </Link>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-lg p-6 md:p-8 rounded-2xl border border-gray-700/50 shadow-xl hover:transform hover:scale-105 transition-all duration-300">
                <div className="bg-purple-600/20 p-4 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-4 md:mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-purple-400">View Demands</h3>
                <p className="text-gray-300 mb-4 md:mb-6">See infrastructure demands made by the community and support them.</p>
                <Link href="/search-demands" className="inline-block px-4 py-2 md:px-6 md:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm md:text-base">
                  Browse Demands
                </Link>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-lg p-6 md:p-8 rounded-2xl border border-gray-700/50 shadow-xl hover:transform hover:scale-105 transition-all duration-300">
                <div className="bg-green-600/20 p-4 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-4 md:mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-green-400">Make Requests</h3>
                <p className="text-gray-300 mb-4 md:mb-6">Request necessary infrastructure in your area and gather community support.</p>
                <Link href="/raise-request" className="inline-block px-4 py-2 md:px-6 md:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm md:text-base">
                  Raise Request
                </Link>
              </div>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-lg p-6 md:p-8 rounded-2xl border border-gray-700/50 shadow-xl mb-8 md:mb-16">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">How It Works</h2>
                <p className="text-gray-300 mb-6 md:mb-8 max-w-3xl mx-auto">CrowdInfra connects citizens, government agencies, and private developers to collaboratively improve infrastructure.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-600/20 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 md:mb-4">
                      <span className="text-xl md:text-2xl font-bold text-blue-400">1</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2">Identify Needs</h3>
                    <p className="text-gray-400">Identify infrastructure needs in your community and create requests</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="bg-purple-600/20 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 md:mb-4">
                      <span className="text-xl md:text-2xl font-bold text-purple-400">2</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2">Gather Support</h3>
                    <p className="text-gray-400">Community members upvote and comment on important requests</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="bg-green-600/20 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 md:mb-4">
                      <span className="text-xl md:text-2xl font-bold text-green-400">3</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2">Implementation</h3>
                    <p className="text-gray-400">Authorities and developers respond to community-backed requests</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Ready to improve your community?</h2>
              <Link href="/raise-request" className="inline-block px-4 py-2 md:px-5 md:py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 text-base md:text-lg font-semibold">
                Lets Bring a Change
              </Link>
            </div>
          </div>
        </div>

        {showMap && <Maps />}
    </>
  );
}
