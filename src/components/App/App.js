// корневой компонент приложения
import { useState } from 'react';
import { useLocation, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login'
import Register from '../Register/Register'
import SignOut from '../SignOut/SignOut'
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Header from '../Header/Header';

function App () {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname;
  const pathsToDisplayHeader = ['/', '/movies', '/saved-movies', '/profile'];
  const shouldDisplayHeader = pathsToDisplayHeader.includes(currentPath);

  const isMenuOpen = (value) => {
    setMenuOpened(value)
  }
  const handleLogin = () => {
  }
  const handleRegister = () => {
  }
  return (
    <div className='page'>
      {shouldDisplayHeader && <Header menuOpened={menuOpened} isMenuOpen={isMenuOpen} />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/signup" element={<Register onRegister={handleRegister} isLoading={isLoading} />} />
        <Route path="/signin" element={<Login onLogin={handleLogin} isLoading={isLoading} />} />
        <Route path="/signout" element={<SignOut onLoggedIn={setLoggedIn} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App;
