'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from '@react-google-maps/api'
import axios from 'axios'

const containerStyle = {
  width: '100%',
  height: '450px',
}

const defaultCenter = { lat: 20.5937, lng: 78.9629 } // Default: India center

export default function NearbyDemandsMap() {
  const [location, setLocation] = useState(null)
  const [error, setError] = useState(null)
  const [demands, setDemands] = useState([])
  const [selectedDemand, setSelectedDemand] = useState(null)
  const [hoveringInfoWindow, setHoveringInfoWindow] = useState(false)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['marker'],
  })

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
      },
      (err) => {
        setError(`Location access denied: ${err.message}`)
      }
    )
  }, [])

  const fetchNearbyDemands = async (userLocation) => {
    try {
      console.log('Fetching nearby demands...', userLocation)
      const response = await axios.get(
        `http://localhost:5030/api/demand/nearby?latitude=${userLocation.lat}&longitude=${userLocation.lng}&radius=5000`
      )
      setDemands(response.data)
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
              onMouseOut={() => {
                if (!hoveringInfoWindow) {
                  setSelectedDemand(null)
                }
              }}
              icon={'http://maps.google.com/mapfiles/ms/icons/red-dot.png'}
            />
          ))}

          {selectedDemand && (
            <InfoWindow
              position={{
                lat: selectedDemand.location.coordinates[1],
                lng: selectedDemand.location.coordinates[0],
              }}
              onCloseClick={() => {
                setSelectedDemand(null)
                setHoveringInfoWindow(false)
              }}
            >
              <div
                className='bg-white p-3 rounded shadow-lg'
                onMouseEnter={() => setHoveringInfoWindow(true)}
                onMouseLeave={() => {
                  setHoveringInfoWindow(false)
                  setSelectedDemand(null)
                }}
              >
                <Link
                  href={`/viewrequest?id=${selectedDemand._id}`}
                  className='text-blue-600 hover:underline text-xs mt-2 block'
                >
                  <h3 className='text-lg font-bold'>{selectedDemand.title}</h3>
                </Link>
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
                <p className='text-xs text-gray-500 mt-2'>
                  Click on the title to view details
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
