import { useState } from 'react';
import './MoviesCard.css';
import LikeButton from '../LikeButton/LikeButton';
import DeleteButton from '../DeleteButton/DeleteButton';
import { Link } from 'react-router-dom';

function MoviesCard ({ movie, handleClickDelete }) {
  const { image, nameRU, duration, liked, link } = movie;
  const [isLiked, setIsliked] = useState(liked)

  function handleLikeButtonClick () {
    setIsliked(!isLiked)
  }

  function minutesLeft (min) {
    const hours = Math.floor(min / 60);
    const minutesRemainder = min % 60;
    const formattedTime = `${hours}ч ${minutesRemainder}м`;
    return formattedTime;
  }
  function handleClickMovieCard () {

  }
  return (
    <li className='movies-card'>
      <div className='movies-card__content'>
        <div className='movies-card__description'>
          <h2 className='movies-card__title'>{nameRU}</h2>
          <p className='movies-card__duration'>{minutesLeft(duration)}</p>
        </div>
        {handleClickDelete
          ? <DeleteButton handleClickDelete={() => handleClickDelete(movie)} />
          : <LikeButton isLiked={isLiked} handleLikeButtonClick={handleLikeButtonClick} />}
      </div>
      <Link to={link} target='_blank'><img src={image} alt={nameRU} className='movies-card__image' /></Link>
    </li>
  )
}

export default MoviesCard;
