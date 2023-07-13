import { render, screen } from "@testing-library/react";
import Header from "../Header";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { BrowserRouter } from "react-router-dom";

describe("Test Header Component", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
  });

  test("Check if header text", () => {
    const headerText = screen.getByText(/Movies/i);
    expect(headerText).toBeInTheDocument;
  });
});
