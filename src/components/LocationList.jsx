// src/components/LocationList.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations } from "../features/location/locationSlice";
import locationImages from "../assets/locationImages"; // Import the location images

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
    console.log(location.name); // Log to check if the location name is correct
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
            style={{ cursor: "pointer", marginBottom: "20px" }} // Add card styling
          >
            <h3>{location.name}</h3>
            <p>{location.type}</p>
          </div>
        ))}
      </div>

      {selectedLocation && (
        <div className="location-details" style={{ marginTop: "20px" }}>
          <h3>{selectedLocation.name}</h3>
          <p>Type: {selectedLocation.type}</p>
          <p>Dimension: {selectedLocation.dimension}</p>

          {/* Display location image */}
          {locationImages[selectedLocation.name] ? (
            <img
              src={locationImages[selectedLocation.name]}
              alt={selectedLocation.name}
              style={{
                width: "300px", // Fixed width
                height: "200px", // Fixed height
                objectFit: "cover", // Maintain aspect ratio, crop if necessary
                borderRadius: "10px", // Optional: Rounded corners
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Optional: Shadow for styling
              }}
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