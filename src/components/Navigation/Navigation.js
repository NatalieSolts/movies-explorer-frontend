import { NavLink, Link } from 'react-router-dom';
import './Navigation.css';

function Navigation ({ menuOpened, onClose }) {

  function getNavLinkClassName (navLinkData) {
    if (navLinkData.isActive) {
      return 'navigation__link navigation__link_active';
    } else {
      return 'navigation__link';
    }
  }
  function handleClickCloseByOverlay (event) {
    if (event.target.classList.contains('navigation_displayed')) {
      onClose();
    }
  };

  return (
    <div className={`navigation ${menuOpened ? 'navigation_displayed' : ''}`} onClick={handleClickCloseByOverlay} >
      <nav className={`navigation__inner ${menuOpened ? 'navigation__inner_displayed' : ''}`}>
        <ul className='navigation__links'>
          <li>
            <NavLink className={getNavLinkClassName} to='/' onClick={onClose}>
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink className={getNavLinkClassName} to='/movies' onClick={onClose}>
              Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink className={getNavLinkClassName} to='/saved-movies' onClick={onClose}>
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <Link className='navigation__link navigation__link_type_with-icon' to='/profile' onClick={onClose}>
          Аккаунт
        </Link>
      </nav>
    </div>
  )
};

export default Navigation;
