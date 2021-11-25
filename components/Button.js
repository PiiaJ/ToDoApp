// React native libraries import

import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

// Importing custom made variables/pages

import colors from "../constants/colors";

export default ({ buttonStyle, textStyle, onPress, text }) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    borderRadius: 20,
    backgroundColor: colors.bground,
    height: 48,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 1.25,
    shadowRadius: 1.84,
    elevation: 5,
  },
  text: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
  },
});
