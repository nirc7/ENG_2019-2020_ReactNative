import React from 'react';
import { View, Text } from 'react-native'


export default function HomeScreen(props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Text>Name:{props.route.params.user!=null ? props.route.params.user.Name: 'no name'}</Text>
    </View>
  );
}