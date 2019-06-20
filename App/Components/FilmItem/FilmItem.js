import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi } from '../../Services/FilmService'
import Styles from './FilmItemStyle'
import { connect } from 'react-redux'
import filmActions from 'App/Stores/Film/Actions'
class FilmItem extends Component {
  //   render() {
  //     return (
  //       <View style={Styles.main_container} className="main">
  //         <View style={Styles.image}>
  //           <Image
  //             source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
  //           />
  //         </View>
  //         <View style={Styles.second_container}>
  //           <View style={Styles.flexRow}>
  //             <View style={{ flex: 4 }}>
  //               <Text style={Styles.title_text}>Titre du film</Text>
  //             </View>
  //             <View style={{ flex: 1 }}>
  //               <Text>Vote</Text>
  //             </View>
  //           </View>
  //           <View style={Styles.description}>
  //             <Text>Description</Text>
  //           </View>
  //           <View style={Styles.date}>
  //             <Text>Sorti le 00/00/0000</Text>
  //           </View>
  //         </View>
  //       </View>
  //     )
  //   }
  // }

  // const Styles = StyleSheet.create({
  //   main_container: {
  //     height: 190,
  //     flex: 1,
  //     flexDirection: 'row',
  //   },
  //   image: {
  //     flex: 1,
  //   },
  //   flexRow: {
  //     flexDirection: 'row',
  //   },
  //   flexColumn: {
  //     flexDirection: 'column',
  //   },
  //   second_container: {
  //     // backgroundColor: 'green',
  //     flex: 3,
  //     flexDirection: 'column',
  //   },
  //   description: { flex: 3, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' },
  //   date: { flex: 1, justifyContent: 'center', backgroundColor: 'pink', alignItems: 'flex-end' },
  //   title_text: {
  //     fontWeight: 'bold',
  //     flex: 1,
  //   },

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

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDetails: (id) => dispatch(filmActions.fetchDetails(id)),
  }
}
export default connect(
  null,
  mapDispatchToProps
)(FilmItem)
