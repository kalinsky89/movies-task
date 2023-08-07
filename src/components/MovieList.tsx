import React, { useEffect, useState } from "react";
import { AppDispatch } from "../store/store";
import { useSelector, useDispatch } from "react-redux/";
import {
  selectAllMovies,
  getMoviesStatus,
  getMoviesError,
  fetchMovies,
  deleteAMovie,
  movieDeleted,
} from "../store/moviesSlice";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const MovieList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector(selectAllMovies);
// console.log(`list movies: ${JSON.stringify(movies)}`)
  const moviesStatus = useSelector(getMoviesStatus);
  const error = useSelector(getMoviesError);
  const [search, setSearch] = useState("");
  const [arrayToMap, setArrayToMap] = useState(movies);

  useEffect(()=>{
    if(moviesStatus==='idle'){
      console.log('fetch')
      dispatch(fetchMovies())
    }
  }, [moviesStatus, dispatch])



  const searchFieldChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const deleteMovie = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try{
      dispatch(deleteAMovie(e.currentTarget.id));
      // dispatch(movieDeleted(e.currentTarget.id));
    }catch {
      console.log('delete movie failed')
    }
    if (search !== "") {
      setSearch("");
    }
  };

  useEffect(() => {
    setArrayToMap(() => {
      const newArray = movies.filter((movie) =>
        search === ""
          ? movie
          : movie.title
              .toString()
              .toLowerCase()
              .includes(search.toLocaleLowerCase())
      );
      return newArray;
    });
  }, [search, movies]);
  const renderedMovies = arrayToMap.map((movie) => {
    return (
      <tr
        key={movie.id}
        className="tableRow"
      >
        <td
          className="tableMovieItem"
          data-testid={`movieTitle${movie.id}`}
        >
          {movie.title}
        </td>
        <td
          className="tableMovieItem"
          data-testid={`movieDirector${movie.id}`}
        >
          {movie.director}
        </td>
        <td
          className="tableMovieItem"
          data-testid={`movieDistributor${movie.id}`}
        >
          {movie.distributor}
        </td>
        <td
          className="tableMovieItem"
          data-testid={`movieRating${movie.id}`}
        >
          {movie.imdb_rating}
        </td>
        <td
          className="tableMovieItem"
          data-testid={`movieVotes${movie.id}`}
        >
          {movie.imdb_votes}
        </td>
        <td
          className="actionDelete"
          data-testid={`movieActions${movie.id}`}
        >
          <button
            id={movie.id}
            data-testid={`actionDelete${movie.id}`}
            onClick={deleteMovie}
          >
            <FiTrash2 className="actionDeleteIcon" />
          </button>
        </td>
        <td className="actionEdit">
          <Link
            to={`/editmovie/${movie.id}`}
            data-testid={`actionEdit${movie.id}`}
          >
            <FiEdit className="actionEditIcon" />
          </Link>
        </td>
      </tr>
    );
  });

  let content;
  if(moviesStatus === 'loading'){
    content = <tr><td colSpan={7}>Loading...</td></tr>
  }else if(moviesStatus === 'failed'){
    content = <tr><td colSpan={7}>{error}</td></tr>
  }else if(moviesStatus === 'succeeded'){
    content = renderedMovies.reverse()
  }

  return (
    <>
      <section className="grow">
        <div className="search-wrapper">
          <label htmlFor="searchField" className="search-label">
            Search
          </label>
          <input
            type="text"
            name="searchField"
            data-testid="search"
            className="search-input"
            id="searchField"
            onChange={searchFieldChanged}
            placeholder="Search Movie by Name"
            value={search}
            maxLength={40}
          />
        </div>
        <table
          data-testid="movieList"
          className="movie-list"
        >
          <thead>
            <tr className="bg-primary">
              <th className="tableHeadings">
                Movie Name
              </th>
              <th className="tableHeadings">
                Director Name
              </th>
              <th className="tableHeadings">
                Distributor Name
              </th>
              <th className="tableHeadings">
                Imdb Rating
              </th>
              <th className="tableHeadings">
                Imdb Votes
              </th>
              <th
                className="tableHeadings"
                colSpan={2}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {content}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default React.memo(MovieList);
