import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

import * as Facebook from 'expo-facebook';

export default function App() {
  let appId = '[YOUR_APP_ID]';

  async function btnFBLogin() {
    console.log(appId);

    try {
      await Facebook.initializeAsync(appId);
      const { type, token, expires, permissions, declinedPermissions, }
        = await Facebook.logInWithReadPermissionsAsync({
          permissions: ['public_profile'],
        });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token}`);
        let res = await response.json();
        console.log(res.picture.data.url);

        Alert.alert('Logged in!', `Hi NAME: ${res.name}!\nEMAIL: ${res.email}\nPICTURE: ${res.picture.data.url}`);
        //Alert.alert('Logged in!', `Hi NAME: ${res.name}!\nEMAIL: ${res.email}\nPICTURE: ${res.picture}\nRES:${JSON.stringify(res)} `);
      } else { type === 'cancel' }
    }
    catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }


  return (
    <View style={styles.container}>
      <Text>Facebook Login Demo!</Text>
      <View style={{ margin: 20 }} >
        <Button title="FB LOGIN" onPress={btnFBLogin} />
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
