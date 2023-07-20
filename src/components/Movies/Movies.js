import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { calcVisibleAndLoadMoreCards } from '../../utils/utils';

function Movies ({
  moviesList,
  savedMoviesList,
  isLoading,
  setIsChecked,
  setSearch,
  onLike,
  onDislike
}) {
  const [movies, setMovies] = useState([]);
  const unwatchedFilms = moviesList.slice(movies.length);
  const [loadMoreCount, setLoadMoreCount] = useState(null); //  количество выводимых доп.карточек
  const handledResizeData = calcVisibleAndLoadMoreCards();
  const [countCardsPerLoad, setCountCardsPerLoad] = useState(handledResizeData.countCardsPerLoad); //колво карточек при первой загрузке

  // при загрузке показываем не все фильмы
  useEffect(() => {
    setMovies(moviesList.slice(0, countCardsPerLoad))
  }, [moviesList])


  // при загрузке определяем сколько отображать карточек
  useEffect(() => {
    const { countCardsPerLoad, loadMoreCount } = calcVisibleAndLoadMoreCards();
    setCountCardsPerLoad(countCardsPerLoad);
    setLoadMoreCount(loadMoreCount);
    window.addEventListener('resize', handleResizeWindow);

    return () => window.removeEventListener('resize', handleResizeWindow);
  }, []);

  // обработка нажатия на кнопку еще
  function remainingFilmsToView () {
    setMovies([...movies, ...unwatchedFilms.slice(0, loadMoreCount)])
  }

  // функция следит за изменением ширины страницы с задержкой
  function handleResizeWindow () {
    setTimeout(() => {
      const { countCardsPerLoad, loadMoreCount } = calcVisibleAndLoadMoreCards();
      setCountCardsPerLoad(countCardsPerLoad);
      setLoadMoreCount(loadMoreCount);
    }, 100);
  }

  return (
    <>
      <SearchForm
        isLoading={isLoading}
        setIsChecked={setIsChecked}
        setSearch={setSearch}
        isSaveValuesInLocalStorage={true} />
      <MoviesCardList
        movies={movies}
        isLoading={isLoading}
        unwatchedFilms={unwatchedFilms}
        remainingFilmsToView={remainingFilmsToView}
        savedMoviesList={savedMoviesList}
        onLike={onLike}
        onDislike={onDislike}
      />
      <Footer />
    </>
  )
}

export default Movies;
