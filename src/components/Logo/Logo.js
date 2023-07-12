import './Logo.css';
import { Link } from 'react-router-dom';
import logoImage from '../../images/logo.svg'

function Logo () {
    return (
        <Link className='logo' to='/' >
            <img src={logoImage} alt='логотип проекта' className='logo__img' />
        </Link>
    )
}
export default Logo
