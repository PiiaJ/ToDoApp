// Importing different REACT libraries

import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { LogBox, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Importing screens from "Screens" folder
import Home from "./screens/Home";
import ToDoList from "./screens/ToDoList";
import EditList from "./screens/EditList";
import Login from "./screens/Login";
import colors from "./constants/colors";
import Settings from "./screens/Settings";

// Importing firebase
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Creating stack navigators

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

// Returns log in screen
const AuthScreens = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={() => {
          return {
            headerStyle: {
              backgroundColor: colors.bground,
              height: 90,
            },
            headerTitleStyle: {
              fontWeight: "bold",
            },

            headerTintColor: "black",
          };
        }}
      />
    </AuthStack.Navigator>
  );
};

// Code body, screens

const Screens = () => {
  return (
    <Stack.Navigator style={styles}>
      <Stack.Screen
        name="Too-Doo"
        component={Home}
        options={() => {
          return {
            headerStyle: {
              backgroundColor: colors.bground,
              height: 90,
            },
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTintColor: "black",
          };
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={({ route }) => {
          return {
            headerStyle: {
              backgroundColor: colors.bground,
              height: 90,
            },
            headerTintColor: "black",
          };
        }}
      />
      <Stack.Screen
        name="ToDoList"
        component={ToDoList}
        options={({ route }) => {
          return {
            title: route.params.title,
            headerStyle: {
              backgroundColor: route.params.color,
            },
            headerTintColor: "black",
          };
        }}
      />
      <Stack.Screen
        name="Edit"
        component={EditList}
        options={({ route }) => {
          return {
            title: route.params.title
              ? `Edit ${route.params.title} list`
              : "Create new list",
            headerStyle: {
              backgroundColor: route.params.color || colors.blue,
            },
            headerTintColor: "black",
          };
        }}
      />
    </Stack.Navigator>
  );
};

// runs the code and check authentication

export default function App() {
  LogBox.ignoreLogs(["Setting a timer"]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (firebase.auth().currentUser) {
      setIsAuthenticated(true);
    }
    firebase.auth().onAuthStateChanged((user) => {
      console.log("Checking auth state...");
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);
  return (
    <NavigationContainer>
      {isAuthenticated ? <Screens /> : <AuthScreens />}
    </NavigationContainer>
  );
}

// Styles for this screen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAqaZWuxVOg0g1-whowIK7ixWQfBccNmQI",
  authDomain: "too-doo-9bf5f.firebaseapp.com",
  projectId: "too-doo-9bf5f",
  storageBucket: "too-doo-9bf5f.appspot.com",
  messagingSenderId: "433699160397",
  appId: "1:433699160397:web:1bc7bb641f81a47d3cb704",
};

firebase.initializeApp(firebaseConfig);
