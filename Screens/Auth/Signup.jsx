import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";

import { useNavigation } from "@react-navigation/native";
// const auth = getAuth();

import { connect } from "react-redux";
import { setUser } from "../../actions";
import { bindActionCreators } from "redux";
import { createUser } from "../../Axios/user.axios";
const LoginScreen = ({ setUser }) => {
  // useEffect(() => {
  // 	const unsubscribe  = auth.onAuthStateChanged((user) => {
  // 		if (user) {
  // 			navigation.push('ProfileScreen');
  // 		}
  // 	});
  // 	return unsubscribe;
  // } , []);

  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");

  const handleLogin = async () => {
    auth
      .createUserWithEmailAndPassword(email.trim(), password.trim())
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        createUser(name, email.toLowerCase().trim()).then((res) => {
          console.log(res.data, "res");
          setUser({
            name: name,
            email: email.toLowerCase().trim(),
            _id: res.data,
          });
          navigation.push("slider");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        setErrorMessage(errorMessage);
        if (
          errorMessage ==
          "The email address is already in use by another account."
        ) {
          navigation.push("PasswordScreen");
        }
      });

    // await getCustomerWithMail(email).then((res) => {
    //   if (res[0] === undefined) {
    //     setErrorMessage("Email not found");
    //   } else {
    //     console.log("insider");
    //     // const password = email;
    //     auth
    //       .createUserWithEmailAndPassword(email.trim(), password)
    //       .then((userCredential) => {
    //         // Signed in
    //         const user = userCredential.user;
    //         console.log(user);

    //         navigation.push("ProfileScreen", {
    //           customer_id: res[0].customer_id,
    //         });
    //       })
    //       .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         console.log(error);
    //         setErrorMessage(errorMessage);
    //         if (
    //           errorMessage ==
    //           "The email address is already in use by another account."
    //         ) {
    //           navigation.push("PasswordScreen");
    //         }
    //       });
    //   }
    // });
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{
          width: "100%",
          height: Dimensions.get("window").height,
          alignItems: "center",
          justifyContent:"center"
        }}
      >
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

        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          placeholder="Enter your name"
          style={styles.input}
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <TextInput
          placeholder="Enter your email"
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          placeholder="Enter your password"
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <Text>{errorMessage}</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={{ color: "#50867a", fontWeight: "700" }}>Sign up</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const mapStateToProps = (state) => {
  return state;
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

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
    width: "80%",
    borderRadius: 30,
    marginBottom: 10,
    padding: 15,
  },
  title: {
    fontSize: 30,
    marginBottom: 50,
    color: "#000000",
    fontWeight: "700",
    // marginLeft:10
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
  text: {
    marginTop: 10,
    color: "red",
  },
});
