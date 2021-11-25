// React native libraries import

import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

// Importing custom made variables/pages

import colors from "../constants/colors";

export default ({
  labelStyle,
  label,
  errorMessage,
  inputStyle,
  text,
  onChangeText,
  ...inputProps
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={labelStyle}>{label}</Text>
        <Text style={styles.error}> {errorMessage && `*${errorMessage}`}</Text>
      </View>
      <TextInput
        underlineColorAndroid="transparent"
        selectionColor="transparent"
        style={[styles.input, inputStyle]}
        value={text}
        onChangeText={onChangeText}
        {...inputProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    margin: 4,
  },
  labelContainer: {
    flexDirection: "row",
    marginBottom: 4,
  },
  error: {
    color: colors.red,
    fontSize: 12,
    marginLeft: 4,
  },
  input: {
    borderColor: colors.bground,
    borderWidth: 1,
    paddingLeft: 15,
    height: 45,
    fontSize: 20,
    color: colors.black,
    backgroundColor: "#CCF0FF",
    borderRadius: 20,
  },
});
