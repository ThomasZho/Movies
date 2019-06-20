/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

// import { INITIAL_STATE } from './InitialState'
// import { createReducer } from 'reduxsauce'
// import { ExampleTypes } from './Actions'

// export const fetchUserLoading = (state) => ({
//   ...state,
//   userIsLoading: true,
//   userErrorMessage: null,
// })

// export const fetchUserSuccess = (state, { user }) => ({
//   ...state,
//   user: user,
//   userIsLoading: false,
//   userErrorMessage: null,
// })

// export const fetchUserFailure = (state, { errorMessage }) => ({
//   ...state,
//   user: {},
//   userIsLoading: false,
//   userErrorMessage: errorMessage,
// })

// /**
//  * @see https://github.com/infinitered/reduxsauce#createreducer
//  */
// export const reducer = createReducer(INITIAL_STATE, {
//   [ExampleTypes.FETCH_USER_LOADING]: fetchUserLoading,
//   [ExampleTypes.FETCH_USER_SUCCESS]: fetchUserSuccess,
//   [ExampleTypes.FETCH_USER_FAILURE]: fetchUserFailure,
// })

const initialState = { favoritesFilm: [] }

function toggleFavorite(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const favoriteFilmIndex = state.favoritesFilm.findIndex((item) => item.id === action.value.id)
      //
      if (favoriteFilmIndex !== -1) {
        nextState = {
          ...state,
          favoritesFilm: state.favoritesFilm.filter((item, index) => index !== favoriteFilmIndex),
        }
      } else {
        nextState = {
          ...state,
          favoritesFilm: [...state.favoritesFilm, action.value],
        }
      }
      return nextState || state //renvoie l'objet  nextState  si celui-ci n'est pas undefined, sinon on renvoie l'objet  state . sécurité  : immuable
    default:
      return state
  }
}

export default toggleFavorite
