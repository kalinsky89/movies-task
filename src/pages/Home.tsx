import React from 'react'
import MovieList from '../components/MovieList'
const Home = () => {
  return (
    <main className="min-h-screenNotFull flex flex-col ">
      <h1 className="page-title text-3xl font-bold py-5">Home</h1>
      <MovieList/>
    </main>
  )
}

export default Home
