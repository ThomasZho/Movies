import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import Styles from './FilmItemStyle'
import { connect } from 'react-redux'
import filmActions from 'App/Stores/Film/Actions'

import isFavourite from 'App/Assets/Images/FavouriteFilm.png'
import isNotFavourite from 'App/Assets/Images/NotFavourite.png'

class FilmItem extends Component {
  render() {
    const { film, fetchDetails } = this.props
    return (
      <TouchableOpacity style={Styles.main_container} onPress={() => fetchDetails(film.id)}>
        <Image
          style={Styles.image}
          source={{ uri: 'https://image.tmdb.org/t/p/w300' + film.poster_path }}
        />
        <View style={Styles.content_container}>
          <View style={Styles.header_container}>
            <Image
              style={Styles.favourite_image}
              source={
                this.props.favouriteFilms.find((item) => item.id === film.id)
                  ? isFavourite
                  : isNotFavourite
              }
            />
            <Text style={Styles.title_text}>{film.title}</Text>
            <Text style={Styles.vote_text}>{film.vote_average}</Text>
          </View>
          <View style={Styles.description_container}>
            <Text style={Styles.description_text} numberOfLines={6}>
              {film.overview}
            </Text>
            {/* La propriété numberOfLines permet de couper un texte si celui-ci est trop long, il suffit de définir un nombre maximum de ligne */}
          </View>
          <View style={Styles.date_container}>
            <Text style={Styles.date_text}>Sorti le {film.release_date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    favouriteFilms: state.f.favouriteFilms,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchDetails: (id) => dispatch(filmActions.fetchDetails(id)),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilmItem)
