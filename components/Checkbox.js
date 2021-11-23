// React native libraries import

import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Importing custom made variables/pages

import colors from '../constants/colors';

// Main code

export default ({isChecked, onChecked, ...props}) => {
    return(
        <TouchableOpacity style={styles.checkbox} onPress={onChecked}>
            <Text style={colors.lightGray}>{isChecked ? "✓" : ""}</Text>
        </TouchableOpacity>
    );
}   

// Styles

const styles = StyleSheet.create({
    checkbox: {
      width: 20,
      height: 20,
      margin: 5,
      backgroundColor: "#fff0",
      color: colors.lightGray,
      borderWidth: 1,
      borderRadius: 3,
      borderColor: colors.lightGray,
      alignItems: "center",
      justifyContent: "center",
    },
  });