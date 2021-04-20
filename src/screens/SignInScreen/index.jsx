import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";

import { DispatchContext } from "../../contexts/appContext";
import { setSnackbar } from "../../reducers/reducer";
import { signInWithEmailAsync } from "../../utils/firebase";
import { emailValidator, passwordValidator } from "../../utils/validators";

import Background from "../../components/Background";
import Header from "../../components/Header";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    marginTop: 4
  }
});

const SignInScreen = ({ navigation }) => {
  const theme = useTheme();
  const dispatch = React.useContext(DispatchContext);
  const [email, setEmail] = React.useState({ value: "", error: "" });
  const [password, setPassword] = React.useState({ value: "", error: "" });
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSignInPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
    }
    else {
      try {
        await signInWithEmailAsync(email.value, password.value);
      }
      catch (error) {
        if (error.code === "auth/user-not-found") {
          dispatch(setSnackbar(true, "Email is not found"));
        }
        else if (error.code === "auth/wrong-password") {
          dispatch(setSnackbar(true, "Password is incorrect"));
        }
      }
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Background>
      <Image
        style={{ transform: [{ scale: 0.7 }] }}
        source={require("../../../assets/contact_plus.png")}
      />

      <Header>Sign In</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry={!showPassword}
        rightIcon={showPassword ? "eye-off" : "eye"}
        toggleText={togglePassword}
      />

      <Button mode="contained" onPress={handleSignInPressed}>
        Sign in
      </Button>

      <View style={styles.rowContainer}>
        <Text style={{ color: theme.colors.text }}>{"Don't have an account? "}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={{ color: theme.colors.primary, fontWeight: "bold" }}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default SignInScreen;