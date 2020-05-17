import React, { Component } from 'react'
import {
  Text, View, TextInput, StyleSheet,
  Dimensions, Keyboard
} from 'react-native'
import { Icon, Input } from 'react-native-elements';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtEmail: 'avi@a.com',
      txtPass: 'Avi123',
      errStatus: false
    }
  }

  btnLogin = () => {
    Keyboard.dismiss(); 
    if (this.state.txtEmail === 'avi@a.com' &&
      this.state.txtPass === 'Avi123') {
      this.setState({ errStatus: false },
        () => {
          this.props.navigation.navigate('HomePage',
            {
              email: this.state.txtEmail,
              pass: this.state.txtPass
            });
        });
    }
    else {
      this.setState({ errStatus: true });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ margin: 15 }}>
          <Input
            placeholder='Email'
            rightIcon={{ type: 'Entypo', name: 'email' }}
            onChangeText={value => this.setState({ txtEmail: value })}
            value={this.state.txtEmail}
          />
          {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> */}
            <Input
              placeholder='Pass'
              rightIcon={{ type: 'FontAwesome5', name: 'lock' }}
              onChangeText={value => this.setState({ txtPass: value })}
              value={this.state.txtPass}
            />
          {/* </TouchableWithoutFeedback> */}
        </View>
        <View>
          <Icon
            name='sign-in'
            type='font-awesome'
            color='#007f00'
            size={40}
            onPress={() => this.btnLogin()}
          />
        </View>
        <View>
          {this.state.errStatus && <Text style={{
            color: 'red',
            margin: 15,
            fontSize: 15,
            alignSelf: 'center'
          }}>Error Email or Pass</Text>}
        </View>
      </View>
    )
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  label: {
    width: 200,
  }
});
