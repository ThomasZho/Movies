import React from 'react'
import {
  TextInput,
  View,
  Button,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native'
import films from '../../Assets/Data/films'
import FilmItem from '../../Components/FilmItem/FilmItem'
import { getFilmsFromApiWithSearchedText } from '../../Services/FilmService' // import { } from ... car c'est un export nommé dans TMDBApi.js
import Styles from './SearchStyle'
import { relativeTimeRounding } from 'moment'
import filmActions from 'App/Stores/Film/Actions'
import { connect } from 'react-redux'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.searchedText = ''
    // this.page = 0 // Compteur pour connaître la page courante
    // this.totalPages = 0 // Nombre de pages totales pour savoir si on a atteint la fin des retours de l'API TMDB
  }

  componentDidMount() {
    this.props.reset()
  }

  _searchFilms() {
    console.log(
      'Search.js _searchFilms',
      this.props.films,
      'searchedText:',
      this.searchedText,
      'props : ',
      this.props
    )

    this.props.reset()
    this.props.fFilm(this.searchedText, this.props.page)
    // this.setState(
    //   {
    //     films: [],
    //   },
    //   () => {
    //     // console.log(
    //     //   'Page : ' +
    //     //     this.page +
    //     //     ' / TotalPages : ' +
    //     //     this.totalPages +
    //     //     ' / Nombre de films : ' +
    //     //     this.state.films.length //setState asynchrone
    //     // )
    //     this._loadFilms()
    //   }
    // )
  }

  _loadFilms() {
    // _ indique private
    // this._loadFilms()  => Oui.
    // search._loadFilms()  => Non. Cela fonctionne toutefois, mais ce n'est pas bien. :colere:
    // this.setState({ isLoading: true })

    if (this.searchedText.length > 0) {
      this.props.fFilm(this.searchedText, this.props.page + 1)
    }
    // getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then((data) => {
    //   this.page = data.page
    //   this.totalPages = data.total_pages
    //   this.setState({ films: [...this.state.films, ...data.results], isLoading: false })
    // })
  }

  _searchTextInputChanged(text) {
    this.searchedText = text
  }

  _displayLoading() {
    // Affichage conditionnel retourne du JSX
    if (this.props.filmsIsLoading) {
      return (
        <View style={Styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
  }

  _displayDetailForFilm = (idFilm) => {
    console.log('Display film with id' + idFilm)
    this.props.navigation.navigate('uneAutreVue', { idFilm: idFilm })
  }

  render() {
    return (
      <View style={Styles.main_container}>
        <TextInput
          style={Styles.text_input}
          placeholder="Titre du film"
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchFilms()} // Si on appuie sur entrer
        />

        <Button style={{ height: 50 }} title="Rechercher" onPress={() => this._searchFilms()} />

        <FlatList
          // data={this.props.films.filter((item) => item.id)}
          data={this.props.films}
          // On utilise la prop extraData pour indiquer à notre FlatList que d’autres données doivent être prises en compte si on lui demande de se re-rendre
          extraData={this.props.favouriteFilms}
          keyExtractor={(item) => {
            // console.log(item)
            item.id.toString()
          }}
          renderItem={({ item }) => (
            <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm} />
            // <Text> {item.title}</Text>
          )}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.props.page < this.props.totalPages) {
              console.log('endReached', this.props.page, this.props.totalPages)
              // On vérifie qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
              this._loadFilms()
            }
          }}
        />
        {this._displayLoading()}
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    films: state.f.films, //prefix index.js avec createStore
    page: state.f.page,
    totalPages: state.f.totalPages,
    filmIsLoading: state.f.filmsIsLoading,
    filmErrorMessage: state.f.filmsErrorMessage,
    favouriteFilms: state.f.favouriteFilms,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fFilm: (title, page) => dispatch(filmActions.fetchFilms(title, page)),
    reset: () => dispatch(filmActions.resetFilms()),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
