import './LikeButton.css';

function LikeButton ({ isLiked, handleLikeButtonClick }) {
    return (
        <button
            type='button'
            className={`like-button${isLiked ? ' like-button_active' : ''}`}
            onClick={handleLikeButtonClick}
            title={`${isLiked ? 'Удалить из списка сохраненных' : 'Добавить в сохраненные'}`}
        ></button>
    )
}
export default LikeButton
