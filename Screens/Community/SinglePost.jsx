import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { faComment  } from '@fortawesome/free-solid-svg-icons'
import SimpleDateTime from "react-simple-timestamp-to-date";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { createComment, getComment } from "../../Axios/post.axios";
const SinglePost = ({ route, user, navigation }) => {
  const { post } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  console.log(route.params);
  const [content, setContent] = useState("");
  const [comment, setComment] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    getComment(post._id).then((res) => {
      setComment(res.data);
      setIsLoading(false)
    });
  }, [navigation, setModalVisible, comment]);
  const handleSubmit = () => {
    const comment = {
      topic: post.topic,
      owner: user.user._id,
      post: post._id,
      content: content,
    };
    if (content.length > 1) {
      createComment(post._id, comment).then((res) => {
        setModalVisible(false);
        setContent("");
        navigation.navigate("SinglePost", { post: post });
      });
    }
  };
  return (
    <ScrollView>
      <KeyboardAvoidingView>
        <View style={styles.main}>
          {post && <Card post={post} />}
          <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
            <View style={styles.postmain}>
              <View style={styles.post}>
                <Text style={{ color: "#636363", textAlign: "center" }}>
                  Write a comment..
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <Text style={{ color: "#545454", marginLeft: 10 }}>Comments</Text>

          <View>
            {comment && !isLoading ? (
              comment.map((e) => {
                return <CommentCard comment={e} />;
              })
            ) : (
              <View style={{ flex: 1 }}>
                <ActivityIndicator
                  style={{ flex: 1, alignSelf: "center" }}
                  size="large"
                  color="#0089e4"
                />
              </View>
            )}
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modal}>
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
                <Text style={{ color: "white", fontWeight: "400" }}>
                  Add comment
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
const Card = ({ post }) => {
  var date = post.created_at;
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    hour12: true,
  };

  var newDate = new Date(date).toLocaleDateString(undefined, options);
  console.log(newDate);

  return (
    <View style={styles.card}>
      <View>
        <Text>
          {post.owner.name}{" "}
          <Text style={{ color: "#0089e4" }}>
            {" "}
            <SimpleDateTime
              dateFormat="DMY"
              timeFormat=""
              dateSeparator="/"
              timeSeparator=":"
            >
              {post.created_at}
            </SimpleDateTime>
          </Text>
        </Text>
      </View>
      <View>
        <Text style={styles.title}>{post.title}</Text>

        <Text>{post.content}</Text>
      </View>
    </View>
  );
};

const CommentCard = ({ comment }) => {
  return (
    <View style={styles.commentCard}>
      <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
        <View>
          <FontAwesomeIcon
            style={{
              height: "100%",
              color: "#767676",
              marginRight: 20,
              marginTop: 8,
              width: "20%",
            }}
            icon={faUser}
          />
        </View>
        <View style={{ width: "90%" }}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "flex-start",
              paddingVertical: 3,
            }}
          >
            <Text style={styles.commentName}>{comment.owner.name}</Text>
            <Text
              style={{
                color: "#0089e4",
                fontWeight: "300",
                marginLeft: 30,
                fontSize: 15,
              }}
            >
              <SimpleDateTime
                dateFormat="DMY"
                timeFormat=""
                dateSeparator="/"
                timeSeparator=":"
              >
                {comment.created_at}
              </SimpleDateTime>
            </Text>
          </View>
          <Text style={styles.commentContent}>{comment.content}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    width: "100%",

    backgroundColor: "white",
    padding: 20,
    marginTop: 8,
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    marginVertical: 5,
  },
  content: {
    lineHeight: 25,
  },
  main: {
    paddingTop: StatusBar.currentHeight,
  },
  postmain: {
    backgroundColor: "#ffffff",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    padding: 15,
    marginVertical: 8,
  },
  post: {
    backgroundColor: "#efefef",
    borderRadius: 100,
    padding: 10,
    width: "90%",
  },
  modal: {
    backgroundColor: "white",
    height: "50%",
    marginTop: "auto",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  content: {
    width: "100%",
    backgroundColor: "#efefef",
    padding: 20,
    borderRadius: 10,
    lineHeight: 25,
    height: "60%",
    alignItems: "flex-start",
  },
  commentCard: {
    backgroundColor: "white",
    padding: 5,
    paddingHorizontal: 15,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginVertical: 2,
  },
  commentName: {
    fontWeight: "700",
  },
  commentContent: {
    paddingVertical: 7,
    lineHeight: 25,
  },
});
const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps)(SinglePost);
