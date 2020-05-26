// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';


import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage'
import SecondPage from './Pages/SecondPage'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer() {
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
        options={{ drawerLabel: 'HomePage' }}
      />
      <Drawer.Screen
        name="SecondPage"
        component={SecondPage}
        options={{ drawerLabel: 'SecondPage' }}
      />

    </Drawer.Navigator>
  );
}


function App() {
  return (
    <NavigationContainer>
      <MyDrawer>
        <Stack.Navigator initialRouteName="LoginPage">
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="SecondPage" component={SecondPage} />
        </Stack.Navigator>
      </MyDrawer>
    </NavigationContainer>
  );
}

export default App;