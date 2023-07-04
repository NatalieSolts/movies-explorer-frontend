import './MoviesCardList.css';
import Section from '../Section/Section';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { useEffect, useState } from 'react';

function MoviesCardList ({ films, isLoading, remainingFilms, viewStillFilms, handleClickDeleteButton }) {

  useEffect(() => {
    viewStillFilms && viewStillFilms()
  }, [])

  return (
    <Section type="movies" >
      {films.length ? (
        <ul className='movies-card-list'>
          {films.map((movie, index) => <MoviesCard movie={movie} key={index} handleClickDeleteButton={handleClickDeleteButton} />)}
        </ul>
      ) : !isLoading ? <h3>Список фильмов пуст</h3> : ''}

      {isLoading ? <Preloader /> : ""}
      {remainingFilms?.length ? <button className='movies-card-list-btn' onClick={viewStillFilms}>Ещё</button> : ''}
    </Section>
  )
}

export default MoviesCardList;
