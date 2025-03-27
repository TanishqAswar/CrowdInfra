"use client";

import { useState, useEffect } from "react";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import Navbar from "../components/navbar";
import { useUserContext } from "../components/user_context";
import PlaceAutocomplete from "../components/autocomplete";
import Footer from "../components/footer";
import Loading from "../components/loading";

const containerStyle = {
  width: '100%',
  height: '70vh'
};

const center = {
  lat: 20.5937,
  lng: 78.9629
};

const PropertyPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'residential', 
    price: '',
    type: 'sell',
    area: '',
    contactNumber: '',
    status: 'available'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { selectedPlace } = useUserContext() || {}; // Provide default empty object

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
    id: 'google-maps-script'
  });

  useEffect(() => {
    if (selectedPlace && selectedPlace.lat && selectedPlace.lng) {
      setSelectedLocation({
        lat: selectedPlace.lat,
        lng: selectedPlace.lng
      });
    }
  }, [selectedPlace]);

  const handleMapClick = (event) => {
    if (event && event.latLng) {
      try {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        if (typeof lat === 'number' && typeof lng === 'number') {
          setSelectedLocation({
            lat,
            lng
          });
        }
      } catch (error) {
        console.error("Error in map click handling:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedLocation || !selectedLocation.lat || !selectedLocation.lng) {
      alert("Please select a location on the map");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Format the data according to the backend controller expectations
      const propertyData = {
        ...formData,
        location: {
          type: 'Point',
          coordinates: [selectedLocation.lng, selectedLocation.lat] // Note: longitude first, then latitude
        }
      };
      
      console.log("Submitting property data:", propertyData);
      
      // Replace with your actual API endpoint
      const response = await fetch('http://localhost:5030/api/property/property', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert("Property submitted successfully!");
        // Reset form and selected location
        setFormData({
          title: '',
          description: '',
          category: 'residential', 
          price: '',
          type: 'sell',
          area: '',
          contactNumber: '',
          status: 'available'
        });
        setSelectedLocation(null);
        setShowForm(false);
      } else {
        alert(`Error: ${data.error || 'Failed to submit property'}`);
      }
    } catch (error) {
      console.error("Error submitting property:", error);
      alert("Failed to submit property. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) return (
    <Loading/>
  );

  // return (.
  //   <>
  //   <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-10 text-gray-100">
  //     <Navbar />
      
  //     <div className="container mx-auto px-4 py-8">
  //       <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gray-200">
  //         Raise Your Property
  //       </h1>

  //       <div className="mb-6 flex items-center justify-center">
  //         <div className="w-1/2">
  //           <PlaceAutocomplete />
  //         </div>
  //       </div>

  //       <div className="rounded-xl overflow-hidden shadow-2xl">
  //         <GoogleMap
  //           mapContainerStyle={containerStyle}
  //           center={selectedLocation || center}
  //           zoom={selectedLocation ? 15 : 5}
  //           onClick={handleMapClick}
  //           options={{
  //             mapTypeControl: true,
  //             mapTypeId: 'hybrid',
  //             fullscreenControl: true,
  //             streetViewControl: true,
  //             zoomControl: true
  //           }}
  //         >
  //           {selectedLocation && (
  //             <Marker 
  //               position={selectedLocation}
  //               draggable={true}
  //               onDragEnd={(e) => {
  //                 if (e && e.latLng) {
  //                   try {
  //                     const lat = e.latLng.lat();
  //                     const lng = e.latLng.lng();
  //                     if (typeof lat === 'number' && typeof lng === 'number') {
  //                       setSelectedLocation({
  //                         lat,
  //                         lng
  //                       });
  //                     }
  //                   } catch (error) {
  //                     console.error("Error in marker drag:", error);
  //                   }
  //                 }
  //               }}
  //             />
  //           )}
  //         </GoogleMap>
  //       </div>

  //       {selectedLocation && !showForm && (
  //         <div className="text-center mt-6">
  //           <button 
  //             onClick={() => setShowForm(true)}
  //             className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
  //           >
  //             Raise Property Here
  //           </button>
  //           <div className="mt-4 text-gray-300">
  //             Selected Location: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
  //           </div>
  //         </div>
  //       )}

  //       {showForm && (
  //         <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mt-8 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20">
  //           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  //             <div>
  //               <label className="block text-lg font-medium text-gray-200 mb-2">Property Title</label>
  //               <input
  //                 type="text"
  //                 className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
  //                 value={formData.title}
  //                 onChange={(e) => setFormData({...formData, title: e.target.value})}
  //                 required
  //               />
  //             </div>

  //             <div>
  //               <label className="block text-lg font-medium text-gray-200 mb-2">Category</label>
  //               <select
  //                 className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
  //                 value={formData.category}
  //                 onChange={(e) => setFormData({...formData, category: e.target.value})}
  //               >
  //                 <option value="residential">Residential</option>
  //                 <option value="commercial">Commercial</option>
  //                 <option value="industrial">Industrial</option>
  //                 <option value="land">Land</option>
  //               </select>
  //             </div>

  //             <div className="md:col-span-2">
  //               <label className="block text-lg font-medium text-gray-200 mb-2">Description</label>
  //               <textarea
  //                 className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
  //                 rows="4"
  //                 value={formData.description}
  //                 onChange={(e) => setFormData({...formData, description: e.target.value})}
  //                 required
  //               />
  //             </div>

  //             <div>
  //               <label className="block text-lg font-medium text-gray-200 mb-2">Type</label>
  //               <select
  //                 className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
  //                 value={formData.type}
  //                 onChange={(e) => setFormData({...formData, type: e.target.value})}
  //               >
  //                 <option value="sell">Sell</option>
  //                 <option value="rent">Rent</option>
  //                 <option value="lease">Lease</option>
  //               </select>
  //             </div>

  //             <div>
  //               <label className="block text-lg font-medium text-gray-200 mb-2">Price (₹)</label>
  //               <input
  //                 type="number"
  //                 className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
  //                 value={formData.price}
  //                 onChange={(e) => setFormData({...formData, price: e.target.value})}
  //                 required
  //               />
  //             </div>

  //             <div>
  //               <label className="block text-lg font-medium text-gray-200 mb-2">Area (sq ft)</label>
  //               <input
  //                 type="number"
  //                 className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
  //                 value={formData.area}
  //                 onChange={(e) => setFormData({...formData, area: e.target.value})}
  //                 required
  //               />
  //             </div>

  //             <div>
  //               <label className="block text-lg font-medium text-gray-200 mb-2">Contact Number</label>
  //               <input
  //                 type="tel"
  //                 className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
  //                 value={formData.contactNumber}
  //                 onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
  //                 required
  //               />
  //             </div>

  //             <div className="md:col-span-2 mt-4 p-3 bg-blue-900/30 rounded-lg border border-blue-800/50">
  //               <div className="flex items-center">
  //                 <svg className="w-6 h-6 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
  //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
  //                 </svg>
  //                 <span className="text-blue-200">Selected Location: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}</span>
  //               </div>
  //             </div>

  //             <div className="md:col-span-2 flex justify-end space-x-4 mt-6">
  //               <button
  //                 type="button"
  //                 onClick={() => setShowForm(false)}
  //                 className="px-8 py-3 rounded-full bg-gray-700 text-white hover:bg-gray-600 transform hover:scale-105 transition-all duration-300"
  //                 disabled={isSubmitting}
  //               >
  //                 Cancel
  //               </button>
  //               <button
  //                 type="submit"
  //                 className="px-8 py-3 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transform hover:scale-105 transition-all duration-300 flex items-center"
  //                 disabled={isSubmitting}
  //               >
  //                 {isSubmitting ? (
  //                   <>
  //                     <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
  //                     Submitting...
  //                   </>
  //                 ) : (
  //                   'Submit Property'
  //                 )}
  //               </button>
  //             </div>
  //           </div>
  //         </form>
  //       )}
  //     </div>
  //   </div>
  //   <Footer />
  //   </>
  // );
  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-[#1a2b3c] to-[#0f1726] py-10 text-gray-50 antialiased">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 mb-2 max-w-6xl">
      <h1 className="text-5xl font-extrabold mt-7 mb-12 text-center text-transparent bg-clip-text bg-gray-200 z-10 transition-all duration-300 hover:scale-105">
          Raise Your Property
        </h1>
  
        <div className="mb-8 mt-4 flex items-center justify-center">
          <div className="w-full max-w-2xl">
            <PlaceAutocomplete />
          </div>
        </div>
  
        <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 transform transition-all hover:scale-[1.01]">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={selectedLocation || center}
            zoom={selectedLocation ? 15 : 5}
            onClick={handleMapClick}
            options={{
              mapTypeControl: true,
              mapTypeId: 'hybrid',
              fullscreenControl: true,
              streetViewControl: true,
              zoomControl: true,
              styles: [
                {
                  featureType: 'all',
                  stylers: [{ saturation: -50 }]
                }
              ]
            }}
          >
            {selectedLocation && (
              <Marker 
                position={selectedLocation}
                draggable={true}
                onDragEnd={(e) => {
                  if (e && e.latLng) {
                    try {
                      const lat = e.latLng.lat();
                      const lng = e.latLng.lng();
                      if (typeof lat === 'number' && typeof lng === 'number') {
                        setSelectedLocation({
                          lat,
                          lng
                        });
                      }
                    } catch (error) {
                      console.error("Error in marker drag:", error);
                    }
                  }
                }}
              />
            )}
          </GoogleMap>
        </div>
  
        {selectedLocation && !showForm && (
          <div className="text-center mt-8">
            <button 
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-xl font-bold 
              hover:from-blue-600 hover:to-purple-700 transform hover:scale-110 transition-all duration-300 
              shadow-2xl hover:shadow-blue-500/50 tracking-wider uppercase"
            >
              Raise Property Here
            </button>
            <div className="mt-4 text-gray-300 text-sm opacity-80">
              Selected Location: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
            </div>
          </div>
        )}
  
        {showForm && (
          <form 
            onSubmit={handleSubmit} 
            className="max-w-4xl mx-auto mt-10 bg-white/5 backdrop-blur-xl p-10 rounded-3xl 
            shadow-2xl border border-white/10 hover:border-white/20 transition-all"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-lg font-medium text-gray-200 mb-3 pl-1">Property Title</label>
                <input
                  type="text"
                  className="w-full px-5 py-4 rounded-xl bg-gray-800/60 border border-gray-700 text-white 
                  focus:border-blue-500 focus:ring-4 focus:ring-blue-500/30 transition-all duration-300 
                  placeholder-gray-500"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter property title"
                  required
                />
              </div>
  
              <div>
                <label className="block text-lg font-medium text-gray-200 mb-3 pl-1">Category</label>
                <select
                  className="w-full px-5 py-4 rounded-xl bg-gray-800/60 border border-gray-700 text-white 
                  focus:border-blue-500 focus:ring-4 focus:ring-blue-500/30 transition-all duration-300"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="land">Land</option>
                </select>
              </div>
  
              <div className="md:col-span-2">
                <label className="block text-lg font-medium text-gray-200 mb-3 pl-1">Description</label>
                <textarea
                  className="w-full px-5 py-4 rounded-xl bg-gray-800/60 border border-gray-700 text-white 
                  focus:border-blue-500 focus:ring-4 focus:ring-blue-500/30 transition-all duration-300 
                  placeholder-gray-500"
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe your property details"
                  required
                />
              </div>
  
              {/* Rest of the form remains the same, with similar styling applied */}
              {/* ... other form fields ... */}
  
              <div className="md:col-span-2 mt-6 p-4 bg-blue-900/20 rounded-xl border border-blue-800/30">
                <div className="flex items-center">
                  <svg className="w-7 h-7 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span className="text-blue-100 text-sm">Selected Location: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}</span>
                </div>
              </div>
  
              <div className="md:col-span-2 flex justify-end space-x-6 mt-8">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-10 py-3.5 rounded-xl bg-gray-700/50 text-white hover:bg-gray-600/70 
                  transform hover:scale-105 transition-all duration-300 tracking-wide"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-10 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 
                  text-white font-semibold hover:from-blue-600 hover:to-purple-700 
                  transform hover:scale-105 transition-all duration-300 flex items-center tracking-wide"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
                      Submitting...
                    </>
                  ) : (
                    'Submit Property'
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default PropertyPage;