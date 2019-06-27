import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation'

import Search from '../Containers/Search/Search'
import FilmDetail from '../Containers/FilmDetail/FilmDetail'
import Favourites from 'App/Containers/Favourites/Favourites'
import React from 'react'
import { Image, StyleSheet } from 'react-native'
/**
 * The root screen contains the application's navigation.
 *
 * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
 */
const SearchStackNavigator = createStackNavigator({
  // // Create the application routes here (the key is the route name, the value is the target screen)
  // // See https://reactnavigation.org/docs/en/stack-navigator.html#routeconfigs
  // SplashScreen: SplashScreen,
  // // The main application screen is our "ExampleScreen". Feel free to replace it with your
  // // own screen and remove the example.
  // MainScreen: ExampleScreen,
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Rechercher',
    },
  },
  uneAutreVue: {
    screen: FilmDetail,
  },
})
const MoviesTabNavigator = createBottomTabNavigator({
  Search: {
    // screen: Search,
    screen: SearchStackNavigator,
  },
  Favorites: {
    navigationOptions: {
      tabBarIcon: () => {
        return <Image source={require('App/Assets/Images/FavouriteFilm.png')} style={styles.icon} />
      },
    },
    screen: Favourites,
  },
})

const styles = StyleSheet.create({
  width: 30,
  height: 30,
})
// export default createAppContainer(SearchStackNavigator)
export default createAppContainer(MoviesTabNavigator)
