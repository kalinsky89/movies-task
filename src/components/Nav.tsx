import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import AddMoviePage from "../pages/AddMoviePage";
import EditMoviePage from "../pages/EditMoviePage";

const Nav = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="addmovie">Add Movie</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addmovie" element={<AddMoviePage />} />
        <Route path="/editmovie/:id" element={<EditMoviePage />} />
      </Routes>
    </>
  );
};

export default Nav;
