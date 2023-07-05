// компонент страницы с сохранёнными карточками фильмов
import './SavedMovies.css';
import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { initialFilmList } from '../../utils/initialFilmList.js';

const SavedMovies = () => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setFilms(initialFilmList.slice(0, 2));
    }, 2000)

  }, [])
  function handleClickDelete (currentMovie) {
    setFilms(
      films.filter((film) => JSON.stringify(film) !== JSON.stringify(currentMovie))
    )
  }
  return (
    <>
      <SearchForm />
      <MoviesCardList films={films} isLoading={isLoading} handleClickDelete={handleClickDelete} />
      <Footer />
    </>
  )
}

export default SavedMovies;
