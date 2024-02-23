import {Animated, StyleSheet} from 'react-native';
import {colors, sizes} from '../constants/theme';

import AddPost from '../screens/post/AddPost';
import Favorite from '../screens/FavoriteScreen';
import HomePage from '../screens/SearchScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Profile from '../screens/profile/ProfileScreen';
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

// import Home from '../screens/HomeScreen';

const Tab = createMaterialBottomTabNavigator();

const Root = () => {
  return (
  
      <Tab.Navigator initialRouteName='HomePage'  activeColor='#7F27FF' inactiveColor='#E7BCDE' barStyle={{backgroundColor: '#ffffff'}}>
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
         name = "Add post"
          component={AddPost}
          options={{
            tabBarLabel: 'Add post',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="plus-circle" color={color} size={26} />
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

});

export default Root;
