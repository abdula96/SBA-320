import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from "../features/characters/charactersSlice";
import locationReducer from "../features/location/locationSlice";
import episodeReducer from "../features/episode/episodeSlice";

const store = configureStore({
  reducer: {
    characters: charactersReducer,
    locations: locationReducer,
    episodes: episodeReducer,
  },
});

// Make sure you're using default export
export default store; // This is correct
