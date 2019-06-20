import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, Button } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../../Services/FilmService'
// import FilmItem from '../../Components/FilmItem/FilmItem'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import Styles from './FilmDetailStyle'

class FilmDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      film: undefined,
      isLoading: true,
    }
  }

  //   componentDidMount() {
  //     getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then((data) => {
  //       this.setState({
  //         film: data,
  //         isLoading: false,
  //       })
  //     })
  //   }

  //   _displayFilm() {
  //     const film = this.state.film
  //     if (film !== undefined) {
  //       console.log(film)
  //       return (
  //         <ScrollView style={Styles.scrollview_container}>
  //           <View style={Styles.poster_container}>
  //             <Image style={Styles.poster} source={{ uri: getImageFromApi(film.poster_path) }} />
  //           </View>
  //           <View style={Styles.title_container}>
  //             <Text style={Styles.title}>{film.title}</Text>
  //           </View>
  //           <View style={Styles.overview_container}>
  //             <Text style={Styles.overview}>{film.overview}</Text>
  //           </View>
  //           <View style={Styles.infos_container}>
  //             <Text style={Styles.infos}>
  //               {`Sorti le ${film.release_date}
  // Note : ${film.vote_average} / 10 Nombre de votes
  // Nombre de votes : ${film.vote_count}
  // Budget: ${film.budget}
  // Genre(s): ${film.genres
  //                 .map((genre) => {
  //                   return genre.name
  //                 })
  //                 .join(' / ')}
  // Companie(s): ${film.production_companies
  //                 .map((company) => {
  //                   return company.name
  //                 })
  //                 .join(' / ')}`}
  //             </Text>
  //           </View>
  //         </ScrollView>
  //       )
  //     }
  //   }
  //   _displayLoading() {
  //     // Affichage conditionnel retourne du JSX
  //     if (this.state.isLoading) {
  //       return (
  //         <View style={Styles.loading_container}>
  //           <ActivityIndicator size="large" />
  //         </View>
  //       )
  //     }
  //   }

  //   render() {
  //     const idFilm = this.props.navigation.state.params.idFilm
  //     return (
  //       <View style={Styles.main_container}>
  //         {/* <Text>Détails du film</Text> */}
  //         {this._displayLoading()}
  //         {this._displayFilm()}
  //       </View>
  //     )
  //   }
  // }

  // const Styles = StyleSheet.create({
  //   main_container: {
  //     flex: 1,
  //   },
  //   loading_container: {
  //     position: 'absolute',
  //     left: 0,
  //     right: 0,
  //     top: 0,
  //     bottom: 0,
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //   },
  //   scrollview_container: {
  //     flex: 1,
  //     flexDirection: 'column',
  //   },
  //   poster_container: {
  //     flex: 4,
  //   },
  //   poster: {
  //     height: 170,
  //   },
  //   title_container: { backgroundColor: 'red', flex: 2 },
  //   title: {
  //     fontWeight: 'bold',
  //     fontSize: 40,
  //     textAlign: 'center',
  //   },
  //   overview_container: {
  //     backgroundColor: 'yellow',
  //     flex: 8,
  //   },
  //   overview: {
  //     fontStyle: 'italic',
  //     flexWrap: 'wrap',
  //     fontSize: 20,
  //   },
  //   infos_container: {
  //     backgroundColor: 'pink',
  //   },
  //   infos: {
  //     fontSize: 20,
  //     fontWeight: 'bold',
  //   },
  // })

  // componentDidMount() {
  //   getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then((data) => {
  //     this.setState({
  //       film: data,
  //       isLoading: false,
  //     })
  //   })
  // }

  _displayLoading() {
    if (this.props.detailsLoading) {
      return (
        <View style={Styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
  }

  // _toggleFavorite() {
  //   const action = { type: 'TOGGLE_FAVORITE', value: this.state.film }
  //   this.props.dispatch(action)
  // }

  componentDidUpdate() {
    // console.log('componentDidUpdate : ')
    // console.log(this.props.favoritesFilm)
  }

  _displayFilm() {
    const film = this.props.details
    console.log(film)
    // const { details } = this.props
    if (film != undefined) {
      return (
        <ScrollView style={Styles.scrollview_container}>
          <Image
            style={Styles.image}
            source={{ uri: 'https://image.tmdb.org/t/p/w300' + film.backdrop_path }}
          />
          <Text style={Styles.title_text}>{film.title}</Text>

          {/* <Button title="favoris" onPress={() => this._toggleFavorite()} /> */}
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
  }
} // On connecte le state de l'application avec les props du component

// const mapDispatchToProps = (dispatch) => {
//   return {
//     dispatch: (action) => {
//       dispatch(action)
//     },
//   }
// }
export default connect(
  mapStateToProps,
  null
)(FilmDetail)
