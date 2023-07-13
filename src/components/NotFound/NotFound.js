import { useNavigate } from 'react-router-dom';
import './NotFound.css';

function NotFound () {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(-1);
    }
    return (
        <main>
            <section className='notfound'>
                <h1 className='notfound__title'>404</h1>
                <p className='notfound__text'>Страница не найдена</p>
                <button onClick={handleClick} className='notfound__link-back' type='button'>Назад</button>
            </section >
        </main>
    )
}
export default NotFound
