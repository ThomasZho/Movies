/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { FilmsTypes } from './Actions'

export const fetchFilmsLoading = (state) => ({
  ...state,
  filmsIsLoading: true,
  filmsErrorMessage: null,
})

export const fetchFilmsSuccess = (state, { films }) => {
  // console.log('Reducers : fetchFilmsSuccess state films', state, films)
  return {
    ...state,
    films: state.films.concat(films.results),
    filmsIsLoading: false,
    filmsErrorMessage: null,
    page: films.page,
    totalPages: films.total_pages,
  }
}

export const fetchFilmsFailure = (state, { errorMessage }) => ({
  ...state,
  films: [],
  filmsIsLoading: false,
  filmsErrorMessage: errorMessage,
})

export const resetFilms = (state) => ({
  ...state,
  films: [],
  page: 1,
  totalPages: 0,
})

export const fetchDetailsLoading = (state) => ({
  ...state,
  detailsLoading: true,
  detailsErrorMessage: null,
})
export const fetchDetailsFailure = (state, { errorMessage }) => ({
  ...state,
  detailsLoading: false,
  detailsErrorMessage: errorMessage,
})

export const fetchDetailsSuccess = (state, { details }) => ({
  ...state,
  currentFilmDetails: details,
  detailsLoading: false,
  detailsErrorMessage: null,
})

// export const toggleFavourite = (state, { film }) => ({
//   ...state,
//   favouriteFilms: [...favouriteFilms, film],
// })

export const addToFavourite = (state, { film }) => ({
  ...state,
  favouriteFilms: [...state.favouriteFilms, film],
})

export const deleteFromFavourite = (state, { favouriteFilms }) => ({
  ...state,
  favouriteFilms: favouriteFilms,
})

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [FilmsTypes.FETCH_FILMS_LOADING]: fetchFilmsLoading,
  [FilmsTypes.FETCH_FILMS_SUCCESS]: fetchFilmsSuccess,
  [FilmsTypes.FETCH_FILMS_FAILURE]: fetchFilmsFailure,

  [FilmsTypes.RESET_FILMS]: resetFilms,

  [FilmsTypes.FETCH_DETAILS_LOADING]: fetchDetailsLoading,
  [FilmsTypes.FETCH_DETAILS_SUCCESS]: fetchDetailsSuccess,
  [FilmsTypes.FETCH_DETAILS_FAILURE]: fetchDetailsFailure,

  // [FilmTypes.TOGGLE_FAVOURITE]: toggleFavourite,
  [FilmsTypes.ADD_TO_FAVOURITE]: addToFavourite,
  [FilmsTypes.DELETE_FROM_FAVOURITE]: deleteFromFavourite,
})
