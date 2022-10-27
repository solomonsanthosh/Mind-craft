import { View, Text, TextInput, StyleSheet, ScrollView ,StatusBar,Dimensions,TouchableOpacity} from "react-native";
import React, { useState } from "react";
import { createStory } from "../Axios/post.axios";
import { connect } from "react-redux";
const WriteStory = ({navigation,user}) => {
  const [story, setStory] = useState("");
  const handleSubmit = () =>{
    if(story.length>10) {

        createStory(user.user.topic,user.user._id,story.trim()).then((res)=>{
            navigation.goBack()
        })
    }
  }
  return (
    <ScrollView>
    <View style={styles.main}>
      <Text style={{marginTop:60}}>Write your success story to help others succeed</Text>
      
        <TextInput
          multiline
          value={story}
          onChangeText={(text) => {
            setStory(text);
          }}
          style={styles.story}
          placeholder="write your story..."
        />
      <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: "#339d48" ,paddingVertical:8,borderRadius:50,paddingHorizontal:20,position:'absolute',right:'5%',bottom:'3%'}}>
          <Text style={{ color: "white", fontWeight: "400" }}>Add Story</Text>
        </TouchableOpacity>
    </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  main: {
    marginTop: StatusBar.currentHeight,
    minHeight: Dimensions.get("window").height,
    backgroundColor: "white",
    width: "100%",
    alignItems: "center",
    paddingBottom: 60,
    justifyContent:'flex-start'
  },
  story:{
    marginTop:20,
    padding:20,
    width:'90%'
    ,
    backgroundColor:"#efefef",
    borderRadius:15,
    minHeight:300

  }
});
const mapStateToProps = (state) => {
    return { user: state.user };
  };
  export default connect(mapStateToProps)(WriteStory);
