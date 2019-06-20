import { createActions } from 'reduxsauce'

/**
 * We use reduxsauce's `createActions()` helper to easily create redux actions.
 *
 * Keys are action names and values are the list of parameters for the given action.
 *
 * Action names are turned to SNAKE_CASE into the `Types` variable. This can be used
 * to listen to actions:
 *
 * - to trigger reducers to update the state, for example in App/Stores/Example/Reducers.js
 * - to trigger sagas, for example in App/Sagas/index.js
 *
 * Actions can be dispatched:
 *
 * - in React components using `dispatch(...)`, for example in App/App.js
 * - in sagas using `yield put(...)`, for example in App/Sagas/ExampleSaga.js
 *
 * @see https://github.com/infinitered/reduxsauce#createactions
 */
const { Types, Creators } = createActions({
  // // Fetch user informations
  // fetchUser: null,
  // // The operation has started and is loading
  // fetchUserLoading: null,
  // // User informations were successfully fetched
  // fetchUserSuccess: ['user'],
  // // An error occurred
  // fetchUserFailure: ['errorMessage'],
  fetchFilms: ['title', 'page'], //tableay des paramètres demandés
  fetchFilmsLoading: null,
  fetchFilmsSuccess: ['films'], //même nom que dans le reducer associé
  fetchFilmsFailure: ['errorMessage'],

  resetFilms: null,

  fetchDetails: ['id'],
  fetchDetailsLoading: null,
  fetchDetailsSuccess: ['details'],
  fetchDetailsFailure: ['errorMessage'],
})

export const FilmsTypes = Types
export default Creators
