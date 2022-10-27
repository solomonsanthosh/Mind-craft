import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { createPost } from "../../Axios/post.axios";
import { connect } from "react-redux";
const CreatePost = ({ navigation, user }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleSubmit = async () => {
    const post = {
      topic: user.user.topic,
      owner: user.user._id,
      title: title.trim(),
      content: content.trim(),
    };
    if (title.length > 0 && content.length > 0) {
      await createPost(post).then((res) => {navigation.navigate("Connect")});
      navigation.navigate("Connect");
    }
  };
  return (
    <ScrollView>
      <View style={styles.main}>
        <View
          style={{
            width: "90%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            // justifyContent:"flex-between"
          }}
        >
          <Text style={{ fontWeight: "700", marginTop: 20 }}>Create Post</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              style={{ height: "100%", marginTop: 20 }}
              icon={faRightFromBracket}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          multiline
          maxLength={100}
          value={title}
          onChangeText={(text) => {
            setTitle(text);
          }}
          style={styles.title}
          placeholder="Enter a title"
        />
        <TextInput
          multiline
          value={content}
          placeholder="Say something...."
          onChangeText={(text) => {
            setContent(text);
          }}
          style={styles.content}
        />
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            backgroundColor: "#339d48",
            paddingVertical: 8,
            borderRadius: 50,
            paddingHorizontal: 20,
            marginLeft: "auto",
            marginRight: 20,
            marginTop: 20,
          }}
        >
          <Text style={{ color: "white", fontWeight: "400" }}>Add post</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  main: {
    marginTop: StatusBar.currentHeight,
    backgroundColor: "white",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    height: Dimensions.get("window").height,
  },
  title: {
    width: "90%",
    backgroundColor: "#efefef",
    padding: 20,
    borderRadius: 10,
    lineHeight: 25,
    flexWrap: "wrap",
    marginVertical: 20,
  },
  content: {
    width: "90%",
    backgroundColor: "#efefef",
    padding: 20,
    borderRadius: 10,
    lineHeight: 25,
    minHeight: 200,
    alignItems: "flex-start",
  },
});
const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps)(CreatePost);
