import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from 'App/Sagas'
import { reducer as FilmReducer } from './Film/Reducers'

export default () => {
  const rootReducer = combineReducers({
    f: FilmReducer,
  })

  return configureStore(rootReducer, rootSaga)
}
