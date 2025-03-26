"use client";

import { useState, useEffect } from "react";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import Navbar from "../components/navbar";
import { useUserContext } from "../components/user_context";
import PlaceAutocomplete from "../components/autocomplete";
import { ThumbsUp, MessageCircle } from "lucide-react";
import Footer from "../components/footer";

const containerStyle = {
  width: "100%",
  height: "70vh",
};

const center = {
  lat: 20.5937,
  lng: 78.9629,
};

const RaiseRequestPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "infrastructure",
    // priority: 'medium',
    // contact: ''
  });
  const [requests, setRequests] = useState([]);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const [activeRequest, setActiveRequest] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const { selectedPlace } = useUserContext() || {};

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
    id: "google-maps-script",
  });

  useEffect(() => {
    if (selectedPlace && selectedPlace.lat && selectedPlace.lng) {
      setSelectedLocation({
        lat: selectedPlace.lat,
        lng: selectedPlace.lng,
      });
    }
  }, [selectedPlace]);

  // 0 existing requests when component mounts
  // useEffect(() => {
  //   const fetchRequests = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       if (!token) {
  //         console.warn("No token found, skipping request fetch");
  //         return;
  //       }

  //       const response = await fetch("https://your-api.com/requests", {
  //         method: "GET",
  //         headers: {
  //           Authorization: Bearer ${token},
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch requests");
  //       }

  //       const data = await response.json();
  //       setRequests(data.requests || []);
  //     } catch (error) {
  //       console.error("Error fetching requests:", error);
  //     }
  //   };

  //   fetchRequests();
  // }, []);

  const handleMapClick = (event) => {
    if (event && event.latLng) {
      try {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        if (typeof lat === "number" && typeof lng === "number") {
          setSelectedLocation({
            lat,
            lng,
          });
          setShowForm(false);
        }
        // console.log(${lat}, ${lng});
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
      const demandData = {
        ...formData,
        location: {
          type: 'Point',
          coordinates: [selectedLocation.lng, selectedLocation.lat] // Note: longitude first, then latitude
        }
      };
      
      console.log("Submitting demand data:", demandData);
      
      // Replace with your actual API endpoint
      const response = await fetch('http://localhost:5030/api/demand/demand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(demandData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert("Property submitted successfully!");
        // Reset form and selected location
        setFormData({
          title: "",
          description: "",
          category: "infrastructure",
        });
        setSelectedLocation(null);
        setShowForm(false);
      } else {
        alert(`Error: ${data.error || 'Failed to submit demand'}`);
      }
    } catch (error) {
      console.error("Error submitting demand:", error);
      alert("Failed to submit demand. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded)
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <span className="ml-4 text-xl text-gray-200">Loading...</span>
      </div>
    );

  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-10 text-gray-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gray-200">
          Raise Facility Request
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
              mapTypeId: "hybrid",
              fullscreenControl: true,
              streetViewControl: true,
              zoomControl: true,
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
                      if (typeof lat === "number" && typeof lng === "number") {
                        setSelectedLocation({
                          lat,
                          lng,
                        });
                      }
                    } catch (error) {
                      console.error("Error in marker drag:", error);
                    }
                  }
                }}
              />
            )}

            {requests.map((request) => (
              <Marker
                key={request.id}
                position={request.location}
                icon={{
                  url: "/request-pin.png",
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
                onClick={() => setActiveRequest(request.id)}
              />
            ))}
          </GoogleMap>
        </div>

        {selectedLocation && !showForm && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Raise Request Here
            </button>
          </div>
        )}

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto mt-8 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-lg font-medium text-gray-200 mb-2">
                  Request Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-200 mb-2">
                  Category
                </label>
                <select
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="infrastructure">Infrastructure</option>
                  <option value="public_service">Public Service</option>
                  <option value="transportation">Transportation</option>
                  <option value="utilities">Utilities</option>
                  <option value="education">Education</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-lg font-medium text-gray-200 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  rows="4"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>

              {/* <div>
                <label className="block text-lg font-medium text-gray-200 mb-2">Priority</label>
                <select
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-200 mb-2">Contact Details</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                />
              </div> */}
            </div>

            {submitError && (
              <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
                <p>{submitError}</p>
              </div>
            )}

            <div className="flex justify-center mt-8 space-x-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  "Submit Request"
                )}
              </button>
            </div>
          </form>
        )}

        {/* Request List */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-200">
            Community Requests
          </h2>

          {requests.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-xl"
                >
                  <h3 className="text-xl font-bold text-blue-400 mb-2">
                    {request.title}
                  </h3>
                  <div className="flex justify-between mb-3">
                    <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                      {request.category.replace("_", " ")}
                    </span>
                    {request.priority && (
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          request.priority === "urgent"
                            ? "bg-red-500/20 text-red-300"
                            : request.priority === "high"
                            ? "bg-orange-500/20 text-orange-300"
                            : request.priority === "medium"
                            ? "bg-yellow-500/20 text-yellow-300"
                            : "bg-green-500/20 text-green-300"
                        }`}
                      >
                        {request.priority}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 mb-4">{request.description}</p>

                  <div className="flex justify-between items-center mb-4">
                    <button
                      onClick={() => handleUpvote(request.id)}
                      className="flex items-center space-x-1 text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      <ThumbsUp size={18} />
                      <span>{request.upvotes || 0}</span>
                    </button>
                    <button
                      onClick={() =>
                        setActiveRequest(
                          activeRequest === request.id ? null : request.id
                        )
                      }
                      className="flex items-center space-x-1 text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      <MessageCircle size={18} />
                      <span>{(comments[request.id] || []).length}</span>
                    </button>
                  </div>

                  {activeRequest === request.id && (
                    <div className="mt-4 border-t border-gray-700 pt-4">
                      <h4 className="text-lg font-semibold mb-3">Comments</h4>

                      <div className="max-h-40 overflow-y-auto mb-3 space-y-3">
                        {(comments[request.id] || []).map((comment) => (
                          <div
                            key={comment.id}
                            className="bg-gray-800/50 p-3 rounded-lg"
                          >
                            <div className="flex justify-between text-sm text-gray-400 mb-1">
                              <span>{comment.user}</span>
                              <span>
                                {new Date(comment.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-gray-200">{comment.text}</p>
                          </div>
                        ))}

                        {(comments[request.id] || []).length === 0 && (
                          <p className="text-gray-500 text-center py-2">
                            No comments yet
                          </p>
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
                          onClick={() => handleAddComment(request.id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
     <Footer />
     </>
  );
};

export default RaiseRequestPage;