import { ActivityIndicator, AppState, View } from "react-native";
import React, { createContext, useEffect, useReducer, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
        token: action.payload.token,
        name: action.payload.name,
        mobile: action.payload.mobile,
        email : action.payload.email,
        password: action.payload.password,
        // plans: action.payload.plans,
        address: action.payload.address,
        uid : action.payload.uid,
        // userData: action.payload,
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

  console.log("this is state", state);

  return (
    <AuthContext.Provider value={{ authState:state, authDispatch:dispatch }}>
      <NavigationContainer>
         { 
           state.isSignout ? <AuthNavigator /> : <MainNavigator />
          //{state._j==null ? <AuthNavigator /> : <MainNavigator />}
         }
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default App;