import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg'
import './Logo.css';

function Logo () {
    return (
        <Link className='logo' to='/' >
            <img src={logo} alt='logo image' className='logo__img' />
        </Link>
    )
}
export default Logo
