import { render, screen } from "@testing-library/react";
import AddMoviePage from "./AddMoviePage";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { BrowserRouter } from "react-router-dom";

describe("Test Add movie page", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AddMoviePage />
        </BrowserRouter>
      </Provider>
    );
  });

  test("Check if add movie text presents", () => {
    const addText = screen.getByText(/Add New Movie/i);
    expect(addText).toBeInTheDocument;
  });
});
