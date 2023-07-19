import React from 'react'
import EditMovieForm from '../components/EditMovieForm'

const EditMoviePage = () => {
  return (
    <main className="min-h-screenNotFull flex flex-col ">
      <h1  className="page-title text-3xl font-bold py-5">Update Movie</h1>
      <EditMovieForm />
    </main>
  )
}

export default EditMoviePage
