"use client";

import { useState, useEffect } from "react";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import Navbar from "../components/navbar";
import { useUserContext } from "../components/user_context";
import PlaceAutocomplete from "../components/autocomplete";

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
    contact: ''
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedLocation && selectedLocation.lat && selectedLocation.lng) {
      console.log({
        ...formData,
        location: selectedLocation
      });
    }
  };

  if (!isLoaded) return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      <span className="ml-4 text-xl text-gray-200">Loading...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-10 text-gray-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gray-200">
          Raise Your Property
        </h1>

        <div className="mb-6 flex items-center justify-center">
          <div className="w-1/2">
            <PlaceAutocomplete />
          </div>
        </div>

        <div className="rounded-xl overflow-hidden shadow-2xl">
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
              zoomControl: true
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
          <div className="text-center mt-6">
            <button 
              onClick={() => setShowForm(true)}
              className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Raise Property Here
            </button>
          </div>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mt-8 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-lg font-medium text-gray-200 mb-2">Property Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-200 mb-2">Category</label>
                <select
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
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
                <label className="block text-lg font-medium text-gray-200 mb-2">Description</label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-200 mb-2">Type</label>
                <select
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="sell">Sell</option>
                  <option value="rent">Rent</option>
                  <option value="lease">Lease</option>
                </select>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-200 mb-2">Price (₹)</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-200 mb-2">Area (sq ft)</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  value={formData.area}
                  onChange={(e) => setFormData({...formData, area: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-200 mb-2">Contact Number</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  required
                />
              </div>

              <div className="md:col-span-2 flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-8 py-3 rounded-full bg-gray-700 text-white hover:bg-gray-600 transform hover:scale-105 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transform hover:scale-105 transition-all duration-300"
                >
                  Submit Property
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PropertyPage;
