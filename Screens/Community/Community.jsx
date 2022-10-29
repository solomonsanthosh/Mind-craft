import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from "react-native";
import SimpleDateTime from "react-simple-timestamp-to-date";
import React, { useState, useEffect } from "react";
import { getPost } from "../../Axios/post.axios";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { connect } from "react-redux";
const Community = ({ navigation, user }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getPost(user.user.topic).then((res) => {
        console.log("====================================");
        console.log(res.data, "post");
        console.log("====================================");
        setContent(res.data);
        setIsLoading(false)
      });
    });
    return unsubscribe;
  }, [navigation]);
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  return (
    <>
      {content && !isLoading ? (
    <ScrollView>
        <View style={styles.main}>
          <TouchableWithoutFeedback
            onPress={() => navigation.push("CreatePost")}
          >
            <View style={styles.postmain}>
              <View style={styles.post}>
                <Text style={{ color: "#ffffff", textAlign: "center" }}>
                  what you want to ask or share?
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          {content.map((post) => (
            <Card navigation={navigation} post={post} />
          ))}
        </View>
          </ScrollView>
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
const Card = ({ post, navigation }) => {
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
        <View
          style={{ width: "90%", flexDirection: "row", alignItems: "center" }}
        >
          <Image
            style={{
              height:40,
              color: "#767676",
              marginRight: 15,
              width: 40,
              borderRadius:100
            }}
            source={{
              uri: post.owner.image
            }}
          />
          <Text>
            {post.owner.name}{" "}
            <Text style={{ color: "#0089e4", fontSize: 13 }}>
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

          {post.content.length > 280 ? (
            <Text style={styles.content}>
              {post.content.substring(0, 280) + "..."}
              <Text style={{ color: "#0089e4" }}> Read more</Text>
            </Text>
          ) : (
            <Text>{post.content}</Text>
          )}

          <View style={{ marginTop: 10 }}>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => navigation.navigate("SinglePost", { post: post })}
            >
              <FontAwesomeIcon
                style={{ height: "100%", color: "#767676" }}
                icon={faComment}
              />
              <Text
                style={{
                  paddingHorizontal: 8,
                  height: "100%",
                  color: "#767676",
                }}
              >
                {post.comments.length}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    width: "93%",
    marginLeft: "auto",
    marginRight: "auto",
    maxHeight: 280,
    backgroundColor: "white",
    padding: 20,
    marginTop: 6,
    borderRadius: 5,
    elevation: 1,
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
    paddingBottom: 60,
  },
  postmain: {
    backgroundColor: "#ffffff",
    width: "93%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    padding: 12,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
  },
  post: {
    backgroundColor: "#6997d7",
    borderRadius: 100,
    padding: 8,
    width: "90%",
  },
});
const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps)(Community);
