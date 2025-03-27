'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from '@react-google-maps/api'
import Link from 'next/link'
import Navbar from '../components/navbar'
import { useUserContext } from '../components/user_context'
import PlaceAutocomplete from '../components/autocomplete'
import { X, MapPin } from 'lucide-react'
import Footer from '../components/footer'

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
          id: data._id || Date.now(), // Use backend ID if available
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
          <h1 className='text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600'>
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
              {/* ... previous code remains the same ... */}

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
                        <Link
                          href={`/viewrequest?id=${request.id}`}
                          className='block hover:underline'
                        >
                          <h3 className='text-xl font-bold text-blue-600 mb-2'>
                            {request.title}
                          </h3>
                        </Link>
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

          {/* ... rest of the code remains the same ... */}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default RaiseRequestPage
