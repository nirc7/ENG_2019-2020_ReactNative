import React from 'react';
import { StyleSheet, Text, View , Button} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';


export default function App() {

  //async function func1(){}  

  scanFingerPrint = async () => {
    try {
      let results = await LocalAuthentication.authenticateAsync();
      if (results.success) {
        alert('logged in!')
      } else {
        alert('not logged in!');
      }
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <View style={styles.container}>
      <Text>Fingerprint Demo!</Text>
      <View style={{margin:20}}>
        <Button title="login" onPress={(scanFingerPrint)} />
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
});
