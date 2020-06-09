import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView , {Marker}from 'react-native-maps';


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Maps Demo!</Text>
      <View style={{ margin: 50 }}>
        <MapView style={styles.mapStyle}
          region={{
            latitude: 32.340700,
            longitude: 34.912941,
            latitudeDelta: 0.00722,
            longitudeDelta: 0.00721,
          }}

        >

          <Marker
            coordinate={{
              latitude: 32.340700,
              longitude: 34.912941,
            }}
            title='my place:)'
            description='here i am'
          //image={require('../assets/icon.png')}
          />
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get('window').height / 2,
  },
});
