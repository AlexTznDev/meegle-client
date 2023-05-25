import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Dimensions,
  TouchableOpacity
} from "react-native";
import React, { useState } from "react";

import { Feather } from "@expo/vector-icons";

const EventInfoDiscusion = ({ _id }) => {
  const windowHeight = Dimensions.get("window").height; //! equivaut a un 100vh
  const windowWidth = Dimensions.get("window").width; //! equivaut a un 100vw
  const [input, setinput] = useState("");

  return (
    <View style={styles.container}>
      <ScrollView style={styles.containerAllMessage}>
        <View style={styles.containerMessage}>
<Text>Hello!!!</Text>
        </View>
      </ScrollView>
      <View style={styles.footerChat}>
        <TextInput
          value={input}
          onChangeText={(text) => setinput(text)}
          placeholder="Your message..."
          style={styles.textInput}
        />
        <TouchableOpacity activeOpacity={.5} >
        <Feather name="send" size={20} color="#52C234" />
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default EventInfoDiscusion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingBottom: 100,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#00000010",
    padding: 10,
    borderRadius:20
  },
  footerChat: {
    flexDirection: "row",
    marginLeft:10,
    paddingRight:10,
    marginRight:10,
    justifyContent:"center",
    alignItems:"center",
    gap:15
    
  },
  containerMessage:{
    padding:10,
    backgroundColor:"#00000040",
    borderRadius:10
  }
  ,
  containerAllMessage:{
    paddingTop:10
  }
});
