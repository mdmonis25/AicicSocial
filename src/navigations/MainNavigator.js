import React, { useContext } from 'react';

import AddPost from '../screens/AddPost';
import { AuthContext } from '../../App';
import Login from '../screens/auth/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from '../screens/profile/ProfileScreen';
import Root from './BottomTabNavigator';
import SignUp from '../screens/auth/SignUpScreen';
import { StatusBar } from 'react-native';
import TripDetails from '../screens/TripDetailsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import ChatScreen from '../screens/ChatScreen';
import Message from '../screens/Message';

const Stack = createNativeStackNavigator();


const MainNavigator = () => {
  const {state} = useContext(AuthContext);
  return (
    <Stack.Navigator initialRouteName='Root' screenOptions={{headerShown: false}}> 
      <Stack.Screen
        name="Root"
        component={Root}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
        <Stack.Screen
        name="AddPost"
        component={AddPost}
        options={{
          headerShown: false,
        }}
      />
        <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerShown: false,
        }}
      />
        <Stack.Screen
        name="Message"
        component={Message}
        options={{
          headerShown: false,
        }}
      />
        <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TripDetails"
        component={TripDetails}
        options={{
          headerShown: false,
          useNativeDriver: true,
          gestureEnabled: false,
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress,
            },
          }),
        }}
      />
    </Stack.Navigator>

  );
};

export default MainNavigator;
