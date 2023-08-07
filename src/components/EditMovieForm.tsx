import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllMovies,
  movieEdited,
  getMoviesStatus,
} from "../store/moviesSlice";
import { updateAMovie, fetchMovies } from "../store/moviesSlice";
import { AppDispatch } from "../store/store";

const EditMovieForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const movies = useSelector(selectAllMovies);
  const moviesStatus = useSelector(getMoviesStatus);
  const filteredMovie = movies.filter((movie) => movie.id == id);
  const theMovie = filteredMovie[0];
  const nameInputsMaxLength = 36;
  const [updateRequesStatus, setUpdateRequesStatus] = useState("idle");

  useEffect(() => {
    if (moviesStatus === "idle") {
      console.log("fetch");
      dispatch(fetchMovies());
    }
  }, []);

  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [distributor, setDistributor] = useState("");
  const [rating, setRating] = useState(0);
  const [votes, setVotes] = useState(0);
  useEffect(() => {
    if (filteredMovie.length === 1) {
      setTitle(theMovie.title);
      setDirector(theMovie.director);
      setDistributor(theMovie.distributor);
      setRating(theMovie.imdb_rating);
      setVotes(theMovie.imdb_votes);
    }
  }, [filteredMovie.length]);

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
  const validationLengthError = useCallback(
    (input: string): string => {
      return input.length == nameInputsMaxLength
        ? `Max symbols for this field (${nameInputsMaxLength}) reached`
        : "";
    },
    [title, director, distributor]
  );
  const lesThanZero = useCallback(
    (value: number): string => {
      return value < 0 ? `Enter positive number` : "";
    },
    [rating, votes]
  );
  const greaterThanMax = useCallback(
    (value: number, maxAllowed: number): string => {
      return value > maxAllowed
        ? `Enter number between 0 and ${maxAllowed}`
        : "";
    },
    [rating, votes]
  );
  const alreadyExists = useCallback(
    (title: string): string => {
      const exist = movies.filter(
        (movie) =>
          movie.title.toString().toLocaleLowerCase() ===
            title.toLocaleLowerCase() && movie.id.toString() !== id
      );

      return exist.length != 0 ? `${title} already exist in database` : "";
    },
    [title]
  );

  // useEffect(()=>{
  //   if(moviesStatus === 'loading'){
  //     console.log("update movie Fetch status:loading")
  //     message= "Loading data..."
  //   }else if(moviesStatus === 'failed'){
  //     console.log("update movie Fetch status:failed")
  //     message= "Loading data Failed"
  //   }else if(moviesStatus === 'succeeded'){
  //     console.log("update movie Fetch status:success")
  //     message= "Data Loaded"
  //   }
  // }, [moviesStatus])

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
    !votesGreaterThanMax &&
    updateRequesStatus === "idle";

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
    try {
      setUpdateRequesStatus("pending");
      dispatch(
        updateAMovie({
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
    } catch (err) {
      console.log("update failed");
    }
  };

  return (
    <>
      <section>
        <div>
          {showSuccess ? (
            <span className="successMsg">
              Movie successfully updated
            </span>
          ) : (
            ""
          )}
        </div>
        <form className="movieForm" data-testid="updateForm">
          <label htmlFor="movieTitle" className="formLabel">
            Movie title
          </label>
          <input
            type="text"
            id="movieTitle"
            className="formInput"
            name="movieTitle"
            data-testid="movieTitle"
            value={title}
            onChange={onTitleChange}
            placeholder="Movie Title"
            maxLength={nameInputsMaxLength}
          />
          <div data-testid="movieTitleError" style={{ color: "red" }}>
            {movieLengthErr}
            {alreadyExistsError}
          </div>
          <label htmlFor="directorName" className="formLabel">
            Director name
          </label>
          <input
            type="text"
            id="directorName"
            className="formInput"
            name="directorName"
            data-testid="directorName"
            value={director}
            onChange={onDirectorChange}
            placeholder="Director Name"
            maxLength={nameInputsMaxLength}
          />
          <div data-testid="directorNameError" style={{ color: "red" }}>
            {directorLegthErr}
          </div>
          <label htmlFor="distributorName" className="formLabel">
            Distributor name
          </label>
          <input
            type="text"
            id="distributorName"
            className="formInput"
            name="distributorName"
            data-testid="distributorName"
            value={distributor}
            onChange={onDistributorChange}
            placeholder="Distributor Name"
            maxLength={nameInputsMaxLength}
          />
          <div data-testid="distributorNameError" style={{ color: "red" }}>
            {distributorLegthErr}
          </div>
          <label htmlFor="ratingInput" className="formLabel">
            Rating
          </label>
          <input
            type="number"
            step=".1"
            id="ratingInput"
            className="formInput formInputSmall"
            name="ratingInput"
            data-testid="rating"
            value={rating}
            onChange={onRatingChange}
            placeholder="Rating"
          />
          <div data-testid="ratingError" style={{ color: "red" }}>
            {ratingLesThanZero}
            {ratingGreaterThanMax}
          </div>
          <label htmlFor="votesInput" className="formLabel">
            Votes
          </label>
          <input
            type="number"
            id="votesInput"
            className="formInput formInputSmall"
            name="votesInput"
            data-testid="votes"
            value={votes}
            onChange={onVotesChange}
            placeholder="Votes"
          />
          <div data-testid="votesError" style={{ color: "red" }}>
            {votesLesThanZero}
            {votesGreaterThanMax}
          </div>
          <button
            data-testid="updateMovieSubmit"
            className="actionButton disabled: bg-disabledRed"
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
