import { render, screen } from "@testing-library/react";
import EditMovieForm from "../EditMovieForm";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("Test Edit Movie Form Component", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <EditMovieForm/>
        </BrowserRouter>
      </Provider>
    );
  });

  test("render the Update movie form with 5 inputs and 1 button", () => {
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
    const movieName = "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz";
    const error = screen.getByTestId("movieTitleError");
    act(() => {
      userEvent.type(inputMovieTitle, movieName);
    });
    expect(error).toHaveTextContent("Max symbols for this field (36) reached");
  });
  test("validation director name should be null", () => {
    const inputDirectorName = screen.getByTestId("directorName");
    const directorName = "Mat Damon";
    const error = screen.getByTestId("directorNameError");
    act(() => {
      userEvent.type(inputDirectorName, directorName);
    });
    expect(error).toHaveTextContent("");
  });
  test("validation director name should be null->no error", () => {
    const inputDirectorName = screen.getByTestId("directorName");
    const directorName = "King Charles";
    const error = screen.getByTestId("directorNameError");
    act(() => {
      userEvent.type(inputDirectorName, directorName);
    });
    expect(error).toHaveTextContent("");
  });
  test("validation distributor name should be null->no error", () => {
    const inputDistributorName = screen.getByTestId("distributorName");
    const directorName = "Adam Brody";
    const error = screen.getByTestId("distributorNameError");
    act(() => {
      userEvent.type(inputDistributorName, directorName);
    });
    expect(error).toHaveTextContent("");
  });
  test("validation director long name ->error", () => {
    const inputDirectorName = screen.getByTestId("directorName");
    const directorName = "Adam BrodyAdam BrodyAdam BrodyAdam BrodyAdam BrodyAdam BrodyAdam Brody";
    const error = screen.getByTestId("directorNameError");
    act(() => {
      userEvent.type(inputDirectorName, directorName);
    });
    expect(error).toHaveTextContent("Max symbols for this field (36) reached");
  });
  test("validation distributor long name ->error", () => {
    const inputDistributorName = screen.getByTestId("distributorName");
    const directorName = "asdasdaasdsdasdasdsdsddsadsadsadsadada";
    const error = screen.getByTestId("distributorNameError");
    act(() => {
      userEvent.type(inputDistributorName, directorName);
    });
    expect(error).toHaveTextContent("Max symbols for this field (36) reached");
  });
  test("validation rating value more that 10 should be trigered", () => {
    const inputRating = screen.getByTestId("rating");
    const rating = "11.1";
    const error = screen.getByTestId("ratingError");
    act(() => {
      userEvent.type(inputRating, rating);
    });
    expect(error).toHaveTextContent("Enter number between 0 and 10");
  });
  test("validation rating negative value should be trigered", () => {
    const inputRating = screen.getByTestId("rating");
    const rating = "-11.1";
    const error = screen.getByTestId("ratingError");
    act(() => {
      userEvent.clear(inputRating);
      userEvent.type(inputRating, rating);
    });
    expect(error).toHaveTextContent("Enter positive number");
  });
  test("validation votes value more that 99999 should be trigered", () => {
    const inputVotes = screen.getByTestId("votes");
    const votes = "10000000";
    const error = screen.getByTestId("votesError");
    act(() => {
      userEvent.clear(inputVotes);
      userEvent.type(inputVotes, votes);
    });
    expect(error).toHaveTextContent("Enter number between 0 and 99999");
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
});
