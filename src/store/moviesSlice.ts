import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import data from "../data.json";
export interface Movies {
  id: number | string | any;
  title: string;
  director: string;
  distributor: string;
  imdb_rating: number;
  imdb_votes: number;
}

const iniTialStateValue = data as Movies[];

const moviesSlice = createSlice({
  name: "movies",
  initialState: iniTialStateValue,
  reducers: {
    movieAdded(state, action) {
      state.push(action.payload);
      return state;
    },
    movieDeleted(state, action) {
      state = state.filter((movie) => movie.id != action.payload);
      return state;
    },
    movieEdited(state, action) {
      state.map((movie) => {
        if (movie.id == action.payload.id) {
          movie.title = action.payload.title;
          movie.director = action.payload.director;
          movie.distributor = action.payload.distributor;
          movie.imdb_rating = action.payload.imdb_rating;
          movie.imdb_votes = action.payload.imdb_votes;
        }
      });
      return state;
    },
  },
});

export const selectAllMovies = (state: RootState) => state.movies;
export const { movieAdded, movieDeleted, movieEdited } = moviesSlice.actions;
export default moviesSlice.reducer;
