// src/pages/CharactersPage.jsx
import React from "react";
import CharacterList from "../components/CharacterList";

const CharactersPage = () => {
  const handleSelectCharacter = (character) => {
    // Handle character selection (you can show more detailed info in a modal, etc.)
    console.log(character);
  };

  return (
    <div>
      <h2>Rick and Morty Characters</h2>
      <CharacterList onSelectCharacter={handleSelectCharacter} />
    </div>
  );
};

export default CharactersPage;
