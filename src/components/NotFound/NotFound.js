import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(-1);
    }
    return (
        <section className='notfound'>
            <h1 className='notfound__title'>404</h1>
            <p className='notfound__text'>Страница не найдена</p>
            <button onClick={handleClick} className='notfound__link-back'>Назад</button>
        </section >
    )
}
export default NotFound
