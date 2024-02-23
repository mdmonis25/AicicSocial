import { ActivityIndicator, AppState, View } from "react-native";
import React, { createContext, useEffect, useReducer, useState } from "react";

import AuthNavigator from "./src/navigations/AuthNavigator";
import MainNavigator from "./src/navigations/MainNavigator";
import { NavigationContainer } from "@react-navigation/native";


const userData = {
  name: "",
  email: "",
  mobile: "",
  isSignout: true,
  devicetoken: "",
  token: "",
  password: "",
  uid: "",
  address: "",
};

export const AuthContext = createContext(null);

export const AuthReducer = async (state, action) => {
  console.log("this is payload", action.payload);
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isSignout: false,
        userData: action.payload,
      };
      case "LOG_OUT":
        // await AsyncStorage.removeItem("userData");
        return {
          isSignout: true,
          ...userData, // Reset state to initial values
        };
      
    case "PROFILE_UPDATE":
      return {
        ...state,
        userData: action.payload,
      }
    default:
      return state;
  }
}


const App = () => {
  const [appState, setAppState] = useState(AppState.currentState);
  const [state, dispatch] = useReducer(AuthReducer, userData);

  console.log("this is state", state);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <NavigationContainer>
         { 
          state.isSignout ? <AuthNavigator /> : <MainNavigator />
         }
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default App;