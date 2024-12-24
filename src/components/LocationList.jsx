// src/components/LocationList.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations } from "../features/location/locationSlice";

const LocationList = () => {
  const dispatch = useDispatch();
  const { locations, status, error } = useSelector((state) => state.locations);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchLocations());
    }
  }, [dispatch, status]);

  const handleClick = async (location) => {
    setSelectedLocation(location);
    // You can use location data to display more details
    // For example, if there's a location image, it can be shown here
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Rick and Morty Locations</h2>
      <div className="location-list">
        {locations.map((location) => (
          <div
            key={location.id}
            className="location-card"
            onClick={() => handleClick(location)}
          >
            <h3>{location.name}</h3>
            <p>{location.type}</p>
          </div>
        ))}
      </div>

      {selectedLocation && (
        <div className="location-details">
          <h3>{selectedLocation.name}</h3>
          <p>Type: {selectedLocation.type}</p>
          <p>Dimension: {selectedLocation.dimension}</p>

          {/* Display location image if available */}
          {selectedLocation.image ? (
            <img
              src={selectedLocation.image}
              alt={selectedLocation.name}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          ) : (
            <p>No image available for this location.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationList;
