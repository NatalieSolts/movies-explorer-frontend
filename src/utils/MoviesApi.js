export const urlServer = 'https://api.nomoreparties.co/';
const pathUrl = 'beatfilm-movies';
class MoviesApi {
  constructor(options) {
    this._server = options.urlServer;
  }

  _response (res) {
    return res.ok
      ? res.json()
      : Promise.reject(`Ошибка: ${res.status}`);
  }

  async _fetch (url, options = {}) {
    const res = await fetch(`${this._server}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
    });
    return this._response(res);
  }

  getAllMovies () {
    return this._fetch('/');
  }
}

export const allMoviesApi =
  new MoviesApi({
    urlServer: urlServer + pathUrl,
  });
