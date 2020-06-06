import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Location from 'expo-location';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  btnHeading = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }

    let heading = await Location.getHeadingAsync({});
    this.setState({ heading });
  }

  btnLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  }

  btnReverseGC = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      this.setState({ errorMessage: 'Permission to access location was denied', });
    }

    if (this.state.location) {
      let reverseGeoCode = await Location.reverseGeocodeAsync(this.state.location.coords);
      this.setState({ reverseGeoCode });
    } else {
      alert('You must push the Location button first in order to get the location before you can get the reverse geocode for the latitude and longitude!');
    }
  };

  btnGC = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      this.setState({ errorMessage: 'Permission to access location was denied', });
    }
      let geoCode = await Location.geocodeAsync('המייסדים 38 רמת השרון');
      this.setState({ geoCode });
    
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Compass and GeoCoding Demo!</Text>
        <View style={styles.btn}>
          <Button onPress={this.btnHeading} title="Compass Heading" />
        </View>
        <View style={styles.lbl}>
          {this.state.heading && <Text>Heading:{JSON.stringify(this.state.heading)}</Text>}
          {this.state.heading && <Text>Magnetic Heading:{this.state.heading.magHeading}</Text>}
        </View>
        <View style={styles.btn}>
          <Button onPress={this.btnLocation} title="Location" />
        </View>
        <View style={styles.lbl}>
          {this.state.location && <Text>Location:{JSON.stringify(this.state.location)}</Text>}
          {this.state.location && <Text>Location lat:{this.state.location.coords.latitude}</Text>}
        </View>
        <View style={styles.btn}>
          <Button onPress={this.btnReverseGC} title="Reverse GeoCode" />
        </View>
        <View style={styles.lbl}>
          {this.state.reverseGeoCode && <Text>reverseGeoCode:{JSON.stringify(this.state.reverseGeoCode)}</Text>}
          {this.state.reverseGeoCode && <Text>City:{this.state.reverseGeoCode[0].city}</Text>}
          {this.state.reverseGeoCode && <Text>Street:{this.state.reverseGeoCode[0].street}</Text>}
        </View>
        <View style={styles.btn}>
          <Button onPress={this.btnGC} title="GeoCode" />
        </View>
        <View style={styles.lbl}>
          {this.state.geoCode && <Text>geoCode:{JSON.stringify(this.state.geoCode)}</Text>}
          {this.state.geoCode && <Text>Lat:{this.state.geoCode[0].latitude}</Text>}
          {this.state.geoCode && <Text>Long:{this.state.geoCode[0].longitude}</Text>}
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
  btn: {
    margin: 10
  },
  lbl: {
    marginLeft: 20,
    marginRight: 20
  }
});
