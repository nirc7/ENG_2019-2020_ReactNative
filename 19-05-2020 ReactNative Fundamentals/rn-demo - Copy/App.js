import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import styles from './myCss';
import { Button, Header } from 'react-native-elements';
//import Icon from 'react-native-vector-icons/FontAwesome';

export default class App extends Component {
  constructor(props) {
    super(props);

    console.log('in app2');
    this.txt1 = '';
    this.txt2 = '';

    this.state = {
      sum: null
    };
  }

  btnPerssed = () => {
    //debugger;  
    console.log('in btn function2');
    console.log('txt1=', this.txt1);
    console.log('txt2=', this.txt2);
    this.setState({ sum: parseInt(this.txt1) + parseInt(this.txt2) })
    let sum = parseInt(this.txt1) + parseInt(this.txt2);
    console.log('sum=', sum)
  }

  render() {
    return (
      <View>
        <Header
          leftComponent={{ icon: 'bell', color: '#fff' }}
          centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
        {/* <View style={styles.container}> */}
        <View>
          <View style={{ marginBottom: 30, }} >
            <Text style={[styles.header, { color: 'red' }]}>Ruppin Header</Text>
          </View>
          <Text>Hello Ruppin!</Text>
          <Text>NUM1:</Text>
          <TextInput onChangeText={text => this.txt1 = text}
            placeholder="insert the first num"
          />
          <Text>NUM2:</Text>
          <TextInput onChangeText={text => this.txt2 = text}
            placeholder="insert the second num" />
          <View style={{ margin: 15 }} >
            <Button title="add" onPress={() => {
              console.log('in btn press');
            }} />
          </View>
          <View style={{ margin: 15 }} >
            <Button title="add2" onPress={() => this.btnPerssed()} />
          </View>
          {this.state.sum && <Text>sum={this.state.sum}</Text>}
          <Text style={styles.header}>Ruppin Header</Text>
          <Button
            // icon={
            //   <Icon
            //     name="glass"
            //     size={15}
            //     color="white"
            //   />
            // }
            type="outline"
            title="Button with right icon"
          />

        </View>
      </View>
    );
  }
}

