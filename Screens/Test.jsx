import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { getTest, updateSeverity } from "../Axios/test.axios";
import { connect } from "react-redux";
import { setUser } from "../actions";
import { bindActionCreators } from "redux";
import AppIntroSlider from "react-native-app-intro-slider";
import AnimatedLoader from "react-native-animated-loader";
import Icon from "react-native-vector-icons/Ionicons";
const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    color: "black",

    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    paddingTop: StatusBar.currentHeight + 50,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "white",
    height: "100%",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 18,
    fontFamily: "Roboto",

    fontWeight: "600",
    lineHeight: 35,
    marginBottom: 20,
  },
  text: {
    paddingTop: 10,
    fontWeight: "300",
    fontSize: 45,
  },
  button1:(isPressed)=> ({
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,
    elevation: 2,
    borderColor: isPressed == 1 ? "#FF8787" : "white",
    borderWidth:2,

    backgroundColor: "white",
    margin: 10,
  }),
  button2:(isPressed)=> ({
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,
    elevation: 2,
    borderColor: isPressed == 2 ? "#FF8787" : "white",
    borderWidth:2,

    backgroundColor: "white",
    margin: 10,
  }),
  buttonNext: {
    position: "absolute",
    right: "5%",
    bottom: "3%",
  },
  lottie: {
    width: 100,
    height: 100
  }
});

const Test = ({ navigation, user, setUser }) => {
  const [isPressed, setIsPressed] = useState(0)
  
  const [nextCount, setNextCount] = useState(1);
  const [ansArray, setAnsArray] = useState([]);
  const [pressed, setPressed] = useState(false);
  const [slides, setSlides] = useState([]);
  const [ans, setAns] = useState();
  const [questions, setQuestions] = useState();
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    setInterval(() => {
      setVisible(!visible);
    }, 2000);
    getTest(user.user.topic).then((res) => {
      setQuestions(res.data.questions);

      res.data.questions.map((e) => {
        var obj = {
          question: e,
        };

        setSlides((oldArray) => [...oldArray, obj]);
      });
    });
  }, []);
  const [showRealApp, setShowRealApp] = useState(false);

  const onDone = () => {
    setAnsArray((prev) => [...prev, ans]);

    updateSeverity(user.user.email, [...ansArray, ans]);

    navigation.navigate("Tabs");
  };
  const renderDoneButton = () => {
    {
      pressed && (
        <View style={styles.buttonCircle}>
          <Icon name="arrow-forward-outline" color="#000000e5" size={24} />
        </View>
      );
    }
  };
  const ansSelect = () => {
    setIsPressed(0)
    console.log(pressed);
    setAnsArray((prev) => [...prev, ans]);
    console.log(ansArray);
    setPressed(false);
  };

  const RenderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.question}</Text>

        <TouchableOpacity
        
       
          onPress={() => {
            setAns("Yes"), setPressed(true);
            setIsPressed(1)
          }}
          style={styles.button1(isPressed)}
        >
          <Text>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
     
          
          onPress={() => {
            setAns("No"), setPressed(true);
            setIsPressed(2)
          }}
          style={styles.button2(isPressed)}
        >
          <Text>No</Text>
        </TouchableOpacity>
        {pressed && (
          <TouchableOpacity
            onPress={() => {
              setNextCount(nextCount + 1);
              return this.slider.goToSlide(nextCount, true);
            }}
            style={styles.buttonNext}
          >
            <Text>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  const slider = useRef();

  return (
    <>
      {!visible && slides ? (
        <AppIntroSlider
          data={slides}
          renderItem={RenderItem}
          onDone={onDone}
          onSlideChange={ansSelect}
          renderNextButton={renderDoneButton}
          scrollEnabled={false}
          ref={(ref) => (this.slider = ref)} // the ref
          //   showSkipButton={true}
          //   onSkip={onSkip}
        />
      ):(<AnimatedLoader
        visible={true}
        overlayColor="white"
        animationStyle={styles.lottie}
        source={require("../assets/99297-loading-files.json")}
        speed={1}>
        
      </AnimatedLoader>)}
    </>
  );
};
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
export default connect(mapStateToProps, mapDispatchToProps)(Test);
