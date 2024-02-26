// AuthContext.js

import { useNavigation } from '@react-navigation/native';
import React, { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const initialState = {
  user: null,
  isLoggedIn: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        isLoggedIn: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const navigation = useNavigation();
  const [state, dispatch] = useReducer(authReducer, initialState);
  const enhancedDispatch = action => {
    if (action.type === 'LOGOUT') {
      // navigation.navigate('LoginScreen'); // Navigate to login screen on logout
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      });
    }
    dispatch(action);
  };

  return (
    <AuthContext.Provider value={{ state, dispatch:enhancedDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
