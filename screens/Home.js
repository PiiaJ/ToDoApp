// React native libraries import

import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Importing custom made variables/pages

import colors from '../constants/colors';


// This code creates the actual "list" and applies buttons to it

const ListButton = ({title, color, onPress, onDelete, onOptions}) => {
    return (           
        <TouchableOpacity 
            style={[styles.itemContainer, {backgroundColor: color}]}
            onPress={onPress}
        >
            <View>
                <Text style={styles.itemTitle}>{title}</Text>
            </View>
            <View style={{flexDirection:"row"}}>
                <TouchableOpacity onPress={onOptions}>
                    <Ionicons name="options-outline" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete}>
                    <Ionicons name="trash-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

// This code renders "+" button at the header

const renderAddListIcon = (navigation, addItemToList) => {
    return(
        <TouchableOpacity onPress={() => navigation.navigate("Edit", {saveChanges: addItemToList})}>
            <Text style={styles.icon}>+</Text>
        </TouchableOpacity>
    )
}

// This happens on "Home.js" load 
export default ({navigation}) => {

    // List of a list in array
    const [lists, setLists] = useState([
        {title: "School", color: colors.red},
        {title: "Fun", color: colors.green},
        {title: "Work", color: colors.blue}
    ]);

    // Function that adds a list to a lists array

    const addItemToList = (item) => {
        lists.push(item);
        setLists([...lists]);
    }

    // Function that deletes the list from the list of lists 

    const removeItemFromLists = (index) => {
        lists.splice(index, 1);
        setLists([...lists]);
    }

    // This code updates item

    const updateItemFromLists = (index, item) => {
        lists[index] = item;
        setLists([...lists]);
    }

    // This code is triggered by other code and renders the "+" button on the right side of the main header at "home"

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => renderAddListIcon(navigation, addItemToList)
        })
    })

    return  (
    // Rendering the lists based on the lists array
        <View style={styles.container}>
            <FlatList 
                data={lists}
                renderItem={({item: {title, color}, index}) => {
                    return(
                        <ListButton 
                            title={title} 
                            color={color} 
                            navigation={navigation}
                            onPress={() => {navigation.navigate("ToDoList", {title, color})}}
                            onOptions={() => {navigation.navigate("Edit", {title, color, saveChanges: (item) => updateItemFromLists(index, item)})}}
                            onDelete={() => removeItemFromLists(index)}    
                        />
                    );
                }}
            />
        </View>

    );
  }


// Styles 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    itemTitle: { fontSize: 24, padding: 5, color: "white" },
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
        padding: 5,
        fontSize: 24,
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