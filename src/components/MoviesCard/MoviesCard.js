import { useState } from 'react';
import './MoviesCard.css';
import LikeButton from '../LikeButton/LikeButton';
import DeleteButton from '../DeleteButton/DeleteButton';

function MoviesCard ({ movie, handleClickDelete }) {
  const { image, nameRU, duration, liked } = movie;
  const [isLiked, setIsliked] = useState(liked)

  function handleLikeButtonClick () {
    setIsliked(!isLiked)
  }

  function minutesLeft (min) {
    console.log(min);
    const hours = Math.floor(min / 60);
    const minutesRemainder = min % 60;
    const formattedTime = `${hours}ч ${minutesRemainder}м`;
    return formattedTime;
  }

  return (
    <li className='movies-card'>
      <img src={image} alt={nameRU} className='movies-card__image' />
      <div className='movies-card__description'>
        <h4 className='movies-card__title'>{nameRU}</h4>
        {handleClickDelete
          ? <DeleteButton handleClickDelete={() => handleClickDelete(movie)} />
          : <LikeButton isLiked={isLiked} handleLikeButtonClick={handleLikeButtonClick} />}
      </div>
      <p className='movies-card__duration'>{minutesLeft(duration)}</p>
    </li>
  )
}

export default MoviesCard;
