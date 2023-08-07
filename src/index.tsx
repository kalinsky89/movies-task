import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { DarkModeProvider } from "./DarkModeContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <DarkModeProvider>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </DarkModeProvider>
  </React.StrictMode>
);
