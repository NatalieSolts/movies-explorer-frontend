import { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { initialFilmList } from '../../utils/initialFilmList';

function Movies () {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const unwatchedFilms = initialFilmList.slice(movies.length);

  function remainingFilmsToView () {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setMovies([...movies, ...unwatchedFilms.slice(0, 12)])
    }, 500)
  }

  return (
    <main>
      <SearchForm />
      <MoviesCardList movies={movies} isLoading={isLoading} unwatchedFilms={unwatchedFilms} remainingFilmsToView={remainingFilmsToView} />
      <Footer />
    </main>
  )
}

export default Movies;
