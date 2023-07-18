import './LikeButton.css';

function LikeButton ({ isLiked, onLike, onDislike }) {
    return (
        <button
            type='button'
            title={`${isLiked ? 'Удалить из списка сохраненных' : 'Добавить в сохраненные'}`}
            onClick={isLiked ? onDislike : onLike}
            className={`like-button${isLiked ? ' like-button_active' : ''}`}
        ></button>
    )
}
export default LikeButton
