import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectAllMovies, movieEdited } from "../store/moviesSlice";

const EditMovieForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movies = useSelector(selectAllMovies);
  const filteredMovie = movies.filter((movie) => movie.id == id);
  const theMovie = filteredMovie[0];
  const nameInputsMaxLength = 36;

  //movie properties
  const [title, setTitle] = useState(theMovie.title);
  const [director, setDirector] = useState(theMovie.director);
  const [distributor, setDistributor] = useState(theMovie.distributor);
  const [rating, setRating] = useState(theMovie.imdb_rating);
  const [votes, setVotes] = useState(theMovie.imdb_votes);

  //errors|success states
  const [showSuccess, setShowSuccess] = useState(false);
  const [alreadyExistsError, setAlreadyExistsError] = useState("");
  const [movieLengthErr, setMovieLengthErr] = useState("");
  const [directorLegthErr, setDirectorLegthErr] = useState("");
  const [distributorLegthErr, setDistributorLegthErr] = useState("");
  const [ratingLesThanZero, setRatingLesThanZero] = useState("");
  const [ratingGreaterThanMax, setRatingGreaterThanMax] = useState("");
  const [votesLesThanZero, setVotesLesThanZero] = useState("");
  const [votesGreaterThanMax, setVotesGreaterThanMax] = useState("");

  //validations
  const validationLengthError = (input: string): string => {
    return input.length == nameInputsMaxLength
      ? `Max symbols for this field (${nameInputsMaxLength}) reached`
      : "";
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

  useEffect(() => {
    setAlreadyExistsError(alreadyExists(title));
    setMovieLengthErr(validationLengthError(title));
  }, [title]);
  useEffect(() => {
    setDirectorLegthErr(validationLengthError(director));
  }, [director]);
  useEffect(() => {
    setDistributorLegthErr(validationLengthError(distributor));
  }, [distributor]);

  useEffect(() => {
    setRatingLesThanZero(lesThanZero(rating));
    setRatingGreaterThanMax(greaterThanMax(rating, 10.0));
  }, [rating]);

  useEffect(() => {
    setVotesLesThanZero(lesThanZero(votes));
    setVotesGreaterThanMax(greaterThanMax(votes, 99999));
  }, [votes]);

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
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <>
      <section>
        <div>
          {showSuccess ? (
            <span className="relative p-4 bg-successGreen text-white font-bold rounded-md">
              Movie successfully updated
            </span>
          ) : (
            ""
          )}
        </div>
        <form className="movieForm" data-testid="updateForm">
          <label htmlFor="movieTitle" className="text-xl">
            Movie title
          </label>
          <input
            type="text"
            id="movieTitle"
            className="formInput block w-72 text-xl border border-primary rounded mx-auto mb-2.5 p-1 transition-all"
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
          <label htmlFor="directorName" className="text-xl">
            Director name
          </label>
          <input
            type="text"
            id="directorName"
            className="formInput block w-72 text-xl border border-primary rounded mx-auto mb-2.5 p-1 transition-all"
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
          <label htmlFor="distributorName" className="text-xl">
            Distributor name
          </label>
          <input
            type="text"
            id="distributorName"
            className="formInput block w-72 text-xl border border-primary rounded mx-auto mb-2.5 p-1 transition-all"
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
          <label htmlFor="ratingInput" className="text-xl">
            Rating
          </label>
          <input
            type="number"
            step=".1"
            id="ratingInput"
            className="formInput block w-24 text-xl border border-primary rounded mx-auto mb-2.5 p-1 transition-all"
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
          <label htmlFor="votesInput" className="text-xl">
            Votes
          </label>
          <input
            type="number"
            id="votesInput"
            className="formInput block w-24 text-xl border border-primary rounded mx-auto mb-2.5 p-1 transition-all"
            name="votesInput"
            data-testid="votes"
            value={votes}
            onChange={onVotesChange}
            placeholder={theMovie.imdb_votes.toString()}
          />
          <div data-testid="votesError" style={{ color: "red" }}>
            {votesLesThanZero}
            {votesGreaterThanMax}
          </div>
          <button
            data-testid="updateMovieSubmit"
            className="actionButton enabled:bg-thirdGray text-black text-md font-bold p-1 border border-primary rounded-md cursor-pointer transition-all enabled:hover:bg-primary enabled:hover:text-white disabled: bg-disabledRed"
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
