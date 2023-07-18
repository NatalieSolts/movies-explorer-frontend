import './LikeButton.css';

function LikeButton ({ isLiked, handleLikeButtonClick }) {
    return (
        <button
            type='button'
            title={`${isLiked ? 'Удалить из списка сохраненных' : 'Добавить в сохраненные'}`}
            onClick={handleLikeButtonClick}
            className={`like-button${isLiked ? ' like-button_active' : ''}`}
        ></button>
    )
}
export default LikeButton
