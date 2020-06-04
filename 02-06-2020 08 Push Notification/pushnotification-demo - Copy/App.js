import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { Notifications } from 'expo';
import registerForPushNotificationsAsync from './registerForPushNotificationsAsync';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null
    };
  }

  componentDidMount() {
    registerForPushNotificationsAsync()
      .then((token) => {
        console.log('token from app.js=', token);
        this.setState({ token }, () => {
          //send token to DB Users Table using fetch!!!
          console.log('state.token from callback=', this.state.token);
        });
        console.log('state.token from app.js=', this.state.token);

        this._notificationSubscription = Notifications.addListener(this._handleNotification);
      });
  }

  _handleNotification = (notification) => {
    this.setState({ notification });
    console.log(notification.data);
    console.log(notification.data.page);
  };

  btnPushFromClient = () => {
    let per = {
      to: this.state.token,
      title: 'title from client',
      body: "body from client side",
      badge: 3,
      data: {
        name: "nir",
        grade: 77,
        seconds: new Date().getSeconds()
      }
    };

    // POST adds a random id to the object sent
    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      body: JSON.stringify(per),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json != null) {
          console.log(`
              returned from server\n
              json.data= ${JSON.stringify(json.data)}`);

        } else {
          alert('err json');
        }
      });
  }

  btnSendPushFromServer = () => {
    let pnd = {
      to: this.state.token,
      title: 'title from Ruppin Server',
      body: "body from server side",
      badge: 4,
      data: { name: "sivan", grade: 99 , seconds: new Date().getSeconds() }
    };

    // POST adds a random id to the object sent
    fetch('http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site23/sendpushnotification', {
      method: 'POST',
      body: JSON.stringify(pnd),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json != null) {
          console.log(`
                returned from Ruppin server\n
                json= ${JSON.stringify(json)}`);
        } else {
          alert('err json');
        }
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>PN DEMO {new Date().getSeconds()}</Text>
        <View>
          <Text>token={this.state.token}</Text>
          {this.state.notification &&
            <View>
              <Text>
                notification.data.name={this.state.notification.data.name}
              </Text>
              <Text>
                notification.data.grade={this.state.notification.data.grade}
              </Text>
              <Text>
                notification.data.seconds={this.state.notification.data.seconds}
              </Text>
              <Text>{JSON.stringify(this.state.notification)}</Text>
            </View>}
        </View>
        <View>
          <View style={{ margin: 20 }}>
            <Button title="send push from client" onPress={this.btnPushFromClient} />
          </View>
          <View style={{ margin: 10 }}>
            <Button title="send push from server" onPress={this.btnSendPushFromServer} />
          </View>
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
});
