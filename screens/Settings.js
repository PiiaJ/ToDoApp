// React native libraries import

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Importing custom made variables/pages

import Button from "../components/Button";
import colors from "../constants/colors";

// Log out button

export default () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Too-Doo</Text>
      <Button
        text="Log out"
        onPress={() => {
          firebase.auth().signOut();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  header: {
    fontSize: 46,
    color: colors.black,
    alignSelf: "center",
    marginTop: 20,
  },
});
