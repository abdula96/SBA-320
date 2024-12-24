import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch episodes from the Rick and Morty API
export const fetchEpisodes = createAsyncThunk(
  "episodes/fetchEpisodes",
  async (page = 1) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/episode?page=${page}`
    );
    const data = await response.json();
    return { episodes: data.results, nextPage: data.info.next }; // Return episodes and next page URL
  }
);

const episodeSlice = createSlice({
  name: "episodes",
  initialState: {
    episodes: [],
    nextPage: null, // Track the next page URL
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpisodes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEpisodes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.episodes = [...state.episodes, ...action.payload.episodes]; // Append new episodes
        state.nextPage = action.payload.nextPage;
      })
      .addCase(fetchEpisodes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default episodeSlice.reducer;
