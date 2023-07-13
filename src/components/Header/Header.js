import './Header.css';
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

function Header (props) {
  const { menuOpened, isMenuOpen } = props;
  const navigate = useNavigate();
  function handleClickMenu () {
    isMenuOpen(!menuOpened)
  }
  function handleCloseMenu () {
    isMenuOpen(false)
  }
  function handleClickRegister () {
    navigate('/signup', { replace: true });
  }
  function handleClickLogin () {
    navigate('/signin', { replace: true });
  }
  const setLinkClass = (navLink) =>
    navLink.isActive
      ? 'header__link header__link_medium'
      : 'header__link';
  const setLinkClassTypeAccount = (navLink) =>
    navLink.isActive
      ? 'header__link header__link_account header__link_medium'
      : 'header__link header__link_account';

  return (
    <header className='header'>
      <Routes>
        {/* ГЛАВНАЯ */}
        <Route path="/" element={
          <>
            <Logo />
            <nav className='header__links'>
              <button type='button' onClick={handleClickRegister} to="/signup" className='header__link header__link_no-auth'>Регистрация</button>
              <button type='button' onClick={handleClickLogin} to="/signin" className='header__link header__link_no-auth header__link_type_button'>Войти</button>
            </nav>
          </>
        } />
        {/* ОСТАЛЬНОЕ */}
        <Route path="*" element={
          <>
            <nav className='header__links header__links_hidden_mob'>
              <Logo />
              <NavLink to="/movies" className={setLinkClass}>Фильмы</NavLink>
              <NavLink to="/saved-movies" className={setLinkClass}>Сохранённые фильмы</NavLink>
            </nav>
            <nav className='header__links header__links_hidden_mob'>
              <NavLink to="/profile" className={setLinkClassTypeAccount}>Аккаунт
              </NavLink>
            </nav>
            <nav className='header__links header__links_hidden_comp'>
              <Logo />
              <button type='button' className={`header__btn-menu ${menuOpened ? 'header__btn-menu_close' : ''}`} onClick={handleClickMenu}>
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
