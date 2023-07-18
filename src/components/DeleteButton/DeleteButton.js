import './DeleteButton.css';
function DeleteButton ({ onDislike }) {
    return (
        <button
            onClick={onDislike}
            type='button'
            className='delete-button'
        >&#215;</button>
    )
}
export default DeleteButton
