import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Alert, Image, StatusBar } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { useAuth } from "../providers/AuthProvider";
import styles from "../stylesheet";

export function WelcomeView({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signUp, signIn } = useAuth();

  useEffect(() => {
    // If there is a user logged in, go to the Organizations page.
    if (user != null) {
      navigation.navigate("Organizations");
    }
  }, [user]);

  // The onPressSignIn method calls AuthProvider.signIn with the
  // email/password in state.
  const onPressSignIn = async () => {
    console.log("Press sign in");
    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert(`Failed to sign in: ${error.message}`);
    }
  };

  // The onPressSignUp method calls AuthProvider.signUp with the
  // email/password in state and then signs in.
  const onPressSignUp = async () => {
    try {
      await signUp(email, password);
      signIn(email, password);
    } catch (error) {
      Alert.alert(`Failed to sign up: ${error.message}`);
    }
  };

  return (
    <View style={styles.signInContainer}>
      <StatusBar
        hidden={true} />
      <View style={styles.signIn}>
        <Text style={styles.welcomeMessage}>Hello</Text>
        <Text style={styles.welcomeMessageDirective}>Sign into your account.</Text>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={setEmail}
            value={email}
            placeholder="email"
            style={styles.inputStyle}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder="password"
            style={styles.inputStyle}
            secureTextEntry
          />
        </View>
        <TouchableNativeFeedback style={styles.signInButton} onPress={onPressSignIn}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback style={styles.signUpButton} onPress={onPressSignUp}><Text style={styles.signUpButtonText}>Don't have an account? Create account.</Text></TouchableNativeFeedback>
      </View>
    </View>
  );
}
