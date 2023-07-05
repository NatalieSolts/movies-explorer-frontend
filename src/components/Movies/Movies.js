import './Movies.css';
import { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { initialFilmList } from '../../utils/initialFilmList';

function Movies () {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const unwatchedFilms = initialFilmList.slice(films.length);

  function remainingFilmsToView () {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setFilms([...films, ...unwatchedFilms.slice(0, 8)])
    }, 1500)
  }

  return (
    <>
      <SearchForm />
      <MoviesCardList films={films} isLoading={isLoading} unwatchedFilms={unwatchedFilms} remainingFilmsToView={remainingFilmsToView} />
      <Footer />
    </>
  )
}

export default Movies;
