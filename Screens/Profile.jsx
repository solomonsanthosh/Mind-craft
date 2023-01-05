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
  Button,
  Image,
} from "react-native";
import { AsyncStorage } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faAngleRight,
  faPen,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
// import { faRight } from "@fortawesome/free-regular-svg-icons";
import * as DocumentPicker from "expo-document-picker";
import { storageRef, storage } from "../firebase/firebase";
import * as ExpoFileSystem from "expo-file-system";
import { connect } from "react-redux";
import { getprofile, updateImage } from "../Axios/user.axios";
import { updateTopic } from "../Axios/test.axios";
import { setUser } from "../actions";
const Profile = ({ user, navigation }) => {
  const [comment, setComment] = useState([]);
  const [post, setPost] = useState([]);
  const [userProfile, setUserProfile] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [fileResponse, setFileResponse] = useState();
  const refRBSheet = useRef();
  useEffect(() => {
    getprofile(user.user._id).then((res) => {
      setComment(res.data.comment);
      setPost(res.data.post);
      setUserProfile(res.data.user);
      console.log(res.data.user);
    });
  }, [fileResponse]);

  const handleDocumentSelection = async () => {
    console.log(fileResponse, "res");
    let result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });
    console.log(result);
    const fileContent = await ExpoFileSystem.readAsStringAsync(result.uri);

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", result.uri, true);
      xhr.send(null);
    });
    setFileResponse({
      name: result.name,
      blob: blob,
    });
    refRBSheet.current.close();
  };
  const imgSave = async () => {
    if (fileResponse.name) {
      const ref = storageRef.child(fileResponse.name);
      const snapshot = await ref.put(fileResponse.blob);
      var url = await snapshot.ref.getDownloadURL();
      console.log(url, "url");

      updateImage(user.user.email, url);
      var imageRef = storage.refFromURL(userProfile.image);
      imageRef
        .delete()
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
      setFileResponse(null);
    } else {
      url = "NULL";
    }
  };
  const onRefresh = () => {
    setRefreshing(true);
    getprofile(user.user._id).then((res) => {
      setComment(res.data.comment);
      setPost(res.data.post);
      setUserProfile(res.data.user);
    });
    setRefreshing(false);
  };
  const deleteImage = () => {
    var imageRef = storage.refFromURL(userProfile.image);
    imageRef
      .delete()
      .then(() => {
        var img = null;
        updateImage(user.user.email, img);
        setFileResponse(null);
        refRBSheet.current.close();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null)
      navigation.push('Login')
    } catch (err) {
      console.log('====================================');
      console.log(err);
      console.log('====================================');
    }
  };
  return (
    <>
      {user && (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.main}>
            <Text style={styles.profile}>Profile</Text>
            <View style={styles.img}>
              <Image
                style={{ width: "100%", height: "100%", borderRadius: 100 }}
                source={{
                  uri:
                    userProfile && userProfile.image != null
                      ? userProfile.image
                      : "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg",
                }}
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  width: 30,
                  height: 30,
                  top: "50%",

                  transform: [{ translateY: -15 }],
                  right: "-15%",
                  backgroundColor: "white",
                  borderRadius: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: "black",
                  borderWidth: 1,
                }}
                // title={
                //   fileResponse && fileResponse.name
                //     ? `${fileResponse.name}`
                //     : "Choose a File"
                // }
                // onPress={handleDocumentSelection}
                onPress={() => refRBSheet.current.open()}
              >
                <FontAwesomeIcon
                  style={{ height: "100%", color: "#000000" }}
                  icon={faPen}
                />
              </TouchableOpacity>
            </View>
            {fileResponse ? (
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <TouchableOpacity
                  style={{ padding: 10 }}
                  onPress={() => setFileResponse(null)}
                >
                  <Text style={{ color: "#3678ad" }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 10 }} onPress={imgSave}>
                  <Text style={{ color: "#3678ad" }}>Save</Text>
                </TouchableOpacity>
              </View>
            ) : null}
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
              <TouchableOpacity onPress={logout} style={styles.success}>
                <FontAwesomeIcon
                  style={{
                    height: "100%",
                    color: "#767676",
                    marginRight: 20,
                    width: "20%",
                  }}
                  icon={faRightFromBracket}
                />
                <Text>Log out</Text>
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
            <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={false}
              customStyles={{
                wrapper: {
                  backgroundColor: "transparent",
                },
                draggableIcon: {
                  backgroundColor: "#000",
                },
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "flex-start",
                  height: "100%",
                }}
              >
                <TouchableOpacity
                  onPress={handleDocumentSelection}
                  style={{ padding: 20 }}
                >
                  <Text style={{ fontWeight: "500" }}>Change Image</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteImage} style={{ padding: 20 }}>
                  <Text style={{ fontWeight: "500" }}>Delete Image</Text>
                </TouchableOpacity>
              </View>
            </RBSheet>
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
  img: {
    width: 100,
    height: 100,
    marginVertical: 15,
  },
});
const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps)(Profile);
