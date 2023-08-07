import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAllMovies } from "../store/moviesSlice";
import {
  addNewMovie,
  getMoviesStatus,
  getMoviesError,
  fetchMovies,
} from "../store/moviesSlice";
import { AppDispatch } from "../store/store";

const AddMovieForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [distributor, setDistributor] = useState("");
  const [rating, setRating] = useState(0);
  const [votes, setVotes] = useState(0);
  const moviesStatus = useSelector(getMoviesStatus);
  const error = useSelector(getMoviesError);
  
  // console.log(`status:${moviesStatus}`);
     
 let message;
  if(moviesStatus === 'loading'){
    // console.log("add movie Fetch status:loading")
    message= "Loading data..."
  }else if(moviesStatus === 'failed'){
    // console.log("add movie Fetch status:failed")
    message= "Loading data Failed"
  }else if(moviesStatus === 'succeeded'){
    // console.log("add movie Fetch status:success")
    message= ""
  }

  const movies = useSelector(selectAllMovies);
  const navigate = useNavigate();
  const nameInputsMaxLength = 36;

  //errors|success states | addRequestStatus
  const [showSuccess, setShowSuccess] = useState(false);
  const [nextMovieId, setNexMovieId] = useState(0)
  const [addRequestStatus, setAddRequesStatus] = useState("idle");
  const [alreadyExistsError, setAlreadyExistsError] = useState("");
  const [movieLengthErr, setMovieLengthErr] = useState("");
  const [directorLegthErr, setDirectorLegthErr] = useState("");
  const [distributorLegthErr, setDistributorLegthErr] = useState("");
  const [ratingLesThanZero, setRatingLesThanZero] = useState("");
  const [ratingGreaterThanMax, setRatingGreaterThanMax] = useState("");
  const [votesLesThanZero, setVotesLesThanZero] = useState("");
  const [votesGreaterThanMax, setVotesGreaterThanMax] = useState("");

  useEffect(()=>{
    if (moviesStatus === 'idle') {
      console.log("fetch");
      dispatch(fetchMovies());
    }
  }, [])

  useEffect(()=>{
    if(movies.length>0){
      setNexMovieId(Number(movies[movies.length - 1].id+1))
    }
  }, [movies])

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
    const exist = movies.find(
      (movie) =>
        movie.title.toString().toLocaleLowerCase() === title.toLocaleLowerCase()
    );
    return typeof exist !== "undefined"
      ? `${exist.title} already exist in database`
      : "";
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
    !votesGreaterThanMax &&
    addRequestStatus === "idle";
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
      setAddRequesStatus("pending");
      e.preventDefault();
      try {
        dispatch(
          addNewMovie({
            // id: lastArrId + 1,
            id:nextMovieId,
            title,
            director,
            distributor,
            imdb_rating: Number(rating),
            imdb_votes: Number(votes),
          })
        );
        setShowSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch {
        console.log("Failed to add movie");
      }
    }
  };

  return (
    <>
      {message}
      <h2 className="formHeading">Fill the form bellow</h2>
      {showSuccess ? (
        <span
          data-testid="successMsg"
          className="successMsg"
        >
          Movie successfully Added
        </span>
      ) : (
        ""
      )}
      <form className="movieForm">
        <label className="formLabel" htmlFor="movieTitle">
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
          required
          maxLength={nameInputsMaxLength}
        />
        <div data-testid="movieTitleError" style={{ color: "red" }}>
          {movieLengthErr}
          {alreadyExistsError}
        </div>
        <label className="tformLabel" htmlFor="directorName">
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
          required
          maxLength={nameInputsMaxLength}
        />
        <div data-testid="directorNameError" style={{ color: "red" }}>
          {directorLegthErr}
        </div>
        <label className="formLabel" htmlFor="distributorName">
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
          required
          maxLength={nameInputsMaxLength}
        />
        <div data-testid="distributorNameError" style={{ color: "red" }}>
          {distributorLegthErr}
        </div>
        <label className="formLabel" htmlFor="ratingInput">
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
          required
        />
        <div data-testid="ratingError" style={{ color: "red" }}>
          {ratingLesThanZero}
          {ratingGreaterThanMax}
        </div>
        <label className="formLabel" htmlFor="votesInput">
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
          required
        />
        <div data-testid="votesError" style={{ color: "red" }}>
          {votesLesThanZero}
          {votesGreaterThanMax}
        </div>
        <button
          data-testid="addMovieSubmit"
          className="actionButton disabled: bg-disabledRed"
          type="submit"
          onClick={onAddMovieClicked}
          disabled={!Boolean(canSubmit)}
        >
          Save
        </button>
      </form>
    </>
  );
};

export default AddMovieForm;
