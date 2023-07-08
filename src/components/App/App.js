import './App.css';
import { useState } from 'react';
import { useLocation, Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import Register from '../Register/Register'
import Login from '../Login/Login'
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';

function App () {
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname;
  const pathsToDisplayHeader = ['/', '/movies', '/saved-movies', '/profile'];
  const shouldDisplayHeader = pathsToDisplayHeader.includes(currentPath);

  const isMenuOpen = (value) => {
    setMenuOpened(value)
  }
  function handleRegister () {
  }
  function handleLogin () {
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App;
