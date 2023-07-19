import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import AddMoviePage from "../pages/AddMoviePage";
import EditMoviePage from "../pages/EditMoviePage";

const Nav = () => {
  return (
    <>
      <nav className="p-3 bg-primary">
        <ul>
          <li className="inline-block my-0 mx-1.5 text-white text-lg font-bold list-none">
            <Link className="text-white bg-primary text-base no-underline p-2.5 rounded-lg transition-all hover:bg-secondary hover:text-black" to="/">Home</Link>
          </li>
          <li className="inline-block my-0 mx-1.5 text-white text-lg font-bold list-none">
            <Link className="text-white bg-primary text-base no-underline p-2.5 rounded-lg transition-all hover:bg-secondary hover:text-black" to="addmovie">Add Movie</Link>
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
