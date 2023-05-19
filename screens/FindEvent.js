import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Text,
} from "react-native";
import React, { useState } from "react";

const FindEvent = () => {
  const [IndexFindEvent, setIndexFindEvent] = useState(0);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#040738",
        color: "#fff",
        borderBottomRightRadius: 37,
        borderBottomLeftRadius: 37,
        justifyContent: "center",
        alignItems: "center",
        gap:10,
      }}
    >

        <View
          style={{
            paddingTop: 10,
            width: "100%",
            justifyContent:"center",
            alignItems:"center",
          
            
          }}

        >
        <View
      style={{ width: 70, height:50 }}
        >
        <Image
            source={require("../assets/Meegel.png")}
            style={{ width: "100%", height:"100%", resizeMode:"contain"}}
          />
        </View>

        </View>


      <View
        style={{
          flexDirection: "row",
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom:10
        }}
      >
        <TouchableOpacity
          style={{
            width: "45%",
            flexDirection: "row",
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            borderRadius: 15,
            backgroundColor: "#7A7A7A50",
            marginBottom: 15,
            marginRight: 10,

            ...(IndexFindEvent === 0
              ? { borderWidth: 1, borderColor: "#52C234" }
              : {}),
          }}
          onPress={() => {
            setIndexFindEvent(0);
          }}
        >
          <Image
            source={require("../assets/friendWhite.png")}
            style={{
              width: 30,
              height: 30,
              resizeMode: "contain",
            }}
          />
          <Text
            style={{
              color: "#fff",
              fontSize: 12,
            }}
          >
          Users games
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "45%",
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: 5,
            borderRadius: 15,
            backgroundColor: "#52C23440",
            marginBottom: 15,
            marginRight: 10,
            ...(IndexFindEvent === 1
              ? { borderWidth: 1, borderColor: "#52C234" }
              : {}),
          }}
          onPress={() => {
            setIndexFindEvent(1);
          }}
        >
          <Image
            source={require("../assets/sport.png")}
            style={{
              width: 30,
              height: 30,
              resizeMode: "contain",
            }}
          />
          <Text
            style={{
              color: "#fff",
              fontSize: 12,
            }}
          >
            Meegel games
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FindEvent;

const styles = StyleSheet.create({});
