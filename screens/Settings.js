// React native libraries import

import React from "react";
import { View } from "react-native";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Importing custom made variables/pages

import Button from "../components/Button";

// Log out button

export default () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Button
        text="Log out"
        onPress={() => {
          firebase.auth().signOut();
        }}
      />
    </View>
  );
};
