import { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { initialFilmList } from '../../utils/initialFilmList';

function Movies ({
  onFilterMovies,
  moviesList,
  savedMoviesList,
  isLoading,
  setIsChecked,
  setSearch,
}) {
  const [movies, setMovies] = useState([]);
  const unwatchedFilms = moviesList.slice(movies.length);

  function remainingFilmsToView () {
    setMovies([...moviesList, ...unwatchedFilms.slice(0, 12)])
  }

  return (
    <main>
      <SearchForm isLoading={isLoading} onFilterMovies={onFilterMovies} setIsChecked={setIsChecked} setSearch={setSearch} />
      <MoviesCardList movies={moviesList} isLoading={isLoading} unwatchedFilms={unwatchedFilms} remainingFilmsToView={remainingFilmsToView} />
      <Footer />
    </main>
  )
}

export default Movies;
