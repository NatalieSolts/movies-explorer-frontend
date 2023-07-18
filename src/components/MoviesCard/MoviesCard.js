import { useState } from 'react';
import './MoviesCard.css';
import LikeButton from '../LikeButton/LikeButton';
import DeleteButton from '../DeleteButton/DeleteButton';
import { urlServer } from '../../utils/MoviesApi';

function MoviesCard ({
  movie,
  liked,
  onLike,
  onDislike
}) {
  const { image, nameRU, duration, trailerLink } = movie;
  const imageUrl = image.length ? image : `${urlServer}${image.url}`;
  const id = movie.movieId
    ? movie.movieId
    : movie.id;

  function handleLikeButtonClick () {
    onLike(movie)
  }
  function handleDislikeButtonClick () {
    onDislike(id)
  }

  // переводим минуты в ч:мин
  function minutesLeft (min) {
    const hours = Math.floor(min / 60);
    const minutesRemainder = min % 60;
    const formattedTime = `${hours}ч ${minutesRemainder}м`;
    return formattedTime;
  }

  // переход по ссылке на трейлер
  function handleClickMovieCard () {
    window.open(trailerLink, '_blank');
  }
  return (
    <li className='movies-card'>
      <div className='movies-card__content'>
        <div className='movies-card__description'>
          <h2 className='movies-card__title'>{nameRU}</h2>
          <p className='movies-card__duration'>{minutesLeft(duration)}</p>
        </div>
        {onLike
          ? <LikeButton isLiked={liked} onLike={handleLikeButtonClick} onDislike={handleDislikeButtonClick} />
          : <DeleteButton onDislike={handleDislikeButtonClick} />}
      </div>
      <img src={imageUrl} alt={nameRU} className='movies-card__image' onClick={handleClickMovieCard} />
    </li>
  )
}

export default MoviesCard;
