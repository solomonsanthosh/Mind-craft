import { View, Text,StyleSheet ,StatusBar, ScrollView,Dimensions} from 'react-native'
import React from 'react'

const SingleStory = ({route}) => {
    const {story} = route.params
  return (
    <ScrollView>
    {story &&(<View style={styles.main}>
      <Text style={styles.title}>{story.owner.name}</Text>
      <Text style={styles.content}>{story.story}</Text>
      
    </View>)}
    </ScrollView>
  )
}
const styles = StyleSheet.create({
    main:{
        backgroundColor:"#f6f6f6",
        marginTop:StatusBar.currentHeight,
        padding:20,
        alignItems:'center',
        minHeight:Dimensions.get('window').height
    },
    title:{
        fontSize:18,
        fontWeight:'700',
        padding:20,
        
    },
    content:{
        lineHeight:25
    }
})
export default SingleStory