// React native libraries import

import { CommonActions } from "@react-navigation/routers";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

// Importing custom made variables/pages

import colors from "../constants/colors";
import ColorSelector from "../components/ColorSelector";
import Button from "../components/Button";

// Color list

const colorList = [
  "blue",
  "teal",
  "green",
  "olive",
  "yellow",
  "orange",
  "red",
  "pink",
  "purple",
  "blueGray",
];

// Code

export default ({ navigation, route }) => {
  const [title, setTitle] = useState(route.params.title || "");
  const [color, setColor] = useState(route.params.color || colors.blue);
  const [isValid, setValidity] = useState(true);

  return (
    <View style={styles.container}>
      <View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}>List Name</Text>
          {!isValid && (
            <Text
              style={{
                marginLeft: 4,
                color: colors.red,
                fontSize: 12,
              }}
            >
              * List Name cannot be empty
            </Text>
          )}
        </View>
        <TextInput
          underlineColorAndroid={"transparent"}
          selectionColor={"transparent"}
          autoFocus={true}
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            setValidity(true);
          }}
          placeholder={"New list name"}
          maxLength={30}
          style={[styles.input, { outline: "none" }]}
        />
        <Text style={styles.label}>Choose color</Text>
        <ColorSelector
          onSelect={(color) => {
            setColor(color);
            navigation.dispatch(CommonActions.setParams({ color }));
          }}
          selectedColor={color}
          colorOptions={colorList}
        />
      </View>
      <Button
        text="Add List"
        onPress={() => {
          if (title.length > 1) {
            route.params.saveChanges({ title, color });
            navigation.dispatch(CommonActions.goBack());
          } else {
            setValidity(false);
          }
        }}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 5,
    justifyContent: "space-between",
  },
  input: {
    color: colors.darkGray,
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
    marginHorizontal: 5,
    padding: 3,
    height: 30,
    fontSize: 24,
  },
  saveButton: {
    borderRadius: 25,
    backgroundColor: colors.bground,
    height: 48,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
    marginTop: 10,
  },
});
