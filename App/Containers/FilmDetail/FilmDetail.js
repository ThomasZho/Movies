import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../../Services/FilmService'
// import FilmItem from '../../Components/FilmItem/FilmItem'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import Styles from './FilmDetailStyle'

import filmActions from 'App/Stores/Film/Actions'
import isFavourite from 'App/Assets/Images/FavouriteFilm.png'
import isNotFavourite from 'App/Assets/Images/NotFavourite.png'

class FilmDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      film: undefined,
      isLoading: true,
    }
  }

  _displayLoading() {
    if (this.props.detailsLoading) {
      return (
        <View style={Styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
  }

  _toggleFavourite(favouriteFilms, film) {
    this.props.toggle(favouriteFilms, film)
  }

  _displayFilm() {
    const film = this.props.details
    // const { details } = this.props
    if (film != undefined) {
      return (
        <ScrollView style={Styles.scrollview_container}>
          <Image
            style={Styles.image}
            source={{ uri: 'https://image.tmdb.org/t/p/w300' + film.backdrop_path }}
          />
          <Text style={Styles.title_text}>{film.title}</Text>

          <TouchableOpacity
            style={Styles.favourite_container}
            title="favoris"
            onPress={() => this._toggleFavourite(this.props.favouriteFilms, film)}
          >
            <Image
              source={
                this.props.favouriteFilms.find((item) => item.id === film.id)
                  ? isFavourite
                  : isNotFavourite
              }
            />
          </TouchableOpacity>

          <Text style={Styles.description_text}>{film.overview}</Text>
          <Text style={Styles.default_text}>
            Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}
          </Text>
          <Text style={Styles.default_text}>Note : {film.vote_average} / 10</Text>
          <Text style={Styles.default_text}>Nombre de votes : {film.vote_count}</Text>
          <Text style={Styles.default_text}>
            Budget : {numeral(film.budget).format('0,0[.]00 $')}
          </Text>
          <Text style={Styles.default_text}>
            Genre(s) :{' '}
            {film.genres
              .map(function(genre) {
                return genre.name
              })
              .join(' / ')}
          </Text>
          <Text style={Styles.default_text}>
            Companie(s) :{' '}
            {film.production_companies
              .map(function(company) {
                return company.name
              })
              .join(' / ')}
          </Text>
        </ScrollView>
      )
    }
  }

  render() {
    return (
      <View style={Styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    details: state.f.currentFilmDetails,
    displayLoading: state.f.detailsLoading,
    favouriteFilms: state.f.favouriteFilms,
  }
} // On connecte le state de l'application avec les props du component

const mapDispatchToProps = (dispatch) => {
  return {
    toggle: (favouriteFilms, id) => dispatch(filmActions.toggleFavourite(favouriteFilms, id)),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilmDetail)
