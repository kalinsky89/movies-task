import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import data from "../data.json";
import axios from "axios";
import { act } from "react-dom/test-utils";

export interface Movies {
  id: number | string | any;
  title: string;
  director: string;
  distributor: string;
  imdb_rating: number;
  imdb_votes: number;
}
export interface dataState {
  data: Movies[];
  status: string;
  error: string | undefined;
}

// const iniTialStateValue = data as Movies[];
const url = "https://retoolapi.dev/iXFthB/data";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  try {
    const responce = await axios.get(url);
    return [...responce.data];
  } catch (error: any) {
    return error.message;
  }
});

export const addNewMovie = createAsyncThunk(
  "movies/addNewMovie",
  async (newMovie: Movies) => {
    const responce = await axios.post(url, newMovie);
    // console.log(`resp data: ${JSON.stringify(responce.data)}`);
    return responce.data;
  }
);

export const deleteAMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (id: string | number) => {
    const delEndPoint = `${url}/${id}`;
    const responce = await axios.delete(delEndPoint, {data:{id:id}});
    // console.log("slice deletepay:", JSON.stringify(responce))
    return id
  }
);

export const updateAMovie = createAsyncThunk(
  "movies/updateAMovie",
  async (movieToUpdate: Movies) => {
    const responce = await axios.put(
      `${url}/${movieToUpdate.id}`,
      movieToUpdate
    );
    // console.log("update responce", JSON.stringify(responce.data))
    return responce.data;
  }
);

const iniTialStateValue: dataState = {
  data: [],
  status: "idle", // idle | loading |succeeded | failed
  error: "",
};

const moviesSlice = createSlice({
  name: "movies",
  initialState: iniTialStateValue,
  reducers: {
    movieAdded(state, action) {
      state.data.push(action.payload);
      return state;
    },
    movieDeleted(state, action) {
      state.data = state.data.filter((movie) => movie.id != action.payload);
      return state;
    },
    movieEdited(state, action) {
      state.data.map((movie) => {
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
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state, action) => {
        console.log("slice:loading");
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("slice:success");
        state.data = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log("slice:rejected");
      })
      .addCase(addNewMovie.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(deleteAMovie.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (movie) => Number(movie.id) !== Number(action.payload)
        );
      })
      .addCase(updateAMovie.fulfilled, (state, action) => {
        state.data.map((movie) => {
          if (movie.id == action.payload.id) {
            movie.title = action.payload.title;
            movie.director = action.payload.director;
            movie.distributor = action.payload.distributor;
            movie.imdb_rating = action.payload.imdb_rating;
            movie.imdb_votes = action.payload.imdb_votes;
          }
        });
        return state;
      });
  },
});

export const selectAllMovies = (state: RootState) => state.movies.data;
export const getMoviesStatus = (state: RootState) => state.movies.status;
export const getMoviesError = (state: RootState) => state.movies.error;
export const { movieAdded, movieDeleted, movieEdited } = moviesSlice.actions;
export default moviesSlice.reducer;
