import { render, screen } from "@testing-library/react";
import Footer from "../Footer";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { BrowserRouter } from "react-router-dom";

describe("Test Footer Component", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      </Provider>
    );
  });

  test("Check if footer text", () => {
    const footeText = screen.getByText(/Copyright/i);
    expect(footeText).toBeInTheDocument;
  });
});
