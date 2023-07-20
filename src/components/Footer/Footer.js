import { Link } from 'react-router-dom';
import './Footer.css';

function Footer () {
  return (
    <footer className='footer'>
      <p className='footer__about-project'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <nav className='footer__nav'>
        <p className='footer__copy'>&#169; {new Date().getFullYear()}</p>
        <ul className='footer__links'>
          <li className='footer__link-item'>
            <Link className='footer__link' to="https://practicum.yandex.ru/" target="_blank">Яндекс.Практикум</Link>
          </li>
          <li className='footer__link-item'>
            <Link className='footer__link' to="https://github.com/NatalieSolts" target="_blank">Github</Link>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default Footer;
