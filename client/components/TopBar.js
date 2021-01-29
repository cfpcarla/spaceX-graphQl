import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 120,
    flexDirection: 'row', // row
    backgroundColor: '#44008b',
    alignItems: 'center',
    justifyContent: 'space-between', // center, space-around
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: '-160px',
    marginLeft: '0px',
    marginRight: '-65px',
    

  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
  text: {
    color: 'white',
    position: 'absolute',
    textAlign: 'center',
    marginLeft: '118px',
    fontSize: 'xx-large',
    fontFamily: 'fantasy',

  }

});

class TopBar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Rocket SpaceX</Text>
        <Image
        style={styles.tinyLogo}
        source={require('../assets/images/rocket.jpg')}
      />
      </View>
    );
  }
}



export default TopBar;