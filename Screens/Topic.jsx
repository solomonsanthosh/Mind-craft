import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { updateTopic } from "../Axios/test.axios";
import { connect } from "react-redux";

import { setUser } from "../actions";
import { bindActionCreators } from "redux";
const Topic = ({ navigation, user, setUser }) => {
  const [pressed, setPressed] = useState(false);
  const [pressedBtn, setPressedBtn] = useState("");

  const handleSubmit = () => {
    console.log(pressedBtn.toLowerCase());
    updateTopic(user.user.email, pressedBtn.toLowerCase()).then(() => {
      setUser({
        name: user.user.name,
        email: user.user.email,
        topic: pressedBtn.toLowerCase(),
        _id: user.user._id,
      });
      navigation.navigate("Test");
    });
  };
  const handlePress = (btn, e) => {
    setPressedBtn(e);
    setPressed(true);
  };

  const topic = ["Career", "Studies", "Stress"];
  return (
    <View style={styles.main}>
      <Text style={styles.title}>How are you feeling?</Text>
      <Text style={styles.text}>
        Please choose an option to tell us what you're going through.
      </Text>
      <View style={styles.buttonView}>
        {topic.map((e) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={(btn) => handlePress(btn, e)}
              style={styles.button(e, pressed, pressedBtn)}
            >
              <Text style={styles.btnText(e, pressed, pressedBtn)}>{e}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {pressed && (
        <TouchableOpacity onPress={handleSubmit} style={styles.submit}>
          <Text style={{ color: "white", fontWeight: "600" }}>Let's go</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    paddingTop: StatusBar.currentHeight + 40,
    padding: 20,
    justifyContent: "flex-start",
    height: "100%",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontFamily: "Roboto",
    // marginLeft:10,
    fontWeight: "700",
    lineHeight: 45,
    // letterSpacing:.5
  },
  text: {
    paddingTop: 10,
    fontWeight: "300",
    fontSize: 15,
    marginBottom: 20,
    // marginLeft:10,
  },
  button: (e, pressed, pressedBtn) => ({
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 15,
    elevation: 2,
    borderColor: pressed && e == pressedBtn ? "#FF8787" : "white",
    borderWidth: 2,
    backgroundColor: "white",
    margin: 5,
    marginRight: 10,
    marginLeft: 0,
  }),
  buttonView: {
    width: "100%",
    flexDirection: "row",
    // marginLeft:0,
    flexWrap: "wrap",
  },
  btnText: (e, pressed, pressedBtn) => ({
    // color: pressed && e == pressedBtn ? "white" : "black",
  }),
  submit: {
    position: "absolute",
    right: "6%",
    bottom: "3%",
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 1,
  },
});
const mapStateToProps = (state) => {
  return { user: state.user };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setUser,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Topic);
