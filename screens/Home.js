// React native libraries import

import React, { useLayoutEffect, useState , useEffect} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { onSnapshot, addDoc, removeDoc, updateDoc } from "../services/collections";
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Importing custom made variables/pages
import color from "../constants/colors";

// This code creates the actual "list" and applies buttons to it

const ListButton = ({ title, color, onPress, onDelete, onOptions }) => {
  return (
    <TouchableOpacity
      style={[styles.itemContainer, { backgroundColor: color }]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.itemTitle}>{title}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={onOptions}>
          <Ionicons name="options-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Ionicons name="trash-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

// This code renders "+" and settings button at the header

const renderAddListIcon = (navigation, addItemToList) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        style={{ justifyContent: "center", marginRight: 4 }}
        onPress={() => navigation.navigate("Settings")}
      >
        <Ionicons name="settings" size={24} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Edit", { saveChanges: addItemToList })
        }
        style={{ justifyContent: "center", marginRight: 8 }}
      >
        <Text style={styles.icon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

// This happens on "Home.js" load
export default ({ navigation }) => {
  // List of a list in array
  const [lists, setLists] = useState([]);
  const listRef = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("lists");

  useEffect(() => {
    onSnapshot(listRef, (newLists) => {
      setLists(newLists);
    }, {
      sort: (a,b) => {
          if(a.index < b.index) {
            return -1;
          }
          if(a.index > b.index) {
            return 1;
          }
          return 0;
      }
    })
  }, [])

  // Function that adds a list to a lists array

  const addItemToList = ({title, color}) => {
    const index =lists.length > 1 ? lists[lists.length - 1].index + 1 : 0;
    addDoc(listRef, {title, color, index})
  };

  // Function that deletes the list from the list of lists

  const removeItemFromLists = (id) => {
    removeDoc(listRef, id)
  };

  // This code updates item

  const updateItemFromLists = (id, item) => {
    updateDoc(listRef, id, item);
  };

  // This code is triggered by other code and renders the "+" button on the right side of the main header at "home"

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => renderAddListIcon(navigation, addItemToList),
    });
  });

  return (
    // Rendering the lists based on the lists array
    <View style={styles.container}>
      <FlatList
        data={lists}
        renderItem={({ item: { title, color, id, index }}) => {
          return (
            <ListButton
              title={title}
              color={color}
              navigation={navigation}
              onPress={() => {
                navigation.navigate("ToDoList", { title, color, listId: id,});
              }}
              onOptions={() => {
                navigation.navigate("Edit", {
                  title,
                  color,
                  saveChanges: (newItem) => updateItemFromLists(id, {index, ...newItem}),
                });
              }}
              onDelete={() => removeItemFromLists(id)}
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
    backgroundColor: "#fff",
  },
  itemTitle: { fontSize: 24, padding: 5, color: "black" },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
    flex: 1,
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
  },
  icon: {
    padding: 10,
    fontSize: 30,
    marginEnd: 20,
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
