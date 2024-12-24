import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLocations = createAsyncThunk(
  "locations/fetchLocations",
  async (page = 1) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/location?page=${page}`
    );
    const data = await response.json();
    return { locations: data.results, nextPage: data.info.next };
  }
);

const locationSlice = createSlice({
  name: "locations",
  initialState: {
    locations: [],
    nextPage: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.locations = [...state.locations, ...action.payload.locations];
        state.nextPage = action.payload.nextPage;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default locationSlice.reducer;
