'use client'

import { useState, useEffect } from 'react'
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '450px',
}

const defaultCenter = { lat: 20.5937, lng: 78.9629 } // Default: India center

export default function NearbyDemandsMap() {
  const [location, setLocation] = useState(null)
  const [error, setError] = useState(null)
  const [demands, setDemands] = useState([])
  const [selectedDemand, setSelectedDemand] = useState(null) // For showing demand details on hover

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  })

  // Get user location
  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        setLocation(userLocation)
        fetchNearbyDemands(userLocation)
        setError(null)
      },
      (err) => {
        setError(`Location access denied: ${err.message}`)
      }
    )
  }, [])

  // Fetch nearby demands from backend
  const fetchNearbyDemands = async (userLocation) => {
    try {
      const response = await fetch(
        `http://localhost:5030/api/demand/nearby?latitude=${userLocation.lat}&longitude=${userLocation.lng}&radius=5000`
      )
      if (!response.ok) throw new Error('Failed to fetch demands')
      const data = await response.json()
      setDemands(data)
    } catch (error) {
      console.error('Error fetching demands:', error)
      setError('Failed to load nearby demands.')
    }
  }

  if (loadError)
    return (
      <p className='text-red-500'>
        Error loading Google Maps: {loadError.message}
      </p>
    )

  return (
    <div className='p-4'>
      <h2 className='text-xl font-bold mb-4'>Nearby Demands</h2>
      {error && <p className='text-red-500'>{error}</p>}

      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location || defaultCenter}
          zoom={location ? 15 : 5}
        >
          {location && (
            <Marker
              position={location}
              icon={'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}
            />
          )}

          {demands.map((demand) => (
            <Marker
              key={demand._id}
              position={{
                lat: demand.location.coordinates[1],
                lng: demand.location.coordinates[0],
              }}
              onMouseOver={() => setSelectedDemand(demand)}
              onMouseOut={() => setSelectedDemand(null)}
            />
          ))}

          {selectedDemand && (
            <InfoWindow
              position={{
                lat: selectedDemand.location.coordinates[1],
                lng: selectedDemand.location.coordinates[0],
              }}
              onCloseClick={() => setSelectedDemand(null)}
            >
              <div className='bg-white p-3 rounded shadow-lg'>
                <h3 className='text-lg font-bold'>{selectedDemand.title}</h3>
                <p className='text-sm text-gray-700'>
                  {selectedDemand.description}
                </p>
                <p className='text-xs text-gray-500 mt-2'>
                  <strong>Category:</strong> {selectedDemand.category}
                </p>
                <p className='text-xs text-gray-500'>
                  <strong>Upvotes:</strong> {selectedDemand.up_votes} |{' '}
                  <strong>Downvotes:</strong> {selectedDemand.down_votes}
                </p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  )
}
