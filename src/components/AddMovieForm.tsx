import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAllMovies, movieAdded } from "../store/moviesSlice";

const AddMovieForm = () => {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [distributor, setDistributor] = useState("");
  const [rating, setRating] = useState(0);
  const [votes, setVotes] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const movies = useSelector(selectAllMovies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nameInputsMaxLength = 36;
  const lastArrId = Number(movies[movies.length-1].id)
  
  const validationLengthError = (input: string): null | string => {
    return input.length == nameInputsMaxLength
      ? `Max symbols for this field (${nameInputsMaxLength}) reached`
      : null;
  };
  const lesThanZero = (value: number): string => {
    return value < 0 ? `Enter positive number` : "";
  };
  const greaterThanMax = (value: number, maxAllowed: number): string => {
    return value > maxAllowed ? `Enter number between 0 and ${maxAllowed}` : "";
  };
  const alreadyExists = (title: string): string => {
    const exist = movies.find(
      (movie) =>
        movie.title.toString().toLocaleLowerCase() === title.toLocaleLowerCase()
    );
    return typeof exist !== "undefined"
      ? `${exist.title} already exist in database`
      : "";
  };
  
  const movieLengthErr = validationLengthError(title);
  const directorLegthErr = validationLengthError(director);
  const distributorLegthErr = validationLengthError(distributor);
  const ratingLesThanZero = lesThanZero(rating);
  const votesLesThanZero = lesThanZero(votes);
  const ratingGreaterThanMax = greaterThanMax(rating, 10.0);
  const votesGreaterThanMax = greaterThanMax(votes, 99999);
  const alreadyExistsError = alreadyExists(title);

  const canSubmit =
    title &&
    director &&
    distributor &&
    !alreadyExistsError &&
    !movieLengthErr &&
    !directorLegthErr &&
    !distributorLegthErr &&
    !ratingLesThanZero &&
    !ratingGreaterThanMax &&
    !votesLesThanZero &&
    !votesGreaterThanMax;
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onDirectorChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDirector(e.target.value);
  const onDistributorChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDistributor(e.target.value);
  const onRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));
  };
  const onVotesChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setVotes(Number(e.target.value));
  const onAddMovieClicked = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (canSubmit) {
      e.preventDefault();
      dispatch(
        movieAdded({
          id: lastArrId+1,
          title,
          director,
          distributor,
          imdb_rating: Number(rating),
          imdb_votes: Number(votes),
        })
      );
      setShowSuccess(true);
      setTitle("");
      setDirector("");
      setDistributor("");
      setRating(0);
      setVotes(0);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <section>
      <h2>Fill the form bellow</h2>
      {showSuccess ? (
        <span data-testid="successMsg" className="successMsg">Movie successfully Added</span>
      ) : (
        ""
      )}
      <form className="movieForm">
        <label htmlFor="movieTitle">Movie title</label>
        <input
          type="text"
          id="movieTitle"
          className="formInput"
          name="movieTitle"
          data-testid="movieTitle"
          value={title}
          onChange={onTitleChange}
          required
          maxLength={nameInputsMaxLength}
        />
        <div data-testid="movieTitleError" style={{ color: "red" }}>
          {movieLengthErr}
          {alreadyExistsError}
        </div>
        <label htmlFor="directorName">Director name</label>
        <input
          type="text"
          id="directorName"
          className="formInput"
          name="directorName"
          data-testid="directorName"
          value={director}
          onChange={onDirectorChange}
          required
          maxLength={nameInputsMaxLength}
        />
        <div data-testid="directorNameError" style={{ color: "red" }}>{directorLegthErr}</div>
        <label htmlFor="distributorName">Distributor name</label>
        <input
          type="text"
          id="distributorName"
          className="formInput"
          name="distributorName"
          data-testid="distributorName"
          value={distributor}
          onChange={onDistributorChange}
          required
          maxLength={nameInputsMaxLength}
        />
        <div data-testid="distributorNameError" style={{ color: "red" }}>{distributorLegthErr}</div>
        <label htmlFor="ratingInput">Rating</label>
        <input
          type="number"
          step=".1"
          id="ratingInput"
          className="formInput inputNumbers"
          name="ratingInput"
          data-testid="rating"
          value={rating}
          onChange={onRatingChange}
          required
        />
        <div data-testid="ratingError" style={{ color: "red" }}>
          {ratingLesThanZero}
          {ratingGreaterThanMax}
        </div>
        <label htmlFor="votesInput">Votes</label>
        <input
          type="number"
          id="votesInput"
          className="formInput inputNumbers"
          name="votesInput"
          data-testid="votes"
          value={votes}
          onChange={onVotesChange}
          required
        />
        <div data-testid="votesError" style={{ color: "red" }}>
          {votesLesThanZero}
          {votesGreaterThanMax}
        </div>
        <button
          data-testid="addMovieSubmit"
          className="actionButton"
          type="submit"
          onClick={onAddMovieClicked}
          disabled={!Boolean(canSubmit)}
        >
          Save
        </button>
      </form>
    </section>
  );
};

export default AddMovieForm;
