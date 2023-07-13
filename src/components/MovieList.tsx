import { useState } from "react";
import { useSelector, useDispatch } from "react-redux/";
import { selectAllMovies, movieDeleted } from "../store/moviesSlice";
import { Link } from "react-router-dom";

const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector(selectAllMovies);
  const [search, setSearch] = useState("");
  const searchFieldChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const deleteMovie = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(movieDeleted(e.currentTarget.id));
    if (search !== "") {
      setSearch("");
    }
  };
  const renderedMovies = movies
    .filter((movie) => {
      return search === ""
        ? movie
        : movie.title
            .toString()
            .toLowerCase()
            .includes(search.toLocaleLowerCase());
    })
    .map((movie) => {
      return (
        <tr key={movie.id}>
          <td data-testid={`movieTitle${movie.id}`}>{movie.title}</td>
          <td data-testid={`movieDirector${movie.id}`}>{movie.director}</td>
          <td data-testid={`movieDistributor${movie.id}`}>
            {movie.distributor}
          </td>
          <td data-testid={`movieRating${movie.id}`}>{movie.imdb_rating}</td>
          <td data-testid={`movieVotes${movie.id}`}>{movie.imdb_votes}</td>
          <td data-testid={`movieActions${movie.id}`}>
            <button
              className="actionButton"
              id={movie.id}
              data-testid={`actionDelete${movie.id}`}
              onClick={deleteMovie}
            >
              Delete
            </button>
          </td>
          <td>
            <Link
              className="actionButton"
              to={`/editmovie/${movie.id}`}
              data-testid={`actionEdit${movie.id}`}
            >
              Edit
            </Link>
          </td>
        </tr>
      );
    });
  return (
    <>
      <div className="search-wrapper">
        <label htmlFor="searchField">Search</label>
        <input
          type="text"
          name="searchField"
          data-testid="search"
          id="searchField"
          onChange={searchFieldChanged}
          placeholder="Search Movie by Name"
          value={search}
          maxLength={40}
        />
      </div>
      <table data-testid="movieList" className="movie-list">
        <thead>
          <tr>
            <th>Movie Name</th>
            <th>Director Name</th>
            <th>Distributor Name</th>
            <th>Imdb Rating</th>
            <th>Imdb Votes</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {renderedMovies.length != 0 ? (
            renderedMovies.reverse()
          ) : (
            <tr>
              <td data-testid="noResults" colSpan={7}>
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default MovieList;
