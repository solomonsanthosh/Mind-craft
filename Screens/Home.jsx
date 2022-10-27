import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  Linking,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  RefreshControl
  
} from "react-native";



import MyCarousel from "../Components/carousel";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";

import { getMusic } from "../Axios/music.axios";
import { getActivity } from "../Axios/activity.axios";
import { getStory } from "../Axios/post.axios";


const Home = ({ user }) => {
  const [refreshing, setRefreshing] = useState(false);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [music, setMusic] = useState([]);
  const [activity, setActivity] = useState([]);
  const [story,setStory] = useState([]);
  useEffect(() => {

    getMusic(user.user.topic).then((res) => {
      setMusic(res.data);
    });
    getActivity(user.user.topic).then((res) => {
      setActivity(res.data);

    });
    getStory(user.user.topic).then((res)=>{
      setStory(res.data)
    })
  }, [user]);
  const onRefresh = () => {
    setRefreshing(true);
    getMusic(user.user.topic).then((res) => {
      setMusic(res.data);
    });
    getActivity(user.user.topic).then((res) => {
      setActivity(res.data);

    });
    getStory(user.user.topic).then((res)=>{
      setStory(res.data)
    })
    setRefreshing(false);
  };
  return (
    <>
      {user.user && (
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
          <View style={styles.main}>
            <StatusBar backgroundColor="transparent" translucent={true} />

            <ImageBackground
              style={styles.image}
              source={{
                uri: "https://i.pinimg.com/736x/d8/2d/5c/d82d5cc407d4e33d2a9df3912b4c8809.jpg",
              }}
            >
              <Text style={styles.title}>Good morning</Text>
              <Text style={styles.title2}>{user.user.name}</Text>

              <View style={styles.card}>
                <Text style={styles.quoteTitle}>Quote of the day</Text>
                <Text style={styles.quote}>
                  “There is hope, even when your brain tells you there isn’t.” ―
                  John Green
                </Text>
                <Text
                  style={{
                    fontWeight: "700",
                    marginRight: "auto",
                    width: "90%",
                    padding: 10,
                  }}
                >
                  Songs to listen to
                </Text>
                <View style={styles.musicMain}>
                  {music &&
                    music.map((song) => {
                      return (
                        <TouchableOpacity style={styles.musicCard}>
                          <Text>{song.song}</Text>
                          <TouchableOpacity
                            onPress={() => Linking.openURL(song.link)}
                          >
                            <Image
                              style={styles.play}
                              source={require("../assets/images/play.png")}
                            ></Image>
                          </TouchableOpacity>
                        </TouchableOpacity>
                      );
                    })}
                </View>
                <View style={styles.activityMain}>
                  <Text
                    style={{
                      fontWeight: "600",
                      color: "#5c5c5c",
                      // marginRight: "auto",
                      // width: "90%",
                      // paddingHorizontal: 30,
                      paddingVertical: 10,
                    }}
                  >
                    Today's Activities
                  </Text>
                  {activity &&
                    activity.map((element) => {
                      return <ActivityCard activity={element} />;
                    })}
                </View>
                <Text
                  style={{
                    fontWeight: "700",
                    // marginRight: "auto",
                    // width: "90%",
                    padding: 20,
                  }}
                >
                  Success Stories
                </Text>
              {story && (<MyCarousel story={story}/>)}
              <Text style={{color:'#707070',fontSize:13,marginVertical:7}}>Swipe left to see more</Text>
              </View>
            </ImageBackground>
          </View>
        </ScrollView>
      )}
    </>
  );
};

const ActivityCard = ({ activity }) => {
  return (
    <View style={styles.activityCard}>
      <Text style={styles.activityText}>{activity.title}</Text>
      <Text style={styles.activityText}>{activity.duration}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 20,
    // height: 800,
    marginTop: 25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "400",
    color: "white",
    paddingTop: StatusBar.currentHeight + 40,
    paddingLeft: 30,
  },
  title2: {
    fontSize: 23,
    color: "white",
    fontWeight: "700",
    paddingTop: 10,
    paddingLeft: 30,
  },
  main: {
    // paddingTop: StatusBar.currentHeight,
    backgroundColor: "white",
    height: "100%",
    paddingBottom:60,
  },
  image: {
    width: "100%",

    height: "100%",
    // position:'absolute',

    // borderRadius:10,
    // elevation:5
  },
  quote: {
    color: "#000000",
    padding: 10,
    fontWeight: "300",
    lineHeight: 30,
    fontSize: 16,
  },
  quoteTitle: {
    fontWeight: "700",
    marginTop: 30,
    // lineHeight:30,
    fontSize: 17,
  },

  musicCard: {
    backgroundColor: "#f8f8f8",
    width: "97%",
    height: 70,
    borderRadius: 15,
    marginVertical: 8,
    justifyContent: "space-between",
    padding: 20,
    // elevation:1,
    alignItems: "center",
    flexDirection: "row",
  },
  musicMain: {
    width: "100%",
    // marginTop:10,
    justifyContent: "center",
    alignItems: "center",
  },
  play: {
    height: 30,
    width: 30,
  },
  activityMain: {
    width: "100%",
    backgroundColor: "#fff4e6",
    alignItems: "center",
    borderRadius: 15,
    marginVertical: 10,
    padding: 10,
  },
  activityCard: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    width: "95%",
    marginVertical: 6,
    borderRadius: 15,
    // elevation:1
  },
  video: {
    height: 200,
    width: 100,
  },
});
const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps)(Home);
