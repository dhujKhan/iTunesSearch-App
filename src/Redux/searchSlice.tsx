import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type ResponseData = {
    resultCount: number;
    results: SearchResult[];

  }

type SearchResult  = {
    trackId: number;
    artworkUrl100: string;
    trackName: string;
    artistName: string;
    previewUrl: string;
    collectionViewUrl:string;
  }
  const offset = 0;
  const displatLimit =10;

export const searchItems = createAsyncThunk(
    "Search/searchItems",
    async (searchTerm: string) => {
      try {
        const response = await axios.get(
          `https://itunes.apple.com/search?term=${(searchTerm)}`
        );
        
        return response.data.results;
      } catch (error) {
    }
  });

  

  
  const searchResultsSlice = createSlice({
    name: 'SearchList',
    initialState: {
    results: [],
    loading: false,
    error: '',
    searchTerm: '',
    },
    extraReducers: (builder) => {
      builder
        .addCase(searchItems.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(searchItems.fulfilled, (state, action) => {
          state.results = action.payload;
          state.loading = false;
          state.error = "";
        })
        .addCase(searchItems.rejected, (state, action) => {
          state.results = [];
          state.loading = false;
          state.error = action.error.message ?? 'Error';
        })
    },
    reducers: {}
  });

  export default searchResultsSlice.reducer;