import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectAllMovies, movieEdited } from "../store/moviesSlice";

const EditMovieForm = ( ) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movies = useSelector(selectAllMovies);
  const filteredMovie = movies.filter((movie) => movie.id == id);
  const theMovie = filteredMovie[0];

  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [distributor, setDistributor] = useState("");
  const [rating, setRating] = useState(0);
  const [votes, setVotes] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const nameInputsMaxLength = 36;
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
    const exist = movies.filter(
      (movie) =>
        movie.title.toString().toLocaleLowerCase() ===
          title.toLocaleLowerCase() && movie.id.toString() !== id
    );
    
    return exist.length != 0 ? `${title} already exist in database` : "";
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
    !alreadyExistsError &&
    !movieLengthErr &&
    !directorLegthErr &&
    !distributorLegthErr &&
    !ratingLesThanZero &&
    !ratingGreaterThanMax &&
    !votesLesThanZero &&
    !votesGreaterThanMax;
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onDirectorChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDirector(e.target.value);
  const onDistributorChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDistributor(e.target.value);
  const onRatingChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRating(Number(e.target.value));
  const onVotesChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setVotes(Number(e.target.value));
  const onEditMovieClicked = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    dispatch(
      movieEdited({
        id: id,
        title,
        director,
        distributor,
        imdb_rating: Number(rating),
        imdb_votes: votes,
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
  };
  return (
    <>
      <section>
        <div>
          {showSuccess ? (
            <span className="successMsg">Movie successfully edited</span>
          ) : (
            ""
          )}
        </div>
        <form className="movieForm" data-testid="updateForm">
          <label htmlFor="movieTitle">Movie title</label>
          <input
            type="text"
            id="movieTitle"
            className="formInput"
            name="movieTitle"
            data-testid="movieTitle"
            value={title}
            onChange={onTitleChange}
            placeholder={theMovie.title}
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
            placeholder={theMovie.director}
            maxLength={nameInputsMaxLength}
          />
          <div data-testid="directorNameError" style={{ color: "red" }}>
            {directorLegthErr}
          </div>
          <label htmlFor="distributorName">Distributor name</label>
          <input
            type="text"
            id="distributorName"
            className="formInput"
            name="distributorName"
            data-testid="distributorName"
            value={distributor}
            onChange={onDistributorChange}
            placeholder={theMovie.distributor}
            maxLength={nameInputsMaxLength}
          />
          <div data-testid="distributorNameError" style={{ color: "red" }}>
            {distributorLegthErr}
          </div>
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
            placeholder={theMovie.imdb_rating.toString()}
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
            placeholder={theMovie.imdb_votes.toString()}
          />
          <div ata-testid="votesError" style={{ color: "red" }}>
            {votesLesThanZero}
            {votesGreaterThanMax}
          </div>
          <button
            data-testid="updateMovieSubmit"
            className="actionButton"
            type="submit"
            onClick={onEditMovieClicked}
            disabled={!Boolean(canSubmit)}
          >
            Update
          </button>
        </form>
      </section>
    </>
  );
};

export default EditMovieForm;
