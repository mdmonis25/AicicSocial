import React, { useContext } from 'react';

import AddPost from '../screens/AddPost';
import { AuthContext } from '../../App';
import Login from '../screens/auth/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from '../screens/ProfileScreen';
import Root from './BottomTabNavigator';
import SignUp from '../screens/auth/SignUpScreen';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import ChatScreen from '../screens/ChatScreen';
import Message from '../screens/Message';
import SearchScreen from '../screens/SearchScreen';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';
import PostDetails from '../screens/PostDetails';

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
        name="PostDetails"
        component={PostDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UpdateProfileScreen"
        component={UpdateProfileScreen}
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
        name="SearchScreen"
        component={SearchScreen}
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
    </Stack.Navigator>

  );
};

export default MainNavigator;
