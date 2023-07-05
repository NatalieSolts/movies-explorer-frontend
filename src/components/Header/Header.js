import './Header.css';
import { Link, Route, Routes } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

function Header (props) {
  const { menuOpened, isMenuOpen } = props;
  function handleClickMenu () {
    isMenuOpen(!menuOpened)
  }
  function handleCloseMenu () {
    isMenuOpen(false)
  }
  return (
    <header className='header'>
      <Routes>
        {/* ГЛАВНАЯ */}
        <Route path="/" element={
          <>
            <Logo />
            <nav className='header__links'>
              <Link to="/signup" className='header__link header__link_no-auth'>Регистрация</Link>
              <Link to="/signin" className='header__link header__link_no-auth header__link_type_button'>Войти</Link>
            </nav>
          </>
        } />
        {/* ОСТАЛЬНОЕ */}
        <Route path="*" element={
          <>
            <nav className='header__links header__links_hidden_mob'>
              <Logo />
              <Link to="/movies" className='header__link'>Фильмы</Link>
              <Link to="/saved-movies" className='header__link header__link_medium'>Сохранённые фильмы</Link>
            </nav>
            <nav className='header__links header__links_hidden_mob'>
              <Link to="/profile" className='header__link header__link_account'>Аккаунт
              </Link>
            </nav>
            <nav className='header__links header__links_hidden_comp'>
              <Logo />
              <button className={`header__btn-menu ${menuOpened ? 'header__btn-menu_close' : ''}`} onClick={handleClickMenu}>
              </button>
            </nav>
            <Navigation menuOpened={menuOpened} onClose={handleCloseMenu} />
          </>
        } />
      </Routes>
    </header>
  )
}

export default Header;
