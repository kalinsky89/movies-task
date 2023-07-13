import { render, screen } from "@testing-library/react";
import AddMovieForm from "../AddMovieForm";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("Test the AddMovieFormComponent ", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AddMovieForm />
        </BrowserRouter>
      </Provider>
    );
  });
  test("render the add movie form with 5 inputs and 1 button", () => {
    const inputMovieTitle = screen.getByTestId("movieTitle");
    const inputDirectorName = screen.getByTestId("directorName");
    const inputDistributorName = screen.getByTestId("distributorName");
    const inputRating = screen.getByTestId("rating");
    const inputVotes = screen.getByTestId("votes");
    const buttonSbmt = screen.getByTestId("addMovieSubmit");
    expect(inputMovieTitle).toBeInTheDocument;
    expect(inputDirectorName).toBeInTheDocument;
    expect(inputDistributorName).toBeInTheDocument;
    expect(inputRating).toBeInTheDocument;
    expect(inputVotes).toBeInTheDocument;
    expect(buttonSbmt).toBeInTheDocument;
  });

  test("validation length movie title name should fail", () => {
    const inputMovieTitle = screen.getByTestId("movieTitle");
    const movieName = "sssssssssssssssssssssssssssssssssssssssssssssssssssssss";
    const error = screen.getByTestId("movieTitleError");
    const buttonSbmt = screen.getByTestId("addMovieSubmit");
    act(() => {
      userEvent.type(inputMovieTitle, movieName);
    });
    expect(error).toHaveTextContent("Max symbols for this field (36) reached");
    expect(buttonSbmt).toBeDisabled();
  });
  test("validation for existing movie finds movie exists", () => {
    const inputMovieTitle = screen.getByTestId("movieTitle");
    const movieName = "Big";
    const error = screen.getByTestId("movieTitleError");
    const buttonSbmt = screen.getByTestId("addMovieSubmit");
    act(() => {
      userEvent.type(inputMovieTitle, movieName);
    });
    expect(error).toHaveTextContent("Big already exist in database");
    expect(buttonSbmt).toBeDisabled();
  });
  test("validation director name should be null->no error", () => {
    const inputDirectorName = screen.getByTestId("directorName");
    const directorName = "King Vidor";
    const error = screen.getByTestId("directorNameError");
    const buttonSbmt = screen.getByTestId("addMovieSubmit");
    act(() => {
      userEvent.type(inputDirectorName, directorName);
    });
    expect(error).toHaveTextContent("");
    expect(buttonSbmt).toBeDisabled();
  });
  test("validation disributor name should be null->no error", () => {
    const inputDistributorName = screen.getByTestId("distributorName");
    const directorName = "King Vidor";
    const error = screen.getByTestId("distributorNameError");
    const buttonSbmt = screen.getByTestId("addMovieSubmit");
    act(() => {
      userEvent.type(inputDistributorName, directorName);
    });
    expect(error).toHaveTextContent("");
    expect(buttonSbmt).toBeDisabled();
  });
  test("validation rating value more that 10 should be trigered", () => {
    const inputRating = screen.getByTestId("rating");
    const rating = "11.1";
    const error = screen.getByTestId("ratingError");
    const buttonSbmt = screen.getByTestId("addMovieSubmit");
    act(() => {
      userEvent.type(inputRating, rating);
    });
    expect(error).toHaveTextContent("Enter number between 0 and 10");
    expect(buttonSbmt).toBeDisabled();
  });
  test("validation rating negative value should be trigered", () => {
    const inputRating = screen.getByTestId("rating");
    const rating = "-11.1";
    const error = screen.getByTestId("ratingError");
    const buttonSbmt = screen.getByTestId("addMovieSubmit");
    act(() => {
      userEvent.clear(inputRating);
      userEvent.type(inputRating, rating);
    });
    expect(error).toHaveTextContent("Enter positive number");
    expect(buttonSbmt).toBeDisabled();
  });
  test("validation votes value more that 99999 should be trigered", () => {
    const inputVotes = screen.getByTestId("votes");
    const votes = "10000000";
    const error = screen.getByTestId("votesError");
    const buttonSbmt = screen.getByTestId("addMovieSubmit");
    act(() => {
      userEvent.clear(inputVotes);
      userEvent.type(inputVotes, votes);
    });
    expect(error).toHaveTextContent("Enter number between 0 and 99999");
    expect(buttonSbmt).toBeDisabled();
  });

  test("validation votes negative value should be trigered", () => {
    const inputVotes = screen.getByTestId("votes");
    const votes = "-1";
    const error = screen.getByTestId("votesError");
    const buttonSbmt = screen.getByTestId("addMovieSubmit");
    act(() => {
      userEvent.clear(inputVotes);
      userEvent.type(inputVotes, votes);
    });
    expect(error).toHaveTextContent("Enter positive number");
    expect(buttonSbmt).toBeDisabled();
  });
  test("onload add movie form should be disabled", () => {
    const buttonSbmt = screen.getByTestId("addMovieSubmit");
    expect(buttonSbmt).toBeDisabled();
  });

  test("Success add movie", () => {
    const inputMovieTitle = screen.getByTestId("movieTitle");
    const inputDirectorName = screen.getByTestId("directorName");
    const inputDistributorName = screen.getByTestId("distributorName");
    const inputRating = screen.getByTestId("rating");
    const inputVotes = screen.getByTestId("votes");
    const buttonSbmt = screen.getByTestId("addMovieSubmit");
    const movieName = "BLack Mirror";
    const movieDirector = "Adam Sandler";
    const movieDistributor = "Netflix";
    const movieRating = "4.5";
    const movieVotes = "2987";
    act(() => {
      userEvent.type(inputMovieTitle, movieName);
      userEvent.type(inputDirectorName, movieDirector);
      userEvent.type(inputDistributorName, movieDistributor);
      userEvent.type(inputRating, movieRating);
      userEvent.type(inputVotes, movieVotes);
    });
    
    expect(buttonSbmt).not.toBeDisabled;
    act(() => {
      userEvent.click(buttonSbmt);
    });
    const successMsg = screen.getByTestId("successMsg");
    expect(successMsg).toBeInTheDocument()
  });
});
