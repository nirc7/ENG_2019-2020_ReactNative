import React, { Component } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import styles from './myStyles';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.header}> Home Page </Text>
          <Text>Email: {this.props.route.params.email}</Text>
          <Text>Pass: {this.props.route.params.pass}</Text>
        </View>
        <View style={{marginTop:20}}>
          <Button title="Tabbed Page" onPress={() => this.props.navigation.navigate('TabbedPage')} />
        </View>
        <View style={{marginTop:20}}>
          <Button title="Material Page" onPress={() => this.props.navigation.navigate('MaterialPage')} />
        </View>
        <View style={{marginTop:20}}>
          <Button title="open Drawer" onPress={() => this.props.navigation.openDrawer()} />
        </View>
      </View>
    )
  }
}