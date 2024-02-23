import React, { useContext } from 'react';

import { AuthContext } from '../../App';
import Login from '../screens/auth/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import Root from './BottomTabNavigator';
import SignUp from '../screens/auth/SignUpScreen';
import { StatusBar } from 'react-native';
import TripDetails from '../screens/TripDetailsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


const MainNavigator = () => {
  const { state} = useContext(AuthContext);
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
        name="Login"
        component={Login}
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
