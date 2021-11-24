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
    borderRadius: 25,
    backgroundColor: colors.darkGray,
    height: 48,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});