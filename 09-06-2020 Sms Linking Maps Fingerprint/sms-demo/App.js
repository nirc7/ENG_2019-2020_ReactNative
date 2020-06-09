import React from 'react';
import { StyleSheet, Text, View , Button } from 'react-native';
import * as SMS from 'expo-sms';


export default function App() {

  btnSendSms = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
        //alert('send');
        const { result } = 
        await SMS.sendSMSAsync(
            ['052-88888888', '050-77777777'],
             'hello world!');
        // alert(result);
        this.setState({ txtTextValue: result });
    } else {
        alert('misfortune... there\'s no SMS available on this device');
    }
};


  return (
    <View style={styles.container}>
      <Text>SMS Demo!</Text>
      <View style={{margin:20}}>
        <Button title="send SMS" onPress={(btnSendSms)}   />
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
