import { createContext, useEffect, useReducer, useState } from "react";

import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthNavigator from "./src/navigations/AuthNavigator";
import MainNavigator from "./src/navigations/MainNavigator";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

// import { useAuth } from "./src/contexts/AuthContext";

const userData = {
  name: "",
  email: "",
  mobileno: "",
  isSignout: true,
  devicetoken: "",
  token: "",
  password: "",
  uid: "",
  address: "",
};

export const AuthContext = createContext(null);

export const AuthReducer = async (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isSignout: false,
        userData: action.payload,
      };
      case "LOG_OUT":
        await AsyncStorage.removeItem("userData");
        return {
          ...userData, // Reset state to initial values
          isSignout: true,
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
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <NavigationContainer>
        {!state.isSignout ? <AuthNavigator /> : <MainNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default App