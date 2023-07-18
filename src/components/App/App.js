import './App.css';
import { useEffect, useState } from 'react';
import { useLocation, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
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
  deleteMovie,
  login,
  register,
  checkToken,
  editProfile
} from '../../utils/MainApi';
import { allMoviesApi, urlServer } from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { DURATION_SHORTS } from '../../utils/constants';

function App () {
  const [isLoading, setIsLoading] = useState(true); // состояние загрузки
  const [loggedIn, setLoggedIn] = useState(false); // состояние успешной авторизации
  const [menuOpened, setMenuOpened] = useState(false); // состояние открытия меню
  const [isNotifyPopupOpen, setIsNotifyPopupOpen] = useState(false); // состояние открытия попапа
  const [statusCompleted, setStatusCompleted] = useState(true); // статус операции обращения к серверу
  const [currentUser, setСurrentUser] = useState({ name: '', email: '', }); // данные текушего пользователя
  const [moviesList, setMoviesList] = useState([]); // список всех фильмов
  const [savedMoviesList, setSavedMoviesList] = useState([]); // массив сохраненных фильмов
  const [filteredSavedMoviesList, setFilteredSavedMoviesList] = useState([]); // массив сохранненых отфильтрованных фильмов
  const [isCheckedFilterBoxMovies, setIsCheckedFilterBoxMovies] = useState(null); // статус кнопки "короткометражки" для всех фильмов
  const [searchTextMovies, setSearchTextMovies] = useState(null); // текст запроса формы поиска среди всех фильмов
  const [isCheckedFilterBoxSavedMovies, setIsCheckedFilterBoxSavedMovies] = useState(null); // статус кнопки "короткометражки" для сохраненных фильмов
  const [searchTextSavedMovies, setSearchTextSavedMovies] = useState(null); // текст запроса формы поиска среди сохраненных фильмов

  const navigate = useNavigate();
  const location = useLocation();
  // текущий адрес
  const currentPath = location.pathname;
  // обработка показа блока хедер только на определенных страницах
  const pathsToDisplayHeader = ['/', '/movies', '/saved-movies', '/profile'];
  const shouldDisplayHeader = pathsToDisplayHeader.includes(currentPath);

  // обработка нажатия на кнопку бургер
  const isMenuOpen = (value) => {
    setMenuOpened(value)
  }

  // обработка вывода ошибки пользователю
  function handleError (err) {
    setStatusCompleted(err.message || 'Ошибка! Что-то пошло не так');
    setIsNotifyPopupOpen(true);
    console.log(err);
  }

  // общая функция для входа и регистрации
  async function handleAuth (email, password, name, authFunction) {
    try {
      setIsLoading(true);
      const data = await authFunction(email, password, name);
      if (data.token) {
        localStorage.setItem('token', data.token);
        setLoggedIn(true);
        const { email, name } = data;
        setСurrentUser({ email, name });
        navigate('/movies');
      } else {
        throw new Error('Ошибка! Что-то пошло не так');
      }
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  }

  // вход
  function handleLogin (email, password) {
    handleAuth(email, password, null, login);
  }

  // регистрация
  function handleRegister ({ email, password, name }) {
    handleAuth(email, password, name, register);
  }
  // выход из аккаунта
  function handleSignOut () {
    localStorage.clear();
    setLoggedIn(false);
    setStatusCompleted(`Вы успешно вышли!`);
    setСurrentUser({ data: {} });
    setIsNotifyPopupOpen(true);
    navigate('/');
  }

  // изменение профиля
  async function handleEditProfile (email, name) {
    try {
      setIsLoading(true);
      const data = await editProfile({ email, name });
      const { email: updatedEmail, name: updatedName } = data;
      setСurrentUser({ email: updatedEmail, name: updatedName });
      setIsNotifyPopupOpen(true);
      setStatusCompleted('Данные успешно обновлены!');
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  }

  // при авторизации отправляем в ту же папку, откуда был изначальный запрос
  useEffect(() => {
    if (loggedIn) {
      navigate(currentPath, { replace: true });
    }
  }, [loggedIn]);

  // если не авторизован и есть токен, проверяем его и проставляем данные пользователя
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!loggedIn && token) {
      setIsLoading(true);
      try {
        const checkTokenAsync = async () => {
          const data = await checkToken();
          setLoggedIn(true);
          const { email, name } = data;
          setСurrentUser({ email, name });
          navigate(currentPath, { replace: true });
        };
        checkTokenAsync();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    else {
      setIsLoading(false);
    }
  }, []);

  // фильтрация массива фильмов
  const filterMoviesList = (moviesData, userRequest, isCheckedFilterBox) => {
    const foundMovies = moviesData.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(userRequest ? userRequest.toLowerCase() : '') ||
        movie.nameEN.toLowerCase().includes(userRequest ? userRequest.toLowerCase() : ''),
    );
    return isCheckedFilterBox
      ? foundMovies.filter((movie) => movie.duration <= DURATION_SHORTS)
      : foundMovies;
  }

  // загрузка основного массива фильмов (из хранилища если есть)
  const getMoviesData = async () => {
    const userRequest = searchTextMovies ? searchTextMovies : localStorage.getItem('search');
    const isCheckedLS = localStorage.getItem('filterCheckbox')
      ? localStorage.getItem('filterCheckbox') === 'true'
      : null;
    const isCheckedFilterBox = isCheckedFilterBoxMovies === isCheckedLS ? isCheckedFilterBoxMovies : isCheckedLS;
    if (!userRequest) {
      setMoviesList([]);
      return;
    }
    try {
      setIsLoading(true);
      const moviesInLS = localStorage.getItem('movies');
      const moviesData = moviesInLS ? JSON.parse(moviesInLS) : await allMoviesApi.getAllMovies();
      localStorage.setItem('movies', JSON.stringify(moviesData));
      const newMoviesList = filterMoviesList(moviesData, userRequest, isCheckedFilterBox);
      setMoviesList(newMoviesList);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // загрузка списка сохраненных фильмов
  const getSavedMoviesData = async () => {
    try {
      const savedMoviesInLS = localStorage.getItem('savedMovies');
      const savedMoviesData = savedMoviesInLS === JSON.stringify(savedMoviesList) ? JSON.parse(savedMoviesInLS) : await getSavedMovies();
      localStorage.setItem('savedMovies', JSON.stringify(savedMoviesData));
      setSavedMoviesList(savedMoviesData);
      const filteredSavedMoviesList = filterMoviesList(savedMoviesData, searchTextSavedMovies, isCheckedFilterBoxSavedMovies);
      setFilteredSavedMoviesList(filteredSavedMoviesList);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  // при изменении запроса запускаем функцию по обновлению списка фильмов
  useEffect(() => {
    if (loggedIn) {
      getMoviesData();
    }
  }, [isCheckedFilterBoxMovies, searchTextMovies]);

  useEffect(() => {
    if (loggedIn) {
      getSavedMoviesData();
    }
  }, [isCheckedFilterBoxSavedMovies, searchTextSavedMovies]);

  // при первом запуске запускаем загрузку
  useEffect(() => {
    if (loggedIn) {
      getMoviesData();
      getSavedMoviesData();
    }
  }, [loggedIn]);

  // установка лайка
  async function handleLike (movie) {
    const {
      country,
      description,
      director,
      duration,
      nameEN,
      nameRU,
      trailerLink,
      year
    } = movie;
    const movieId = movie.id;
    const image = urlServer + movie.image.url;
    const thumbnail = urlServer + movie.image.previewUrl;

    const newMovie = {
      country,
      description,
      director,
      duration,
      nameEN,
      nameRU,
      trailerLink,
      year,
      movieId,
      image,
      thumbnail
    }
    try {
      const response = await createMovie(newMovie);
      const newArraySavedMoviesList = [...savedMoviesList, response];
      setSavedMoviesList(newArraySavedMoviesList)
      localStorage.setItem('savedMovies', JSON.stringify(newArraySavedMoviesList));
    } catch (err) {
      console.log(err);
    } finally {
    }
  }

  // удаление лайка
  async function handleDislike (movieId) {
    const findedMovie = savedMoviesList.find(movie => movie.movieId === movieId);
    try {
      const response = await deleteMovie(findedMovie._id);
      console.log(response._id);
      console.log(savedMoviesList.find((movie) => movie._id === response._id));
      const newArraySavedMoviesList = savedMoviesList.filter((movie) => movie._id !== response._id);
      console.log(newArraySavedMoviesList);
      setSavedMoviesList(newArraySavedMoviesList)
      localStorage.setItem('savedMovies', JSON.stringify(newArraySavedMoviesList));

    } catch (err) {
      console.log(err);
    } finally {
    }
  }
  useEffect(() => {
    const filteredSavedMoviesList = filterMoviesList(savedMoviesList, searchTextSavedMovies, isCheckedFilterBoxSavedMovies);
    setFilteredSavedMoviesList(filteredSavedMoviesList);
  }, [savedMoviesList]);

  // если идет процесс загрузки, то показываем прелоадер
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
          <Route path="/profile" element={
            <ProtectedRoute element={Profile}
              loggedIn={loggedIn}
              onEditProfile={handleEditProfile}
              isLoading={isLoading}
              onSignOut={handleSignOut}
            />
          }
          />
          <Route path="/movies" element={
            <ProtectedRoute element={Movies}
              loggedIn={loggedIn}
              setIsChecked={setIsCheckedFilterBoxMovies}
              setSearch={setSearchTextMovies}
              moviesList={moviesList}
              savedMoviesList={savedMoviesList}
              isLoading={isLoading}
              onLike={handleLike}
              onDislike={handleDislike}
            />
          }
          />
          <Route path="/saved-movies" element={
            <ProtectedRoute element={SavedMovies}
              loggedIn={loggedIn}
              moviesList={filteredSavedMoviesList}
              setSearch={setSearchTextSavedMovies}
              setIsChecked={setIsCheckedFilterBoxSavedMovies}
              savedMoviesList={savedMoviesList}
              isLoading={isLoading}
              onDislike={handleDislike}
            />
          }
          />
          <Route path="/signup" element={
            loggedIn
              ? <Navigate to="/" />
              :
              <Register
                onRegister={handleRegister}
                isLoading={isLoading}
              />
          }
          />
          <Route path="/signin" element={
            loggedIn
              ? <Navigate to="/" />
              :
              <Login
                onSubmit={handleLogin}
                isLoading={isLoading}
              />
          }
          />
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
