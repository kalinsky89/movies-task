import { render, screen } from "@testing-library/react";
import MovieList from "../MovieList";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("Test the MovieList component", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MovieList />
        </BrowserRouter>
      </Provider>
    );
  });
  test("Movie list is loaded with search input, label, list and actions", () => {
    const searchInputLabel = screen.getByLabelText("Search");
    const searchInput = screen.getByTestId("search");
    const movieTable = screen.getByTestId("movieList");
    const movieTitle = screen.getByTestId("movieTitle1");
    const movieDirector = screen.getByTestId("movieDirector1");
    const movieDistributor = screen.getByTestId("movieDistributor1");
    const movieRating = screen.getByTestId("movieRating1");
    const movieVotes = screen.getByTestId("movieVotes1");
    const movieActions = screen.getByTestId("movieActions1");
    const movieDelete = screen.getByTestId("actionDelete1");
    const movieEdit = screen.getByTestId("actionEdit1");
    expect(searchInputLabel).toBeInTheDocument;
    expect(searchInput).toBeInTheDocument;
    expect(movieTable).toBeInTheDocument;
    expect(movieTitle).toBeInTheDocument;
    expect(movieDirector).toBeInTheDocument;
    expect(movieDistributor).toBeInTheDocument;
    expect(movieRating).toBeInTheDocument;
    expect(movieVotes).toBeInTheDocument;
    expect(movieActions).toBeInTheDocument;
    expect(movieDelete).toBeInTheDocument;
    expect(movieEdit).toBeInTheDocument;
  });
  test('Test behavoir when search form movie "The Big Parade', () => {
    const serchValue = "The Big Parade";
    const searchInput = screen.getByTestId("search");
    act(() => {
      userEvent.type(searchInput, serchValue);
    });
    expect(serchValue).toBeInTheDocument;
  });
  test('Test behavoir when search form missing movie "The Big ParadeCCC', () => {
    const serchValue = "The Big ParadeCCC";
    const searchInput = screen.getByTestId("search");
    // const tdResult = screen.getByTestId("movieTitle")
    act(() => {
      userEvent.type(searchInput, serchValue);
    });
    expect(serchValue).not.toBeInTheDocument;
  });
  test("Test behavoir when delete->current delete btn disappear", () => {
    const deleteBtn = screen.getByTestId("actionDelete3");
    act(() => {
      userEvent.click(deleteBtn);
    });
    expect(deleteBtn).not.toBeInTheDocument;
  });
  test("Test behavoir when edit clicked->current edit btn disappear", () => {
    const editBtn = screen.getByTestId("actionEdit6");
    act(() => {
      userEvent.click(editBtn);
    });
    expect(editBtn).not.toBeInTheDocument;
  });
  test("Test search, no result", () => {
    const serchValue = "Movie missing";
    const searchInput = screen.getByTestId("search");
    act(() => {
      userEvent.type(searchInput, serchValue);
    });
    const noResults1 = screen.getByTestId("noResults");
    expect(noResults1).toBeInTheDocument;
    const noResults = screen.getByText(/No results found/i)
    expect(noResults).toBeInTheDocument
  });
});
