import { put, call, all } from 'redux-saga/effects'
import FilmActions from 'App/Stores/Film/Actions'
import { filmService } from 'App/Services/FilmService.js'
import NavigationService from 'App/Services/NavigationService'
/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user informations.
 * Feel free to remove it.
 */
export function* searchFilms({ title, page }) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(FilmActions.fetchFilmsLoading())
  //lancer l'action
  // Fetch user informations from an API
  console.log('Saga searchFilms page de la recherche', page)

  const films = yield call(filmService.getFilmsFromApiWithSearchedText, title, page) //lancer requete

  //fetch images
  // films.results = yield* films.results.map(function*(film) {
  //   console.log(film.poster_path)
  //   if (film.poster_path !== null) {
  //     const imageSource = yield call(filmService.getImageFromApi, film.poster_path)
  //     if (imageSource) {
  //       film = { ...film, imageSource: imageSource }
  //       console.log('====================================')
  //       console.log(imageSource)
  //       console.log('====================================')
  //     }
  //   }
  //   return film
  // })
  if (films) {
    yield put(FilmActions.fetchFilmsSuccess(films))
  } else {
    yield put(
      FilmActions.fetchFilmsFailure('There was an error while fetching films informations.')
    )
  }
}
export function* getFilmDetails({ id }) {
  yield put(FilmActions.fetchDetailsLoading())
  const details = yield call(filmService.getFilmDetailFromApi, id)
  if (details) {
    yield put(FilmActions.fetchDetailsSuccess(details))
    NavigationService.navigate('uneAutreVue')
  } else {
    yield put(FilmActions.fetchDetailsFailure('There was an error while fetching film details'))
  }
}

// export function* toggleFavourite({ favouriteFilms }, { id }) {
export function* toggleFavourite({ favouriteFilms, film }) {
  if (favouriteFilms.find((item) => item.id === film.id)) {
    // yield put(FilmActions.toggleFavourite(filmToFavourite))
    favouriteFilms = favouriteFilms.filter((item) => item.id !== film.id)
    yield put(FilmActions.deleteFromFavourite(favouriteFilms))
  } else {
    // yield put(FilmActions.toggleFavourite(filmToFavourite))
    yield put(FilmActions.addToFavourite(film))
  }

  //Autre possibilité 1
  // if (favouriteFilms.find((item) => item.id === film.id)) {
  //   favouriteFilms = favouriteFilms.filter((item) => item.id !== film.id)
  // } else {
  //   favouriteFilms.push(film)
  // }
  // On met à jour les films mis en favoris
  // yield put(FilmActions.toggleFavourite(favouriteFilms));
}
