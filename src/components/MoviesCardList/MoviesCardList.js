import './MoviesCardList.css';
import Section from '../Section/Section';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { useEffect, useState } from 'react';

function MoviesCardList ({ movies, isLoading, unwatchedFilms, remainingFilmsToView, savedMoviesList, onLike, onDislike }) {
  const [arrayIdSavedMovies, setArrayIdSavedMovies] = useState([])
  useEffect(() => {
    const newArray = savedMoviesList.map((movie) => movie.movieId);
    setArrayIdSavedMovies(newArray)
  }, [savedMoviesList])

  useEffect(() => {
    remainingFilmsToView && remainingFilmsToView()
  }, [])
  return (
    <Section type="movies" >
      {movies.length ? (
        <ul className='movies-card-list'>
          {movies.map((movie) => {

            return (<MoviesCard
              movie={movie}
              key={movie.id ?
                movie.id : movie._id}
              onDislike={onDislike}
              onLike={onLike}
              liked={arrayIdSavedMovies.includes(movie.id)}
            />)
          })}
        </ul>
      ) : !isLoading ? <h3 className='movies-card-list__title'>Список фильмов пуст</h3> : ''}

      {isLoading ? <Preloader /> : ""}
      {unwatchedFilms?.length ?
        <button type='button' className='movies-card-list-button' onClick={remainingFilmsToView}        >
          Ещё
        </button> : ''}
    </Section>
  )
}

export default MoviesCardList;
