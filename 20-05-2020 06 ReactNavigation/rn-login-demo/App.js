import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import TabbedPage from './Pages/TabbedPage/';
import MaterialPage from './Pages/MaterialPage';

import { createDrawerNavigator } from '@react-navigation/drawer'; const Drawer = createDrawerNavigator();
function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="LoginPage">
      <Drawer.Screen
        name="LoginPage"
        component={LoginPage}
        options={{ drawerLabel: 'LoginPage' }}
      />
      <Drawer.Screen
        name="HomePage"
        component={HomePage}
        options={{ drawerLabel: 'Home Page' }}
      />
      <Drawer.Screen
        name="TabbedPage"
        component={TabbedPage}
        options={{ drawerLabel: 'TabbedPage' }}
      />
      <Drawer.Screen
        name="MaterialPage"
        component={MaterialPage}
        options={{ drawerLabel: 'MaterialPage' }}
      />
    </Drawer.Navigator>
  );
}

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <DrawerNavigator>
        <Stack.Navigator initialRouteName="LoginPage">
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="HomePage" component={HomePage}
            options={{ title: 'My home' }} />
          <Stack.Screen name="TabbedPage" component={TabbedPage}
            options={{ title: 'Tabbed Page' }} />
          <Stack.Screen name="MaterialPage" component={MaterialPage}
            options={{ title: 'Material Page' }} />
        </Stack.Navigator>
      </DrawerNavigator>
    </NavigationContainer>
  );
}
