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

const SearchDemandsPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [demands, setDemands] = useState([]);
  const [filteredDemands, setFilteredDemands] = useState([]);
  const [selectedDemand, setSelectedDemand] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [businessCategory, setBusinessCategory] = useState('all');

  const { selectedPlace } = useUserContext() || {};

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
    id: 'google-maps-script'
  });

  // Mock data - replace with real API
  useEffect(() => {
    // This would be a real API call
    const mockDemands = [
      {
        id: 1,
        title: "Need New Restaurant",
        description: "This area needs a good vegetarian restaurant",
        category: "restaurant",
        location: { lat: 20.5937, lng: 78.9629 },
        upvotes: 15,
        user: "Rahul Sharma",
        timestamp: new Date().toISOString()
      },
      {
        id: 2,
        title: "24/7 Medical Store",
        description: "Our area needs a 24-hour medical store",
        category: "medical",
        location: { lat: 20.6037, lng: 78.9729 },
        upvotes: 32,
        user: "Priya Patel",
        timestamp: new Date().toISOString()
      },
      {
        id: 3,
        title: "Supermarket Needed",
        description: "This area needs a good supermarket",
        category: "retail",
        location: { lat: 20.5837, lng: 78.9529 },
        upvotes: 8,
        user: "Amit Singh",
        timestamp: new Date().toISOString()
      }
    ];

    const mockComments = {
      1: [
        { id: 101, text: "I completely agree with this!", user: "Sunil Verma", timestamp: new Date().toISOString() },
        { id: 102, text: "This is very necessary", user: "Meena Gupta", timestamp: new Date().toISOString() }
      ],
      2: [
        { id: 201, text: "This is much needed", user: "Rajesh Khanna", timestamp: new Date().toISOString() }
      ]
    };

    setDemands(mockDemands);
    setFilteredDemands(mockDemands);
    setComments(mockComments);
  }, []);

  useEffect(() => {
    if (selectedPlace && selectedPlace.lat && selectedPlace.lng) {
      setSelectedLocation({
        lat: selectedPlace.lat,
        lng: selectedPlace.lng
      });
      
      // Filter demands based on location
      filterDemandsByLocation(selectedPlace);
    }
  }, [selectedPlace, demands]);

  useEffect(() => {
    filterDemands();
  }, [businessCategory, demands, selectedLocation]);

  const filterDemandsByLocation = (location) => {
    // In a real implementation, you would use geocoding or haversine formula to find nearest locations
    // Here we're using simple distance
    const maxDistance = 0.1; // roughly ~11km
    
    const filtered = demands.filter(demand => {
      const distance = Math.sqrt(
        Math.pow(demand.location.lat - location.lat, 2) + 
        Math.pow(demand.location.lng - location.lng, 2)
      );
      return distance <= maxDistance;
    });
    
    setFilteredDemands(filtered);
  };

  const filterDemands = () => {
    let filtered = [...demands];
    
    // Filter by location if selected
    if (selectedLocation) {
      const maxDistance = 0.1;
      filtered = filtered.filter(demand => {
        const distance = Math.sqrt(
          Math.pow(demand.location.lat - selectedLocation.lat, 2) + 
          Math.pow(demand.location.lng - selectedLocation.lng, 2)
        );
        return distance <= maxDistance;
      });
    }
    
    // Filter by category
    if (businessCategory !== 'all') {
      filtered = filtered.filter(demand => demand.category === businessCategory);
    }
    
    setFilteredDemands(filtered);
  };

  const handleMarkerClick = (demand) => {
    setSelectedDemand(demand);
  };

  const handleUpvote = (demandId) => {
    setDemands(demands.map(demand => 
      demand.id === demandId 
        ? {...demand, upvotes: demand.upvotes + 1} 
        : demand
    ));
  };

  const handleAddComment = (demandId) => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now(),
      text: newComment,
      user: "Business User", // Replace with actual user name
      timestamp: new Date().toISOString()
    };
    
    setComments(prev => ({
      ...prev,
      [demandId]: [...(prev[demandId] || []), comment]
    }));
    
    setNewComment('');
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
          Search Demands
        </h1>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <PlaceAutocomplete />
          </div>
          <div>
            <select
              className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              value={businessCategory}
              onChange={(e) => setBusinessCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="restaurant">Restaurant</option>
              <option value="retail">Retail</option>
              <option value="medical">Medical</option>
              <option value="education">Education</option>
              <option value="entertainment">Entertainment</option>
              <option value="services">Services</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={selectedLocation || center}
                zoom={selectedLocation ? 15 : 5}
                options={{
                  mapTypeControl: true,
                  mapTypeId: 'roadmap',
                  fullscreenControl: true,
                  streetViewControl: true,
                  zoomControl: true
                }}
              >
                {filteredDemands.map(demand => (
                  <Marker 
                    key={demand.id}
                    position={demand.location}
                    onClick={() => handleMarkerClick(demand)}
                    icon={{
                      path: "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z",
                      fillColor: selectedDemand && selectedDemand.id === demand.id ? '#FF4500' : '#2196F3',
                      fillOpacity: 1,
                      strokeWeight: 1,
                      strokeColor: '#ffffff',
                      scale: 2
                    }}
                  />
                ))}
              </GoogleMap>
            </div>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-gray-700/50 h-[70vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">
              {selectedDemand ? selectedDemand.title : "Demand Details"}
            </h2>
            
            {selectedDemand ? (
              <div>
                <div className="mb-4 p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-gray-300 mb-3">{selectedDemand.description}</p>
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Category: {selectedDemand.category}</span>
                    <span>{new Date(selectedDemand.timestamp).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">By: {selectedDemand.user}</span>
                    <button 
                      onClick={() => handleUpvote(selectedDemand.id)}
                      className="flex items-center space-x-1 text-blue-400 hover:text-blue-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{selectedDemand.upvotes}</span>
                    </button>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-200">Comments</h3>
                  
                  <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                    {(comments[selectedDemand.id] || []).map(comment => (
                      <div key={comment.id} className="bg-gray-800/50 p-3 rounded-lg">
                        <div className="flex justify-between text-sm text-gray-400 mb-1">
                          <span>{comment.user}</span>
                          <span>{new Date(comment.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="text-gray-200">{comment.text}</p>
                      </div>
                    ))}
                    
                    {(comments[selectedDemand.id] || []).length === 0 && (
                      <p className="text-gray-500 text-center py-2">No comments yet</p>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="Write your comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                      onClick={() => handleAddComment(selectedDemand.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-lg">Click on a marker on the map to view demand</p>
              </div>
            )}
          </div>
        </div>

        {filteredDemands.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-200">All Demands ({filteredDemands.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDemands.map(demand => (
                <div 
                  key={demand.id} 
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedDemand && selectedDemand.id === demand.id 
                      ? 'bg-blue-900/30 border border-blue-500/50' 
                      : 'bg-gray-800/30 border border-gray-700/50 hover:bg-gray-700/30'
                  }`}
                  onClick={() => handleMarkerClick(demand)}
                >
                  <h3 className="text-lg font-semibold mb-2">{demand.title}</h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{demand.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{demand.category}</span>
                    <div className="flex items-center space-x-1 text-blue-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{demand.upvotes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDemandsPage;

