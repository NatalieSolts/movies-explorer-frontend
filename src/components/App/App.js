import './App.css';
import { useEffect, useState } from 'react';
import { useLocation, Route, Routes, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Register from '../Register/Register'
import Login from '../Login/Login'
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import {
  getSavedMovies,
  createMovie,
  getDeleteMovie,
  authorize,
  register,
  checkToken,
  editProfile
} from '../../utils/MainApi';
import { allMoviesApi } from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';
import InfoTooltip from "../InfoTooltip/InfoTooltip";

function App () {
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [isNotifyPopupOpen, setIsNotifyPopupOpen] = useState(false);
  const [statusCompleted, setStatusCompleted] = useState(true);
  const [currentUser, setСurrentUser] = useState({ name: '', email: '', });
  const [moviesList, setMoviesList] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [isChecked, setIsChecked] = useState(null);
  const [search, setSearch] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const pathsToDisplayHeader = ['/', '/movies', '/saved-movies', '/profile'];
  const shouldDisplayHeader = pathsToDisplayHeader.includes(currentPath);

  const isMenuOpen = (value) => {
    setMenuOpened(value)
  }
  function handleError (err) {
    setStatusCompleted(err.message || 'Ошибка! Что-то пошло не так');
    setIsNotifyPopupOpen(true);
    console.log(err);
  }
  function handleAuth (email, password, name, authFunction) {
    setIsLoading(true);
    authFunction(email, password, name)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          const { email, name } = data;
          setСurrentUser({ email, name });
          navigate('/movies');
        } else {
          throw new Error('Ошибка! Что-то пошло не так');
        }
      })
      .catch((err) => {
        handleError(err)
      })
      .finally(() => setIsLoading(false));
  }

  function handleLogin (email, password) {
    console.log(email, password);
    handleAuth(email, password, null, authorize);
  }

  function handleRegister ({ email, password, name }) {
    handleAuth(email, password, name, register);
  }
  function handleEditProfile (email, name) {
    setIsLoading(true);
    editProfile({ email, name })
      .then((data) => {
        const { email, name } = data;
        setСurrentUser({ email, name });
        setIsNotifyPopupOpen(true);
        setStatusCompleted('Данные успешно обновлены!');
      })
      .catch((err) => {
        handleError(err)
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    if (loggedIn) {
      navigate('/movies', { replace: true });
    }
  }, [loggedIn]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    loggedIn === false && token && setIsLoading(true);
    loggedIn === false &&
      token &&
      checkToken()
        .then((data) => {
          setLoggedIn(true);
          const { email, name } = data;
          setСurrentUser({ email, name });
          navigate(currentPath, { replace: true });
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => setIsLoading(false));
  }, [loggedIn]);
  const getMoviesData = async () => {
    console.log(search, isChecked);
    const userRequest = search ? search : localStorage.getItem('search');
    const isCheckedLS = localStorage.getItem('filterCheckbox')
      ? localStorage.getItem('filterCheckbox') === 'true'
      : null;
    const isCheckedFilterBox = isChecked === isCheckedLS ? isChecked : isCheckedLS;
    if (!userRequest) {
      setMoviesList([]);
      return;
    }
    try {
      setIsLoading(true);
      const moviesInLS = localStorage.getItem('movies');
      const moviesData = moviesInLS ? JSON.parse(moviesInLS) : await allMoviesApi.getAllMovies();
      localStorage.setItem('movies', JSON.stringify(moviesData));
      const foundMovies = moviesData.filter(
        (movie) =>
          movie.nameRU.toLowerCase().includes(userRequest.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(userRequest.toLowerCase()),
      );

      // newMoviesList обновленный массив с учетом фильтрафии по чекбоксу
      const newMoviesList = isCheckedFilterBox
        ? foundMovies.filter((movie) => movie.duration <= 40)
        : foundMovies;
      // setFilteredMoviesList(newMoviesList); // список отфильтрованных фильмов
      setMoviesList(newMoviesList); //
      console.log(newMoviesList);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getMoviesData();
  }, [isChecked, search]);
  useEffect(() => {
    getMoviesData();
  }, []);

  useEffect(() => {
    const getMoviesData = async () => {
      try {
        const moviesData = await getSavedMovies();

        setSavedMoviesList(moviesData);
      } catch (err) {
        console.log(err);
      }
    };

    getMoviesData();

    return () => {
      setSavedMoviesList([]);
    };
  }, []);
  if (isLoading) return <Preloader />;

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        {shouldDisplayHeader &&
          <Header
            menuOpened={menuOpened}
            isMenuOpen={isMenuOpen}
            loggedIn={loggedIn}
          />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/profile" element={<Profile onEditProfile={handleEditProfile} isLoading={isLoading} />} />
          <Route path="/movies" element={<Movies onFilterMovies={getMoviesData}
            setIsChecked={setIsChecked}
            setSearch={setSearch}
            moviesList={moviesList}
            savedMoviesList={savedMoviesList} />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/signup" element={<Register onRegister={handleRegister} isLoading={isLoading} />} />
          <Route path="/signin" element={<Login onSubmit={handleLogin} isLoading={isLoading} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <InfoTooltip
          name="notify"
          isOpen={isNotifyPopupOpen}
          setPopupOpened={setIsNotifyPopupOpen}
          statusMessage={statusCompleted}
        />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
