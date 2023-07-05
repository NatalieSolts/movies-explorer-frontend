import './MoviesCardList.css';
import Section from '../Section/Section';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { useEffect, useState } from 'react';

function MoviesCardList ({ films, isLoading, unwatchedFilms, remainingFilmsToView, handleClickDelete }) {

  useEffect(() => {
    remainingFilmsToView && remainingFilmsToView()
  }, [])

  return (
    <Section type="movies" >
      {films.length ? (
        <ul className='movies-card-list'>
          {films.map((movie, index) => <MoviesCard movie={movie} key={index} handleClickDelete={handleClickDelete} />)}
        </ul>
      ) : !isLoading ? <h3 className='movies-card-list__title'>Список фильмов пуст</h3> : ''}

      {isLoading ? <Preloader /> : ""}
      {unwatchedFilms?.length ?
        <button
          className='movies-card-list-button'
          onClick={remainingFilmsToView}
        >
          Ещё
        </button> : ''}
    </Section>
  )
}

export default MoviesCardList;
