import React from 'react';
import { StyleSheet, Text, View, Button ,Share } from 'react-native';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

export default function App() {

  function btnOpenYnet() {
    //opt1
    //Linking.openURL('https://ynet.co.il');
    //opt2 - will go bakc to the app when licking the back-button!
    WebBrowser.openBrowserAsync('https://ynet.co.il');
  }
  function btnOpenMail() {
    Linking.openURL('mailto:support@expo.io?subject=Congrats Snoopy&body=Enjoy your stay,%0ARegards');
  }

  function btnOpenTel() {
    Linking.openURL('tel:+123456789');
  }

  function btnOpenSMS() {
    Linking.openURL('sms:+123456789');
  }
  btnOpenWhatsApp = () => {
    let text = "hello ";
    //text = 'https://expo.io/@nirc/get-a-ride-demo';
    let phoneNumber = '+972523333333';
    Linking.openURL(`whatsapp://send?text=${text}&phone=${phoneNumber}`);
  }

  function btnOpenShare() {
    //let text =  Expo.Linking.makeUrl();
    let text = 'https://expo.io/@nirc/get-a-ride-demo';

    Share.share({
      message: "Click Here to View More! " + text,
      url: text,
      title: 'nir has invited you to join this activity',
    })
      .then((result) => {
        console.log(result)
        if (result === 'dismissedAction') {
          return
        }
      })
      .catch((error) => console.log(error))
  }



  return (
    <View style={styles.container}>
      <Text>Linking Demo!</Text>
      <View style={{ margin: 20 }}>
        <Button title="open Ynet" onPress={btnOpenYnet} />
      </View>
      <View style={{ margin: 20 }}>
        <Button title="open mail" onPress={btnOpenMail} />
      </View>
      <View style={{ margin: 20 }}>
        <Button title="open tel" onPress={btnOpenTel} />
      </View>
      <View style={{ margin: 20 }}>
        <Button title="open sms" onPress={btnOpenSMS} />
      </View>
      <View style={{ margin: 20 }}>
        <Button title="open WhatsApp" onPress={btnOpenWhatsApp} />
      </View>
      <View style={{ margin: 20 }}>
        <Button title="open share" onPress={btnOpenShare} />
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
