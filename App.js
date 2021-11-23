// Importing different REACT libraries

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importing screens from "Screens" folder
import Home from './screens/Home';
import ToDoList from './screens/ToDoList';
import EditList from './screens/EditList';
import colors from './constants/colors';

// Creating stack navigator 

const Stack = createStackNavigator();

// Code body, functions below, loading screens

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Too-Doo" 
          component={Home}
        />
        <Stack.Screen 
          name="ToDoList" 
          component={ToDoList}
          options={({route}) => {
            return(
              {
                title: route.params.title,
                headerStyle: {
                  backgroundColor: route.params.color
                },
                headerTintColor: "white"
              }
            )
          }} 
        />
        <Stack.Screen name="Edit" component={EditList}
          options={({route}) => {
            return(
              {
                title: route.params.title ? `Edit ${route.params.title} list` : "Create new list",
                headerStyle: {
                  backgroundColor: route.params.color || colors.blue
                },
                headerTintColor: "white"
              }
            )
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

// Styles for this screen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
