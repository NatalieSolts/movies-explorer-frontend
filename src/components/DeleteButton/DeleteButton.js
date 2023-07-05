import './DeleteButton.css';
function DeleteButton ({ handleClickDelete }) {
    return (
        <button
            onClick={handleClickDelete}
            type='button'
            className='delete-button'
        >&#215;</button>
    )
}
export default DeleteButton
