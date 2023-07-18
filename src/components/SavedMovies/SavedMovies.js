import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { initialFilmList } from '../../utils/initialFilmList.js';

const SavedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setMovies(initialFilmList.slice(0, 3));
    }, 1000)
    setIsLoading(true);
  }, [])
  function handleClickDelete (currentMovie) {
    setMovies(prevFilms => prevFilms.filter(film => JSON.stringify(film) !== JSON.stringify(currentMovie)));
  }
  return (
    <main>
      <SearchForm />
      <MoviesCardList movies={movies} isLoading={isLoading} handleClickDelete={handleClickDelete} />
      <div className='main__element-gap'></div>
      <Footer />
    </main>
  )
}

export default SavedMovies;
