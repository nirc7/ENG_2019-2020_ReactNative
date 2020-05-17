import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeedPage from './FeedPage';
import NotificationsPage from './NotificationsPage';
import ProfilePage from './ProfilePage';

const Tab = createBottomTabNavigator();

export default function TabbedPage() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#33aa00',
        inactiveTintColor: 'black',
        inactiveBackgroundColor: 'purple',
        activeBackgroundColor: 'purple'
      }}
      initialRouteName="Notifications"
    >
      <Tab.Screen
        name="Feed"
        component={FeedPage}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsPage}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}