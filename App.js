import { StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Home from "./Screens/Home";
import IntroSlider from "./Components/IntroSlider";
import { faUser ,faHouse,faCircleNodes ,faHandHoldingMedical } from "@fortawesome/free-solid-svg-icons";
import Profile from "./Screens/Profile";
import Topic from "./Screens/Topic";
import Test from "./Screens/Test";
import Login from "./Screens/Auth/Login";
import Signup from "./Screens/Auth/Signup";
import PasswordReset from "./Screens/Auth/PasswordReset";
import configureStore from "./store";
import { Provider } from "react-redux";
import Community from "./Screens/Community/Community";
import CreatePost from "./Screens/Community/CreatePost";
import SinglePost from "./Screens/Community/SinglePost";
import SingleStory from "./Screens/SingleStory";
import Coach from "./Screens/Coach";
import WriteStory from "./Screens/WriteStory";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const store = configureStore();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="reset" component={PasswordReset} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="slider" component={IntroSlider}></Stack.Screen>
          <Stack.Screen name="Test" component={Test} />

          <Stack.Screen name="Topic" component={Topic} />
          <Stack.Screen name="Tabs" component={TabNav} />
          <Stack.Screen name="CreatePost" component={CreatePost} />
          <Stack.Screen name="SinglePost" component={SinglePost} />
          <Stack.Screen name="SingleStory" component={SingleStory} />
          <Stack.Screen name="WriteStory" component={WriteStory} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const TabNav = () => {
  return (
    <Tab.Navigator
      barStyle={{
        marginBottom: 10,
        width: "96%",
        borderRadius: 50,
        left: "2%",
        right: "2%",
        position: "absolute",
        overflow: "hidden",
        elevation: 2,
        backgroundColor: "white",
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused
              ? faHouse
              : faHouse;
          } else if (route.name === "Connect") {
            iconName = focused ? faCircleNodes : faCircleNodes;
          } else if (route.name === "Profile") {
            iconName = focused ? faUser : faUser}
            else if (route.name === "Seek help") {
              iconName = focused ? faHandHoldingMedical : faHandHoldingMedical}
          // You can return any component that you like here!
          return (
            <FontAwesomeIcon
              icon={iconName}
              // name={iconName}
              size={size}
              color={color}
             
            />
          );
        },
        tabBarActiveTintColor: "tomato",
        // tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={Home}></Tab.Screen>
      <Tab.Screen name="Connect" component={Community}></Tab.Screen>
      <Tab.Screen name="Seek help" component={Coach}></Tab.Screen>
      <Tab.Screen name="Profile" component={Profile}></Tab.Screen>
    </Tab.Navigator>
  );
};
