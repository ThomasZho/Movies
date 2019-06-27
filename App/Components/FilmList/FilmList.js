import React, { Component } from 'react'
import { FlatList } from 'react-native'
import FilmItem from 'App/Component/FilmItem/FilmItem'
import { connect } from 'react-redux'
import { Helpers } from 'App/Theme'
class FilmList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      films: [],
    }
  }

  _displayDetailForFilm = (idFilm) => {
    console.log('Display film ' + idFilm)
    // On a récupéré les informations de la navigation, on peut afficher le détail du film
    this.props.navigation.navigate('uneAutreVue', { idFilm: idFilm })
  }

  render() {
    return (
      <FlatList
        style={Helpers.fill}
        data={this.props.films}
        extraData={this.props.favouritesFilm}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FilmItem
            film={item}
            isFilmFavorite={
              this.props.favoritesFilm.findIndex((film) => film.id === item.id) !== -1
                ? true
                : false
            }
            displayDetailForFilm={this._displayDetailForFilm}
          />
        )}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (this.props.page < this.props.totalPages) {
            // On appelle la méthode loadFilm du component Search pour charger plus de films
            this.props.loadFilms()
          }
        }}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    favouriteFilms: state.f.favouriteFilms,
  }
}
export default connect(
  mapStateToProps,
  null
)(FilmList)
