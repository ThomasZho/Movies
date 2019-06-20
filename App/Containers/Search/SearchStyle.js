import { StyleSheet } from 'react-native'
export default StyleSheet.create({
  // main_container: {
  //   marginTop: 20,
  //   flex: 1,
  // }, //Inutile dans StackNavigator
  text_input: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
