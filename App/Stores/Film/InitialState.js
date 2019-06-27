/**
 * The initial values for the redux state.
 */
export const INITIAL_STATE = {
  films: [],
  filmsIsLoading: false,
  filmsErrorMessage: null,
  page: 1,
  totalPages: 0,
  currentFilmDetails: {},
  detailsLoading: false,
  detailsErrorMessage: null,
  favouriteFilms: [],
  // favouriteFilmId: -1,
}
