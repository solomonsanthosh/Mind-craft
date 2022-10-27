import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,Dimensions
} from "react-native";
import React, { useState } from "react";
import { auth } from "../../firebase/firebase";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleReset = () => {
    auth
      .sendPasswordResetEmail(email.trim())
      .then(() => {
        setErrorMessage("Password reset email sent");
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(error);
        setErrorMessage(errorMessage);
      });
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",
          bottom: "-16%",
          zIndex: 1,
          opacity: 0.5,
        }}
      >
        <Image
          style={{ width: Dimensions.get("window").width, height: 300 }}
          source={require("../../assets/images/Rectangle.png")}
        />
      </View>

      <View style={{ position: "absolute", bottom: "-17%", zIndex: 1 }}>
        <Image
          style={{ width: Dimensions.get("window").width, height: 300 }}
          source={require("../../assets/images/Rectangle.png")}
        />
      </View>
      <Text style={styles.title}>Password Reset</Text>
      <TextInput
        placeholder="Enter your email"
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Text>{errorMessage}</Text>
      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={{color:'#50867a',fontWeight:'700'}}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};
export default PasswordReset;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#dadada",
    borderRadius: 30,
    width: "80%",
    marginBottom: 10,
    padding: 15,
  },
  title: {
    fontSize: 25,
    marginBottom: 50,
    color: "#000000",
    fontWeight: "700",
  },
  button: {
    borderWidth: 1,
    borderColor: "#339d48",
    padding: 10,
    width: "30%",
    margin: 5,
    color: "black",
    // textAlign: 'center',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
});
