import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import React, { useState } from "react";
import { auth } from "../../firebase/firebase";

import { connect } from "react-redux";
import { setUser } from "../../actions";
import { bindActionCreators } from "redux";
import { getSingleUser } from "../../Axios/user.axios";

const Login = ({ navigation, setUser }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleLogin = async () => {
    auth
      .signInWithEmailAndPassword(email.trim(), password.trim())
      .then(async (userCredential) => {
        const user = userCredential.user;

        console.log("====================================");
        console.log(email.toLowerCase().trim());
        console.log("====================================");
        setLoading(true)

        getSingleUser(email.toLowerCase().trim()).then((res) => {
          setUser(res.data);
          navigation.push("Tabs");
          setLoading(false)
        });
      })

      .catch((error) => {
        const errorCode = error.code;
        console.log(error);
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
      });
  };

  return (
    <>
      {!loading ? (
        <View style={styles.container}>
          <KeyboardAvoidingView
            style={{
              width: "100%",
              padding: 30,
              height: Dimensions.get("window").height,
              alignItems: "flex-start",
              justifyContent: "center",
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
            <Text style={styles.title}>Login</Text>
            <TextInput
              placeholder="Enter your email"
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
              value={email}
              keyboardType="email-address"
            />
            <TextInput
              placeholder="Enter your password"
              style={styles.input}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              value={password}
            />
            <Text>{errorMessage}</Text>
            <View style={styles.allbutton}>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={{ color: "#50867a", fontWeight: "700" }}>
                  Login
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.push("Signup")}
              >
                <Text style={{ color: "#50867a", fontWeight: "700" }}>
                  Sign up
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.push("reset")}
              >
                <Text style={{ color: "#50867a", fontWeight: "700" }}>
                  Reset Password?
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <ActivityIndicator
            style={{ flex: 1, alignSelf: "center" }}
            size="large"
            color="#0089e4"
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",

    zIndex: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: "#dadada",
    borderRadius: 30,
    width: "100%",
    marginBottom: 10,
    padding: 15,
  },
  title: {
    fontSize: 30,
    marginBottom: 30,
    color: "#000000",
    fontWeight: "700",
    marginLeft: 10,
  },
  allbutton: {
    // flexDirection: "row",
    // justifyContent: "center",
    // alignContent: "center",
    width: "100%",
    zIndex: 100,
  },
  button: {
    borderWidth: 1,
    borderColor: "#339d48",
    padding: 20,
    width: "100%",
    marginTop: 20,
    zIndex: 100,

    // textAlign: 'center',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    // borderTopEndRadius: 20,
    // borderBottomLeftRadius: 20,
    // color: 'white'
  },
  text: {
    marginTop: 10,
    color: "red",
  },
});
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);
