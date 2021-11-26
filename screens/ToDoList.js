// React native libraries import
import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  onSnapshot,
  addDoc,
  removeDoc,
  updateDoc,
} from "../services/collections";

// Importing custom made variables/pages

import colors from "../constants/colors";
import ToDoItem from "../components/ToDoItem";
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
// Render + button

const renderAddListIcon = (addItem) => {
  return (
    <TouchableOpacity onPress={() => addItem()}>
      <Text style={styles.icon}>+</Text>
    </TouchableOpacity>
  );
};

// Main code

export default ({ navigation, route }) => {
  let [toDoItems, setToDoItems] = useState([]);
  const [newItem, setNewItem] = useState();
  // Function that adds a list to a lists array
  const toDoItemsRef = firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .collection("lists")
    .doc(route.params.listId)
    .collection("toDoItems");

  useEffect(() => {
    onSnapshot(
      toDoItemsRef,
      (newToDoItems) => {
        setToDoItems(newToDoItems);
      },
      {
        sort: (a, b) => {
          if (a.isChecked && !b.isChecked) {
            return 1;
          }
          if (b.isChecked && !a.isChecked) {
            return -1;
          }
          return 0;
        },
      }
    );
  }, []);

  const addItemToList = () => {
    setNewItem({ text: "", isChecked: false, new: true });
  };

  // Function that deletes the list from the list of lists

  const removeItemFromLists = (index) => {
    toDoItems.splice(index, 1);
    setToDoItems([...toDoItems]);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => renderAddListIcon(addItemToList),
    });
  });

  if (newItem) {
    toDoItems = [newItem, ...toDoItems];
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={toDoItems}
        renderItem={({ item: { id, text, isChecked, ...params }, index }) => {
          return (
            <ToDoItem
              {...params}
              text={text}
              isChecked={isChecked}
              onChecked={() => {
                let data = { text, isChecked: !isChecked };
                if (id) {
                  data.id = id;
                }
                addDoc(toDoItemsRef, data);
              }}
              onChangeText={(newText) => {
                if (params.new) {
                  setNewItem({
                    text: newText,
                    isChecked,
                    new: params.new,
                  });
                } else {
                  toDoItems[index].text = newText;
                  setToDoItems([...toDoItems]);
                }
              }}
              onDelete={() => {
                params.new ? setNewItem(null) : removeItemFromLists(index);
                id && removeDoc(toDoItemsRef, id);
              }}
              onBlur={() => {
                if (text.length > 1) {
                  let data = { text, isChecked };
                  if (id) {
                    data.id = id;
                  }
                  addDoc(toDoItemsRef, data);
                  params.new && setNewItem(null);
                } else {
                  params.new ? setNewItem(null) : removeItemFromLists(index);
                }
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
    paddingEnd: 0,
    marginEnd: 20,
    fontSize: 40,
    color: "black",
  },
});
