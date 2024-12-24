// src/components/CharacterList.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "../features/characters/charactersSlice";

const CharacterList = () => {
  const dispatch = useDispatch();
  const { characters, status, error } = useSelector(
    (state) => state.characters
  );
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [locationDetails, setLocationDetails] = useState(null);
  const [episodeDetails, setEpisodeDetails] = useState([]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCharacters());
    }
  }, [dispatch, status]);

  const handleClick = async (character) => {
    setSelectedCharacter(character);

    const locationResponse = await fetch(character.location.url);
    const locationData = await locationResponse.json();
    setLocationDetails(locationData);

    const episodePromises = character.episode.map(async (episodeUrl) => {
      const episodeResponse = await fetch(episodeUrl);
      return episodeResponse.json();
    });

    const episodes = await Promise.all(episodePromises);
    setEpisodeDetails(episodes);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="character-list">
        {characters.map((character) => (
          <div
            key={character.id}
            className="character-card"
            onClick={() => handleClick(character)}
          >
            <img src={character.image} alt={character.name} />
            <h3>{character.name}</h3>
            <p>
              {character.status} - {character.species}
            </p>
          </div>
        ))}
      </div>

      {selectedCharacter && (
        <div className="character-details">
          <h3>{selectedCharacter.name}</h3>
          <p>Status: {selectedCharacter.status}</p>
          <p>Species: {selectedCharacter.species}</p>
          <p>Origin: {selectedCharacter.origin.name}</p>
          <p>
            Location: {locationDetails ? locationDetails.name : "Loading..."}
          </p>

          {/* Episode details */}
          <h4>Episodes:</h4>
          <ul>
            {episodeDetails.map((episode) => (
              <li key={episode.id}>
                {episode.name} (Season {episode.episode.split("E")[0]} - Episode{" "}
                {episode.episode.split("E")[1]})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CharacterList;
