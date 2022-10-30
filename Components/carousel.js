import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Video,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-snap-carousel";

const MyCarousel = ({ story }) => {
    const navigation = useNavigation()
  const [activeIndex, setActiveIndex] = useState(0);
    const handleMore = (story) => {
        navigation.push("SingleStory", { story: story });
    }
  const _renderItem = ({ item }) => {
  
    return (
      <>
      {item ? (<View
        style={{
          backgroundColor: "white",
          borderColor: "black",
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderLeftWidth: 1,
          borderRadius: 5,
          height: 250,
          padding: 15,
          marginLeft: 25,
          marginRight: 25,
        }}
      >
        <Text style={{ paddingVertical: 5, fontWeight: "700" }}>
          {item.owner.name}
        </Text>

        {item.story.length > 150 ? (
          <>
          <Text style={{ width: "73%", lineHeight: 25 }}>
            {item.story.substring(0, 150) + "..."}
          </Text>
            <TouchableOpacity
              onPress={() => {
                handleMore(item)
              }}
              ><Text style={{ color: "#0089e4" }}> Read more</Text>
            </TouchableOpacity>
            </>
        ) : (
          <Text style={{ width: "73%", lineHeight: 25 }}>{item.story}</Text>
          )}
      </View>):(<Text>no stories to show</Text>)}
          </>
    );
  };

  return (
    <View
      style={{ flexDirection: "row", justifyContent: "center", zIndex: 100 }}
    >
      {story && (
        <Carousel
          layout={"stack"}
          layoutCardOffset={`18`}
          // ref={(ref) => (ref)}
          data={story}
          sliderWidth={300}
          itemWidth={500}
          renderItem={_renderItem}
          
          onSnapToItem={(index) => setActiveIndex(index)}
        />
      )}
    </View>
  );
};
export default MyCarousel;
const styles = StyleSheet.create({
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
