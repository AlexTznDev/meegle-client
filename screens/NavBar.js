import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const NavBar = () => {
  return (
    <View
      style={{
        paddingBottom: 40,
        paddingTop: 20,
        position: "absolute",
        bottom: 0,
        backgroundColor: "#F5F5F5",
        flex: 1,
        flexDirection: "row",
        gap: 50,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >

    <TouchableOpacity>
    <Image
        style={{
          width: 25,
          height: 25,
        }}
        resizeMode = "contain"
        source={require("../assets/chat.png")}
      />
    </TouchableOpacity>
    <TouchableOpacity>
    <Image
        style={{
          width: 25,
          height: 25,
        }}
        resizeMode = "contain"
        source={require("../assets/search.png")}
      />
    </TouchableOpacity>
    <TouchableOpacity>
    <Image
        style={{
          width: 25,
          height: 25,
        }}
        resizeMode = "contain"
        source={require("../assets/circle.png")}
      />
    </TouchableOpacity>
    <TouchableOpacity>
    <Image
        style={{
          width: 25,
          height: 25,
        }}
        resizeMode = "contain"
        source={require("../assets/chat.png")}
      />
    </TouchableOpacity>
    <TouchableOpacity>
    <Image
        style={{
          width: 25,
          height: 25,
        }}
        resizeMode = "contain"
        source={require("../assets/profil.png")}
      />
    </TouchableOpacity>


    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({});
