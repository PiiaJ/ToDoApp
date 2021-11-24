// React native libraries import

import React, { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Importing custom made variables/pages

import colors from "../constants/colors";
import ToDoItem from "../components/ToDoItem";

// Render + button

const renderAddListIcon = (addItem) => {
  return (
    <TouchableOpacity
      onPress={() => addItem({ text: "", isChecked: false, isNewItem: true })}
    >
      <Text style={styles.icon}>+</Text>
    </TouchableOpacity>
  );
};

// Main code

export default ({ navigation }) => {
  const [toDoItems, setToDoItems] = useState([]);
  // Function that adds a list to a lists array

  const addItemToList = (item) => {
    toDoItems.push(item);
    setToDoItems([...toDoItems]);
  };

  // Function that deletes the list from the list of lists

  const removeItemFromLists = (index) => {
    toDoItems.splice(index, 1);
    setToDoItems([...toDoItems]);
  };

  // This code is triggered by other code and renders the "+" button on the right side of the main header at "home"

  const updateItem = (index, item) => {
    toDoItems[index] = item;
    setToDoItems([...toDoItems]);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => renderAddListIcon(addItemToList),
    });
  });
  return (
    <View style={styles.container}>
      <FlatList
        data={toDoItems}
        renderItem={({ item: { text, isChecked, isNewItem }, index }) => {
          return (
            <ToDoItem
              text={text}
              isChecked={isChecked}
              isNewItem={isNewItem}
              onChecked={() => {
                const toDoItem = toDoItems[index];
                toDoItem.isChecked = !isChecked;
                updateItem(index, toDoItem);
              }}
              onChangeText={(newText) => {
                const toDoItem = toDoItems[index];
                toDoItem.text = newText;
                updateItem(index, toDoItem);
              }}
              onDelete={() => {
                removeItemFromLists(index);
              }}
            />
          );
        }}
      />
    </View>
  );
};

// Styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  icon: {
    padding: 5,
    fontSize: 32,
    color: "white",
  },
});
