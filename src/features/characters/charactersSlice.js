import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch characters from the Rick and Morty API
export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async (page = 1) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    const data = await response.json();
    return { characters: data.results, nextPage: data.info.next }; // Return characters and next page URL
  }
);

const charactersSlice = createSlice({
  name: "characters",
  initialState: {
    characters: [],
    nextPage: null, // Track the next page URL
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.characters = [...state.characters, ...action.payload.characters]; // Append new characters
        state.nextPage = action.payload.nextPage;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default charactersSlice.reducer;
