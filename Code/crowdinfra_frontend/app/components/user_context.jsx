"use client";
import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [selectedPlace, setSelectedPlace] = useState(null); // Stores selected location (from search or map click)
  const [demandLocations, setDemandLocations] = useState([]); // Stores all raised demands as markers on map
  const [overlayOn, setOverlayOn] = useState(false);
  const [imageBlob, setImageBlob] = useState(null);
  const [scaleVal, setScaleVal] = useState(null);
  const [searchResults, setSearchResults] = useState([]); // Store search results
  const [activeDemand, setActiveDemand] = useState(null); // Track active/highlighted demand

  /**
   * Handles location selection from search input.
   * @param {Object} place - The selected place from Google Places API.
   */
  const handlePlaceSelect = (place) => {
    if (place?.geometry?.location) {
      const newPlace = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        name: place.formatted_address || "",
        placeId: place.place_id
      };
      setSelectedPlace(newPlace);
      setActiveDemand(null); // Reset active demand when new place selected
    }
  };

  /**
   * Handles map click to set selected place manually.
   * @param {Object} event - The Google Maps click event.
   */
  const handleMapClick = (event) => {
    if (event?.latLng) {
      const newPlace = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        name: "Pinned Location",
      };
      setSelectedPlace(newPlace);
      setActiveDemand(null); // Reset active demand when new place selected
    }
  };

  /**
   * Raises a demand at the selected location.
   * @param {Object} demandDetails - Details of the demand (title, description, etc.).
   */
  const raiseDemand = (demandDetails) => {
    if (selectedPlace) {
      const newDemand = {
        id: Date.now(), // Temporary ID for tracking
        ...demandDetails,
        location: selectedPlace,
        status: 'active'
      };
      setDemandLocations((prev) => [...prev, newDemand]);
      setSelectedPlace(null); // Reset selection after raising demand
    }
  };

  /**
   * Searches for demands and updates markers accordingly.
   * @param {Array} fetchedDemands - Array of demand objects from backend response.
   */
  const loadDemandMarkers = (fetchedDemands) => {
    setDemandLocations(fetchedDemands);
    setSearchResults(fetchedDemands); // Store search results
  };

  /**
   * Highlights a specific demand on the map
   * @param {string} demandId - ID of demand to highlight
   */
  const highlightDemand = (demandId) => {
    const demand = demandLocations.find(d => d.id === demandId);
    if (demand) {
      setActiveDemand(demand);
      setSelectedPlace(null); // Clear any selected place
    }
  };

  return (
    <UserContext.Provider
      value={{
        selectedPlace,
        setSelectedPlace,
        demandLocations,
        setDemandLocations,
        overlayOn,
        setOverlayOn,
        imageBlob,
        setImageBlob,
        scaleVal,
        setScaleVal,
        searchResults,
        activeDemand,
        handlePlaceSelect,
        handleMapClick,
        raiseDemand,
        loadDemandMarkers,
        highlightDemand
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
