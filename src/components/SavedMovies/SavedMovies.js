import { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

const SavedMovies = ({ moviesList, setIsChecked, setSearch, savedMoviesList, isLoading, onDislike }) => {

  return (
    <>
      <SearchForm
        isLoading={isLoading}
        setIsChecked={setIsChecked}
        setSearch={setSearch} />
      <MoviesCardList
        movies={moviesList}
        isLoading={isLoading}
        onDislike={onDislike}
        savedMoviesList={savedMoviesList}
      />
      <div className='main__element-gap'></div>
      <Footer />
    </>
  )
}

export default SavedMovies;
