import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  RefreshControl,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight, faPen } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";

import { connect } from "react-redux";
import { getprofile } from "../Axios/user.axios";
const Profile = ({ user, navigation }) => {
  const [comment, setComment] = useState([]);
  const [post, setPost] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getprofile(user.user._id).then((res) => {
      setComment(res.data.comment);
      setPost(res.data.post);
    });
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    getprofile(user.user._id).then((res) => {
      setComment(res.data.comment);
      setPost(res.data.post);
    });
    setRefreshing(false);
  };
  return (
    <>
      {user && (
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <View style={styles.main}>
          <Text style={styles.profile}>Profile</Text>
          <Text style={styles.name}>{user.user.name}</Text>
          <Text style={styles.email}>{user.user.email}</Text>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-evenly",
              marginTop: 30,
              borderColor: "#e0dfdf",
              borderBottomWidth: 1,
              paddingVertical: 20,
              borderTopWidth: 1,
            }}
          >
            <View
              style={{
                alignItems: "center",
                // width: "100%",
              }}
            >
              <Text style={{ marginTop: 10, fontWeight: "700" }}>
                {post.length}
              </Text>
              <Text style={{ color: "#626262" }}>Posts</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ marginTop: 10, fontWeight: "700" }}>
                {comment.length}
              </Text>
              <Text style={{ color: "#626262" }}>Comments</Text>
            </View>
          </View>
          <View
            style={{
              width: "90%",
              backgroundColor: "white",
              padding: 20,
              height: 200,
              marginTop: 30,
              borderRadius: 20,
              elevation: 1,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.push("WriteStory")}
              style={styles.success}
            >
              <FontAwesomeIcon
                style={{
                  height: "100%",
                  color: "#767676",
                  marginRight: 20,
                  width: "20%",
                }}
                icon={faPen}
              />
              <Text>Write your success story</Text>
              <FontAwesomeIcon
                style={{
                  height: "100%",
                  color: "#767676",
                  marginLeft: "auto",
                  width: "20%",
                  marginTop: 8,
                }}
                icon={faAngleRight}
              />
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  main: {
    paddingTop: StatusBar.currentHeight,
    minHeight: Dimensions.get("window").height,
    backgroundColor: "#fbfbfb",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 60,
  },
  name: {
    color: "#000000",
    fontSize: 20,
    width: "80%",

    fontWeight: "700",
    marginTop: 40,
    textAlign: "center",
  },
  email: {
    marginTop: 10,
    color: "#949494",
  },
  profile: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: "700",
  },
  success: {
    // marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
});
const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps)(Profile);
