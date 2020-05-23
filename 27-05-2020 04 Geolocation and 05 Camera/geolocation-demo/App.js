import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null
    };
  }

  btnGetLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const output= 
        '\nlatitude=' + position.coords.latitude +
        '\nlongitude=' + position.coords.longitude +
        '\naltitude=' + position.coords.altitude +
        '\nheading=' + position.coords.heading +
        '\nspeed=' + position.coords.speed 
 
        //alert(output);
        this.setState(
          { location:output }
        )
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Geolocation Demo</Text>
        <View style={{ margin: 20 }}>
          <Button title="Get Location" onPress={this.btnGetLocation} />
        </View>
        <View style={{ margin: 20 }}>
          {this.state.location && <Text>location:{this.state.location}</Text>}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
