'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from '@react-google-maps/api'
import Navbar from '../components/navbar'
import { useUserContext } from '../components/user_context'
import PlaceAutocomplete from '../components/autocomplete'
import { X, MapPin } from 'lucide-react'
import Footer from '../components/footer'
import Link from 'next/link'

const containerStyle = {
  width: '100%',
  height: '70vh',
}

const center = {
  lat: 20.5937,
  lng: 78.9629,
}

const RaiseRequestPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [showLocationPopup, setShowLocationPopup] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'infrastructure',
  })
  const [submittedRequests, setSubmittedRequests] = useState([])
  const [activeRequest, setActiveRequest] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { selectedPlace } = useUserContext() || {}

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
    id: 'google-maps-script',
  })

  useEffect(() => {
    if (selectedPlace && selectedPlace.lat && selectedPlace.lng) {
      setSelectedLocation({
        lat: selectedPlace.lat,
        lng: selectedPlace.lng,
      })
    }
  }, [selectedPlace])

  const handleMapClick = useCallback((event) => {
    if (event && event.latLng) {
      try {
        const lat = event.latLng.lat()
        const lng = event.latLng.lng()
        if (typeof lat === 'number' && typeof lng === 'number') {
          setSelectedLocation({ lat, lng })
          setShowLocationPopup(true)
          setShowForm(false)
        }
      } catch (error) {
        console.error('Error in map click handling:', error)
      }
    }
  }, [])

  const handleCloseLocationPopup = () => {
    setShowLocationPopup(false)
    setSelectedLocation(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedLocation || !selectedLocation.lat || !selectedLocation.lng) {
      alert('Please select a location on the map')
      return
    }

    setIsSubmitting(true)

    try {
      const demandData = {
        ...formData,
        location: {
          type: 'Point',
          coordinates: [selectedLocation.lng, selectedLocation.lat],
        },
      }

      const response = await fetch('http://localhost:5030/api/demand/demand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(demandData),
      })

      const data = await response.json()

      if (response.ok) {
        const newRequest = {
          ...demandData,
          id: Date.now(), // Temporary ID
          coordinates: demandData.location.coordinates,
        }

        setSubmittedRequests((prev) => [...prev, newRequest])

        // Reset form and show location marker
        setFormData({
          title: '',
          description: '',
          category: 'infrastructure',
        })
        setShowForm(false)
        setShowLocationPopup(false)
        setActiveRequest(newRequest.id)
      } else {
        alert(`Error: ${data.error || 'Failed to submit demand'}`)
      }
    } catch (error) {
      console.error('Error submitting demand:', error)
      alert('Failed to submit demand. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isLoaded)
    return (
      <div className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500'></div>
        <span className='ml-4 text-xl text-gray-200'>Loading...</span>
      </div>
    )

  return (
    <>
      <div className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-10 text-gray-100'>
        <Navbar />

        <div className='container mx-auto px-4 py-8'>
          <h1 className='text-4xl font-bold mb-8 text-center mt-8'>
            Raise Facility Request
          </h1>

          <div className='mb-6 flex items-center justify-center'>
            <div className='w-1/2'>
              <PlaceAutocomplete />
            </div>
          </div>

          <div className='rounded-xl overflow-hidden shadow-2xl relative'>
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
              }}
            >
              {selectedLocation && showLocationPopup && (
                <InfoWindow
                  position={selectedLocation}
                  onCloseClick={handleCloseLocationPopup}
                >
                  <div className='p-4 bg-white rounded-lg shadow-xl'>
                    <div className='flex justify-between items-center mb-4'>
                      <h3 className='text-xl font-bold text-gray-800'>
                        Raise a Request
                      </h3>
                      <button
                        onClick={handleCloseLocationPopup}
                        className='text-gray-500 hover:text-gray-700'
                      >
                        <X size={24} />
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        setShowForm(true)
                        setShowLocationPopup(false)
                      }}
                      className='w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center'
                    >
                      <MapPin className='mr-2' /> Raise Request Here
                    </button>
                  </div>
                </InfoWindow>
              )}

              {selectedLocation && !showForm && (
                <Marker
                  position={selectedLocation}
                  draggable={true}
                  onDragEnd={(e) => {
                    if (e && e.latLng) {
                      try {
                        const lat = e.latLng.lat()
                        const lng = e.latLng.lng()
                        if (
                          typeof lat === 'number' &&
                          typeof lng === 'number'
                        ) {
                          setSelectedLocation({ lat, lng })
                          setShowLocationPopup(true)
                        }
                      } catch (error) {
                        console.error('Error in marker drag:', error)
                      }
                    }
                  }}
                />
              )}

              {/* Submitted Requests Markers */}
              {submittedRequests.map((request) => (
                <Marker
                  key={request.id}
                  position={{
                    lat: request.coordinates[1],
                    lng: request.coordinates[0],
                  }}
                  onClick={() =>
                    setActiveRequest(
                      activeRequest === request.id ? null : request.id
                    )
                  }
                >
                  {activeRequest === request.id && (
                    <InfoWindow
                      position={{
                        lat: request.coordinates[1],
                        lng: request.coordinates[0],
                      }}
                      onCloseClick={() => {
                        setActiveRequest(null)
                      }}
                    >
                      <div className='p-4 max-w-xs'>
                        <h3 className='text-xl font-bold text-blue-600 mb-2'>
                          <Link
                            href={`/viewrequest?id=${request.id}`}
                            className='block hover:underline'
                          >
                            {request.title}
                          </Link>
                        </h3>
                        <p className='text-gray-700 mb-2'>
                          {request.description}
                        </p>
                        <span className='bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm'>
                          {request.category}
                        </span>
                      </div>
                    </InfoWindow>
                  )}
                </Marker>
              ))}
            </GoogleMap>
          </div>

          {/* Form Overlay */}
          {showForm && (
            <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4'>
              <div className='relative w-full max-w-2xl'>
                <button
                  onClick={() => {
                    setShowForm(false)
                    setShowLocationPopup(true)
                  }}
                  className='absolute -top-10 right-0 text-white hover:text-gray-300'
                >
                  <X size={30} />
                </button>
                <form
                  onSubmit={handleSubmit}
                  className='bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20'
                >
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <label className='block text-lg font-medium text-gray-200 mb-2'>
                        Request Title
                      </label>
                      <input
                        type='text'
                        className='w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300'
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div>
                      <label className='block text-lg font-medium text-gray-200 mb-2'>
                        Category
                      </label>
                      <select
                        className='w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300'
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                      >
                        <option value='infrastructure'>Infrastructure</option>
                        <option value='public_service'>Public Service</option>
                        <option value='transportation'>Transportation</option>
                        <option value='utilities'>Utilities</option>
                        <option value='education'>Education</option>
                        <option value='healthcare'>Healthcare</option>
                        <option value='other'>Other</option>
                      </select>
                    </div>

                    <div className='md:col-span-2'>
                      <label className='block text-lg font-medium text-gray-200 mb-2'>
                        Description
                      </label>
                      <textarea
                        className='w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300'
                        rows='4'
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className='flex justify-center mt-8'>
                    <button
                      type='submit'
                      className='px-10 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center'
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className='animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2'></div>
                          Submitting...
                        </>
                      ) : (
                        'Submit Request'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default RaiseRequestPage
