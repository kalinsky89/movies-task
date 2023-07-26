import React, { useEffect, useState } from "react";
import { AppDispatch } from "../store/store";
import { useSelector, useDispatch } from "react-redux/";
import {
  selectAllMovies,
  getMoviesStatus,
  getMoviesError,
  fetchMovies,
  movieDeleted,
} from "../store/moviesSlice";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const MovieList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector(selectAllMovies);
console.log(`list movies: ${JSON.stringify(movies)}`)
  const moviesStatus = useSelector(getMoviesStatus);
  const error = useSelector(getMoviesError);
  const [search, setSearch] = useState("");
  const [arrayToMap, setArrayToMap] = useState(movies);

  useEffect(()=>{
    if(moviesStatus==='idle'){
      dispatch(fetchMovies())
    }
  }, [moviesStatus, dispatch])



  const searchFieldChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const deleteMovie = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(movieDeleted(e.currentTarget.id));
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
        className="odd:bg-white even:bg-primary hover:bg-secondary transition-all"
      >
        <td
          className="border border-primary p-px sm:p-1 text-mobSmall sm:text-base"
          data-testid={`movieTitle${movie.id}`}
        >
          {movie.title}
        </td>
        <td
          className="border border-primary p-px sm:p-1 text-mobSmall sm:text-base"
          data-testid={`movieDirector${movie.id}`}
        >
          {movie.director}
        </td>
        <td
          className="border border-primary p-1 text-mobSmall sm:text-base"
          data-testid={`movieDistributor${movie.id}`}
        >
          {movie.distributor}
        </td>
        <td
          className="border border-primary p-px sm:p-1 text-xs sm:text-base"
          data-testid={`movieRating${movie.id}`}
        >
          {movie.imdb_rating}
        </td>
        <td
          className="border border-primary p-px sm:p-1 text-xs sm:text-base"
          data-testid={`movieVotes${movie.id}`}
        >
          {movie.imdb_votes}
        </td>
        <td
          className="border border-primary p-px sm:p-1 text-xs sm:text-base text-center"
          data-testid={`movieActions${movie.id}`}
        >
          <button
            id={movie.id}
            data-testid={`actionDelete${movie.id}`}
            onClick={deleteMovie}
          >
            <FiTrash2 className="hover:fill-red-400" />
          </button>
        </td>
        <td className="border border-primary p-1 text-xs sm:text-base">
          <Link
            to={`/editmovie/${movie.id}`}
            data-testid={`actionEdit${movie.id}`}
          >
            <FiEdit className="text-center my-0 mx-auto hover:fill-orange-300" />
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
        <div className="search-wrapper p-5 mb-5">
          <label htmlFor="searchField" className="text-3xl py-5 px-5">
            Search
          </label>
          <input
            type="text"
            name="searchField"
            data-testid="search"
            className="w-70 sm:w-80 h-10 text-xl p-2.5 border-x-2 border-y-2 rounded focus:border-primary"
            id="searchField"
            onChange={searchFieldChanged}
            placeholder="Search Movie by Name"
            value={search}
            maxLength={40}
          />
        </div>
        <table
          data-testid="movieList"
          className="movie-list w-full border border-collapse my-0 mx-auto"
        >
          <thead>
            <tr className="bg-primary">
              <th className="border border-primary p-1 text-mobThSmall sm:text-base text-white">
                Movie Name
              </th>
              <th className="border border-primary p-1 text-mobThSmall sm:text-base text-white">
                Director Name
              </th>
              <th className="border border-primary p-1 text-mobThSmall sm:text-base text-white">
                Distributor Name
              </th>
              <th className="border border-primary p-1 text-mobThSmall sm:text-base text-white">
                Imdb Rating
              </th>
              <th className="border border-primary p-1 text-mobThSmall sm:text-base text-white">
                Imdb Votes
              </th>
              <th
                className="border border-primary p-1 text-mobThSmall sm:text-base text-white"
                colSpan={2}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {renderedMovies.length !== 0 ? (
              // renderedMovies.reverse()
              content
            ) : (
              <tr>
                <td data-testid="noResults" colSpan={7}>
                  No results found
                </td>
              </tr>
            )} */}
            {content}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default React.memo(MovieList);
