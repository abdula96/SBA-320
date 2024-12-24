import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async (page = 1) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    const data = await response.json();
    return { characters: data.results, nextPage: data.info.next };
  }
);

const charactersSlice = createSlice({
  name: "characters",
  initialState: {
    characters: [],
    nextPage: null,
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
        state.characters = [...state.characters, ...action.payload.characters];
        state.nextPage = action.payload.nextPage;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default charactersSlice.reducer;
