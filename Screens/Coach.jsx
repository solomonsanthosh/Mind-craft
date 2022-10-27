import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Modal,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React,{useState,useEffect} from "react";
import { getCoach, sendMail } from "../Axios/coach.axios";

import { connect } from "react-redux";
const Coach = ({user}) => {
  const [modalVisible, setModalVisible] = useState(false)
    const [coach, setCoach] = useState([])
    const [content,setContent]  = useState('')
    const [email, setEmail] = useState('')
    useEffect(()=>{
        getCoach().then((res)=>{
            setCoach(res.data)
        })
    },[])


    const handleSubmit = () => {
      const contentMail = {
        topic: user.user.topic,
        name: user.user.name,
        email: email,
        description: content,
      };
      if (content.length > 10) {
        sendMail(contentMail).then((res) => {
          
          
        });
        setModalVisible(false);
          setContent("");
      }
    };
  return (
    <ScrollView>
      <View style={styles.main}>
        {coach && coach.map((coach)=>{
            return(
                <>
                <View style={styles.card}>
                <Text style={styles.name}>{coach.name}</Text>
                <Text style={styles.occ}>Psychiatrist</Text>
                <Text style={styles.exp}>Experience - {coach.experience} years</Text>
                <Text style={styles.about}>
                {coach.about}
                </Text>
                <Text style={styles.fee}>Fee - {coach.fee}</Text>
                <TouchableOpacity  onPress={() => {
                  setModalVisible(true)
                  setEmail(coach.email)
                  }} style={styles.btn}><Text style={{color:'white'}}>Book a session</Text></TouchableOpacity>
              </View>
              
                </>
            )
        })}
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
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  main: {
    paddingTop: StatusBar.currentHeight,
    minHeight: Dimensions.get("window").height,
    backgroundColor: "f6f6f6",
    width: "100%",
    alignItems:'center',
    paddingBottom:60
  },
  card: {
    width: "95%",
    height: 320,
    backgroundColor: "white",
    elevation: 1,
    marginTop: 10,
    alignItems:'flex-start',
    padding:20,
    justifyContent:"space-evenly",
    borderColor:"#2e9341",
    borderLeftWidth:4,


  },
  modal: {
    backgroundColor: "white",
    height: "50%",
    marginTop: "auto",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  name:{
    fontSize:18,
    fontWeight:'700',
  },
  occ: {
    color:'#0089e4'
  },
  exp:{
    color:"#565656"
  },
  about:{
    lineHeight:20
  },btn:{
    paddingHorizontal:20,
    paddingVertical:10,
    backgroundColor:"#2e9341",
    borderRadius:20

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
});
const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps)(Coach);
