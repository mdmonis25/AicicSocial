import {Animated, StyleSheet} from 'react-native';
import {colors, sizes} from '../constants/theme';

import Favorite from '../screens/FavoriteScreen';
import HomePage from '../screens/SearchScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Profile from '../screens/profile/ProfileScreen';
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

// import Home from '../screens/HomeScreen';






// const tabs = [
//   {
//     name: 'Home',
//     screen: Home,
//     options: {
//       headerShown: false,
//     },
//   },
//   {
//     name: 'HomePage',
//     screen: HomePage,
//     options: {
//       headerShown: false,
//     },
//   },
//   {
//     name: 'Profile',
//     screen: ProfileScreen,
//     options: {
//       headerShown: false,
//     },
//   },
// ];

const Tab = createMaterialBottomTabNavigator();

const Root = () => {
  return (
  
      <Tab.Navigator initialRouteName='HomePage'  activeColor='#7F27FF' inactiveColor='gray' barStyle={{backgroundColor: '#ffffff'}}>
        <Tab.Screen 
        name = "HomePage"
         component={HomePage}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          )
        }} />
        <Tab.Screen
         name = "Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            )
          }} />
      </Tab.Navigator>
  
  );
};

const styles = StyleSheet.create({
  // indicator: {
  //   position: 'absolute',
  //   width: 10,
  //   height: 2,
  //   left: sizes.width / tabs.length / 2 - 5,
  //   bottom: 30,
  //   backgroundColor: colors.primary,
  //   zIndex: 100,
  // },
});

export default Root;
