import { StyleSheet, Text, View } from 'react-native'

import Login from '../screens/LoginScreen';
import React from 'react'
import SignUp from '../screens/SignUpScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
   <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
    <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
   </Stack.Navigator>
  )
}
