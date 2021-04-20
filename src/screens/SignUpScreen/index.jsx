import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";

import { signUpWithEmailAsync } from "../../utils/firebase";
import { confirmPasswordValidator, emailValidator, nameValidator, passwordValidator } from "../../utils/validators";
import { DispatchContext } from "../../contexts/appContext";
import { setSnackbar } from "../../reducers/reducer";

import Background from "../../components/Background";
import Header from "../../components/Header";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    marginTop: 4,
    alignSelf: "center"
  },
  scrollBar: {
    flex: 1,
    width: "100%"
  }
});

const SignUpScreen = ({ navigation }) => {
  const theme = useTheme();
  const dispatch = React.useContext(DispatchContext);
  const [name, setName] = React.useState({ value: "", error: "" });
  const [email, setEmail] = React.useState({ value: "", error: "" });
  const [password, setPassword] = React.useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = React.useState({ value: "", error: "" });
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const confirmPasswordError = confirmPasswordValidator(password.value, confirmPassword.value);

    if (nameError || emailError || passwordError || confirmPasswordError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setConfirmPassword({ ...confirmPassword, error: confirmPasswordError });
    }
    else {
      try {
        await signUpWithEmailAsync(email.value, password.value, name.value);
        dispatch(setSnackbar(true, "Your account has been created"));
      }
      catch (error) {
        dispatch(setSnackbar(true, error.message));
      }
    }
  };

  const togglePassword = () => setShowPassword(!showPassword);

  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <Background>
      <Header>Sign Up</Header>

      <ScrollView
        style={styles.scrollBar}
        centerContent={true}
      >
        <TextInput
          label="Name"
          returnKeyType="next"
          autoCapitalize="words"
          value={name.value}
          onChangeText={text => setName({ value: text, error: "" })}
          error={!!name.error}
          errorText={name.error}
        />

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
          returnKeyType="next"
          value={password.value}
          onChangeText={text => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry={!showPassword}
          rightIcon={showPassword ? "eye-off" : "eye"}
          toggleText={togglePassword}
        />

        <TextInput
          label="Confirm password"
          returnKeyType="done"
          value={confirmPassword.value}
          onChangeText={text => setConfirmPassword({ value: text, error: "" })}
          error={!!confirmPassword.error}
          errorText={confirmPassword.error}
          secureTextEntry={!showConfirmPassword}
          rightIcon={showConfirmPassword ? "eye-off" : "eye"}
          toggleText={toggleConfirmPassword}
        />

        <Button mode="contained" onPress={handleSignUpPressed}>
          Sign up
        </Button>

        <View style={styles.rowContainer}>
          <Text style={{ color: theme.colors.text }}>{"Already have an account? "}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={{ color: theme.colors.primary, fontWeight: "bold" }}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Background>
  );
};

export default SignUpScreen;