// React native libraries import

import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

// Importing custom made variables/pages

import colors from "../constants/colors";
import Button from "../components/Button";
import LabeledInput from "../components/LabeledInput";
import validator from "validator";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Check if email and password are in valid form
const validateFields = (email, password) => {
  const isValid = {
    email: validator.isEmail(email),
    password: validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
  };
  return isValid;
};

// functions to login and to create new account

const login = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("Logged in!");
    });
};
const createAccount = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      console.log("Creating user");
      firestore().collection("users").doc(user.uid).set({});
    });
};

export default () => {
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [emailField, setEmailField] = useState({
    text: "",
    errorMessage: "",
  });
  const [passwordField, setPasswordField] = useState({
    text: "",
    errorMessage: "",
  });
  const [passwordReentryField, setPasswordReentryField] = useState({
    text: "",
    errorMessage: "",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}><Image style={{ width: 50, height: 50 }}
      source={require('../assets/adaptive-icon.png')} /> Too-Doo</Text>

      {/* Email input */}

      <View style={{ flex: 1 }}>
        <LabeledInput
          text={emailField.text}
          placeholder ="Email"
          onChangeText={(text) => {
            setEmailField({ text });
          }}
          errorMessage={emailField.errorMessage}
          placeholderStyle={styles.placeholder}
          autoCompleteType="email"
        />

        {/* Password input */}

        <LabeledInput
          text={passwordField.text}
          placeholder = "Password"
          onChangeText={(text) => {
            setPasswordField({ text });
          }}
          secureTextEntry={true}
          errorMessage={passwordField.errorMessage}
          placeholderStyle={styles.placeholder}
          autoCompleteType="password"
        />

        {/* Password re-entry input and toggle */}

        {isCreateMode && (
          <LabeledInput
            placeholder="Re-enter Password"
            text={passwordReentryField.text}
            onChangeText={(text) => {
              setPasswordReentryField({ text });
            }}
            secureTextEntry={true}
            errorMessage={passwordReentryField.errorMessage}
            labelStyle={styles.label}
          />
        )}

        {/* Login Toggle */}

        <TouchableOpacity
          onPress={() => {
            setIsCreateMode(!isCreateMode);
          }}
        >
          {/* Button text toggle */}

          <Text
            style={{
              alignSelf: "center",
              color: "#00B3FF",
              fontSize: 24,
              fontWeight: 'bold',
              margin: 10,
              marginTop: 20,
            }}
          >
            {isCreateMode ? "Already have an account?" : "Create new account"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Check for errors with email or password */}
      <Button
        onPress={() => {
          const isValid = validateFields(emailField.text, passwordField.text);
          let isAllValid = true;
          if (!isValid.email) {
            emailField.errorMessage = "Please enter a valid email.";
            setEmailField({ ...emailField });
            isAllValid = false;
          }
          if (!isValid.password) {
            passwordField.errorMessage =
              "Password have at least 8 characters long with at least 1 uppercase and lowercase letter, number and symbol.";
            setPasswordField({ ...passwordField });
            isAllValid = false;
          }
          if (isCreateMode && passwordReentryField.text != passwordField.text) {
            passwordReentryField.errorMessage = "Passwords do not match";
            setPasswordReentryField({ ...passwordReentryField });
            isAllValid = false;
          }
          if (isAllValid) {
            isCreateMode
              ? createAccount(emailField.text, passwordField.text)
              : login(emailField.text, passwordField.text);
          }
        }}
        buttonStyle={{ backgroundColor: colors.bground  }}
        text={isCreateMode ? "Create Account" : "Login"}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "stretch",
  },

  placeholder: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
    backgroundColor: "#8FDEFF", 
  },
  header: {
    fontSize: 46,
    color: colors.black,
    alignSelf: "center",
    marginTop: 20,
  },
});
