import React from "react";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { DarkModeProvider, useDarkMode, themes } from "./DarkModeContext";
import ThemeSwitcher from "./ThemeSwitcher";

function App() {
  const { theme } = useDarkMode();
  return (
      <div className={`App ${theme === themes.dark ? "dark" : "light"}`}>
        <Header />
        <ThemeSwitcher />
        <Nav />
        <Footer />
      </div>
  );
}

export default App;
