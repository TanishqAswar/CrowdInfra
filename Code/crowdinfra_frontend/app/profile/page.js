"use client";

import { useState, useEffect } from "react";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import Navbar from "../components/navbar";

const containerStyle = {
  width: '100%',
  height: '200px'
};

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "+91 9876543210",
    address: "123, Subhash Nagar, New Delhi - 110001",
    gender: "Male",
    age: 32,
    bio: "I am an enthusiastic real estate investor looking for new properties. I enjoy exploring new areas and finding opportunities.",
    profilePicture: "https://randomuser.me/api/portraits/men/44.jpg",
    location: {
      lat: 28.6139,
      lng: 77.2090
    }
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
    id: 'google-maps-script'
  });

  // // Fetch user data (from backend API)
  // useEffect(() => {
  //   // Code to fetch data from backend will go here
  //   // const fetchUserData = async () => {
  //   //   try {
  //   //     const response = await fetch('/api/user/profile');
  //   //     const data = await response.json();
  //   //     setUser(data);
  //   //   } catch (error) {
  //   //     console.error('Error fetching user data:', error);
  //   //   }
  //   // };
  //   // fetchUserData();
  // }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-5 text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-700/50">
            
            {/* Header Section */}
            <div className="relative h-48 bg-gradient-to-r from-gray-600 to-gray-300">
              <div className="absolute -bottom-16 left-8">
                <div className="h-32 w-32 rounded-full border-4 border-gray-800 overflow-hidden">
                  <img 
                    src={user.profilePicture} 
                    alt={user.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="pt-20 px-8 pb-8">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                  <p className="text-blue-400 mt-1">{user.email}</p>
                </div>
                <button className="mt-4 md:mt-0 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Edit Profile
                </button>
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-gray-200 border-b border-gray-700 pb-2">
                    Personal Information
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="text-blue-400 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Gender</p>
                        <p className="text-white">{user.gender}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="text-blue-400 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 3a1 1 0 011-1h.01a1 1 0 010 2H7a1 1 0 01-1-1zm2 3a1 1 0 00-2 0v1a2 2 0 00-2 2v1a2 2 0 00-2 2v.683a3.7 3.7 0 011.055.485 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0A3.7 3.7 0 0118 12.683V12a2 2 0 00-2-2V9a2 2 0 00-2-2V6a1 1 0 10-2 0v1h-1V6a1 1 0 10-2 0v1H8V6zm10 8.868a3.704 3.704 0 01-4.055-.036 1.704 1.704 0 00-1.89 0 3.704 3.704 0 01-4.11 0 1.704 1.704 0 00-1.89 0A3.704 3.704 0 012 14.868V17a1 1 0 001 1h14a1 1 0 001-1v-2.132zM9 3a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm3 0a1 1 0 011-1h.01a1 1 0 110 2H13a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Age</p>
                        <p className="text-white">{user.age} years</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="text-blue-400 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Phone Number</p>
                        <p className="text-white">{user.phone}</p>
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-4 mt-8 text-gray-200 border-b border-gray-700 pb-2">
                    Bio
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    {user.bio}
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-gray-200 border-b border-gray-700 pb-2">
                    Location
                  </h2>
                  
                  <div className="flex items-start mb-4">
                    <div className="text-blue-400 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Address</p>
                      <p className="text-white">{user.address}</p>
                    </div>
                  </div>
                  
                  <div className="rounded-xl overflow-hidden shadow-lg border border-gray-700">
                    {isLoaded ? (
                      <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={user.location}
                        zoom={14}
                        options={{
                          mapTypeControl: false,
                          streetViewControl: false,
                          fullscreenControl: false,
                          zoomControl: true,
                          styles: [
                            {
                              featureType: "all",
                              elementType: "all",
                              stylers: [{ saturation: -100 }]
                            }
                          ]
                        }}
                      >
                        <Marker position={user.location} />
                      </GoogleMap>
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-800">
                        <p className="text-gray-400">Loading map...</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-200 border-b border-gray-700 pb-2">
                      Activity
                    </h2>
                    <div className="space-y-4">
                      <div className="bg-gray-700/30 p-4 rounded-lg">
                        <p className="text-gray-300">You recently viewed 3 properties</p>
                        <p className="text-gray-400 text-sm mt-1">2 days ago</p>
                      </div>
                      <div className="bg-gray-700/30 p-4 rounded-lg">
                        <p className="text-gray-300">You created a new property request</p>
                        <p className="text-gray-400 text-sm mt-1">1 week ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

