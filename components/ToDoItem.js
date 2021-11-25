// React native libraries import

import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// Importing custom made variables/pages

import colors from '../constants/colors';
import Checkbox from './Checkbox';


// 

const EditableText = ({isChecked, onChangeText, text, ...props}) => {
    const [isEditMode, setEditMode] = useState(props.new);
    return(
        <TouchableOpacity style={{flex:1}} onPress={() => !isChecked && setEditMode(true)}>
        {isEditMode ? (
            <TextInput
                underlineColorAndroid={"transparent"}
                selectionColor={"transparent"}
                autoFocus={true}
                value={text}
                onChangeText={onChangeText}
                placeholder={"Add new item here"}
                onSubmitEditing={()=> {}}
                maxLength={30}
                style={[styles.input, {outline: "none"}]}
                onBlur={() => {
                    props.onBlur && props.onBlur();
                    setEditMode(false);
                }}
            /> 
            ): (
            <Text
            style={[
                styles.text,
                {
                    color: isChecked ? colors.lightGray : colors.black,
                    textDecorationLine: isChecked ? "line-through" : "none",
                },
            ]}
        >
            {text}
        </Text>
        )}
    </TouchableOpacity>
    );
};

// Main code
export default ({text, isChecked, onChecked, onChangeText, onDelete, ...props}) => {
    console.log(props.new);
    return(
        <View style={styles.container}>
            <View style={{flexDirection: "row", flex: 1}}>
                <Checkbox isChecked={isChecked} onChecked={onChecked} />
                <EditableText 
                    text={text} 
                    onChangeText={onChangeText} 
                    isChecked={isChecked} 
                    {...props}
                />
            </View>
            <TouchableOpacity onPress={onDelete}>
<<<<<<< HEAD
                <MaterialIcons name="delete-forever" size={24} color="black" />
=======
                <MaterialIcons style={styles.icon} name="delete-forever" size={22} color="black" />
>>>>>>> 807f70f8da61c0c5dc5de3d9014516efaceaf094
            </TouchableOpacity>
        </View>
    );
};

// Styles

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderBottomColor: colors.lightGray,
        borderBottomWidth: 1,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
    },
    icon: {
        padding: 5,
        marginEnd: 20,
    },
    input: {
        color: colors.black,
        borderBottomColor: colors.lightGray,
        borderBottomWidth: 0.5,
        marginHorizontal: 5,
        padding: 3,
        height: 25,
        fontSize: 16,
    },
    text: {
        padding: 5.5,
        fontSize: 16,
    },
});