import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "../features/characters/charactersSlice";

const CharacterList = () => {
  const dispatch = useDispatch();
  const { characters, status, error } = useSelector(
    (state) => state.characters
  );
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCharacters());
    }
  }, [dispatch, status]);

  const handleClick = (character) => {
    setSelectedCharacter(character);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Rick and Morty Characters</h2>
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
          <p>Location: {selectedCharacter.location.name}</p>
          {/* Add more details here */}
        </div>
      )}
    </div>
  );
};

export default CharacterList;
