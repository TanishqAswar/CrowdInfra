"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  APIProvider,
  ControlPosition,
  MapControl,
  AdvancedMarker,
  Map,
  useMap,
  useMapsLibrary,
  useAdvancedMarkerRef,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useUserContext } from "./user_context";

const MapHandler = ({ place, marker, setSelectedPlaceDetails }) => {
  const map = useMap();
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  useEffect(() => {
    if (!map || !place || !marker) return;

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport);
    }

    marker.position = place.geometry?.location;
    
    // Set place details
    setSelectedPlaceDetails(place);
    setShowInfoWindow(true);
  }, [map, place, marker, setSelectedPlaceDetails]);

  return showInfoWindow && place ? (
    <InfoWindow
      position={place.geometry?.location}
      onCloseClick={() => setShowInfoWindow(false)}
    >
      <div className="p-3 max-w-xs">
        <h3 className="font-bold text-lg mb-1">{place.name}</h3>
        <p className="text-gray-700 mb-2">{place.formatted_address}</p>
        {place.rating && (
          <p className="text-yellow-600 mb-1">Rating: {place.rating} ⭐</p>
        )}
        {place.types && (
          <p className="text-blue-600 mb-1">Type: {place.types.join(', ')}</p>
        )}
        {place.phone_number && (
          <p className="text-green-600 mb-1">Phone: {place.phone_number}</p>
        )}
        {place.website && (
          <a href={place.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline block mt-2">
            Visit Website
          </a>
        )}
      </div>
    </InfoWindow>
  ) : null;
};

const LogScaleValue = () => {
  const { setScaleVal } = useUserContext();
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const logScale = () => {
      const projection = map.getProjection();
      if (!projection) return;

      const center = map.getCenter();
      if (!center) return;

      // Get scale value in meters per pixel
      const zoom = map.getZoom();
      const scale =
        (156543.03392 * Math.cos((center.lat() * Math.PI) / 180)) /
        Math.pow(2, zoom);
      setScaleVal(scale);

      console.log("Scale Control Enabled:", map.get("scaleControl"));
      console.log("Zoom Level:", zoom);
      console.log("Scale (meters per pixel):", scale);
    };

    logScale(); // Initial log
    const intervalId = setInterval(logScale, 5000);

    return () => clearInterval(intervalId);
  }, [map]);

  return null;
};

const PlaceAutocomplete = ({ onPlaceSelect }) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const inputRef = useRef(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address", "rating", "types", "website", "photos", "opening_hours", "phone_number"],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 m-4 w-96">
      <input
        ref={inputRef}
        className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
        placeholder="Search for a place..."
      />
    </div>
  );
};

const ClickLogger = ({ onMapClick }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const handleClick = (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      console.log(`Clicked at: Latitude: ${lat}, Longitude: ${lng}`);
      onMapClick({ lat, lng });
    };

    map.addListener("click", handleClick);

    return () => {
      google.maps.event.clearListeners(map, "click");
    };
  }, [map]);

  return null;
};

const PolylineRenderer = ({ path }) => {
  const map = useMap();
  
  useEffect(() => {
    if (!map || path.length < 2) return;
    
    const polyline = new google.maps.Polyline({
      path: path,
      geodesic: true,
      strokeColor: "#3B82F6",
      strokeOpacity: 0.8,
      strokeWeight: 3
    });
    
    polyline.setMap(map);
    
    return () => {
      polyline.setMap(null);
    };
  }, [map, path]);
  
  return null;
};

export default function Gmaps() {
  const { selectedPlace } = useUserContext();
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [imagestate, setImageState] = useState([]);
  const [polylinePath, setPolylinePath] = useState([]);
  const [selectedPlaceDetails, setSelectedPlaceDetails] = useState(null);
  const [mapType, setMapType] = useState("satellite");
  const divRef = useRef(null);
  
  const handleMapClick = (newPoint) => {
    setPolylinePath((prevPath) => [...prevPath, newPoint]);
  };
  
  const handlePlaceSelect = (place) => {
    setSelectedPlaceDetails(place);
  };
  
  const toggleMapType = () => {
    setMapType(prev => prev === "satellite" ? "roadmap" : "satellite");
  };
  
  const clearPolyline = () => {
    setPolylinePath([]);
  };
  
  return (
    <div ref={divRef} className="h-full w-full opacity-100 transition-opacity duration-500" id="map">
      
      <APIProvider
        apiKey={"AIzaSyCBUWqISO_DOQUKhwb7q09wQteK87WOEec"}
        libraries={["places"]}
        solutionChannel="GMP_devsite_samples_v3_rgmautocomplete"
      >
        <Map
          mapId={"bf51a910020fa25a"}
          defaultZoom={3}
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          gestureHandling={"greedy"}
          disableDefaultUI={false}
          className="w-full h-full z-0 rounded-lg shadow-xl"
          mapTypeId={mapType}
          scaleControl={true}
        >
          <LogScaleValue />
          <ClickLogger onMapClick={handleMapClick} />
          <AdvancedMarker ref={markerRef} position={null} />
          <MapHandler 
            place={selectedPlace} 
            marker={marker} 
            setSelectedPlaceDetails={setSelectedPlaceDetails} 
          />
          <PlaceAutocomplete onPlaceSelect={handlePlaceSelect} />
          <PolylineRenderer path={polylinePath} />
          
          {/* Map Controls */}
          <MapControl position={ControlPosition.TOP_RIGHT}>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-2 m-2 flex flex-col gap-2">
              <button className="p-2 hover:bg-gray-200 rounded-full transition-colors" title="Zoom In">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-200 rounded-full transition-colors" title="Zoom Out">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </MapControl>
          
          <MapControl position={ControlPosition.LEFT_TOP}>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-2 m-2">
              <button 
                className="p-2 hover:bg-gray-200 rounded-full transition-colors mb-2" 
                onClick={toggleMapType}
                title={mapType === "satellite" ? "Switch to Map View" : "Switch to Satellite View"}
              >
                {mapType === "satellite" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </button>
              <button 
                className="p-2 hover:bg-gray-200 rounded-full transition-colors" 
                onClick={clearPolyline}
                title="Clear Path"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </MapControl>
          
          {polylinePath.length > 0 && (
            <MapControl position={ControlPosition.BOTTOM_CENTER}>
              <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 m-2">
                <p className="text-sm font-medium">Path Points: {polylinePath.length}</p>
              </div>
            </MapControl>
          )}
        </Map>
      </APIProvider>
    </div>
  );
}
