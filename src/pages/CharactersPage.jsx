import React from "react";
import CharacterList from "../components/CharacterList";

const CharactersPage = () => {
  const handleSelectCharacter = (character) => {
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
