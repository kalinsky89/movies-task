import React from "react";
import AddMovieForm from "../components/AddMovieForm";

const AddMoviePage = () => {
  return (
    <main className="min-h-screenNotFull flex flex-col items-stretch">
      <h1 className="page-title text-3xl font-bold py-5">Add New Movie</h1>
      <AddMovieForm />
    </main>
  );
};

export default AddMoviePage;
