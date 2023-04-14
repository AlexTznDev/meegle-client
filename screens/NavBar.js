import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setIsActiveNavigate } from "../slices/navSlice.js";
import { selectIsActiveNavigate } from "../slices/navSlice";
import { useSelector } from "react-redux";

const NavBar = () => {
  const dispatch = useDispatch(); //! modification etat avec redux
  const navigation = useNavigation();
  const isActiveNavigate = useSelector(selectIsActiveNavigate);
  console.log(isActiveNavigate);

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
          resizeMode="contain"
          source={require("../assets/chat.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          dispatch(setIsActiveNavigate("FindEvent"));
          navigation.navigate("FindEventMain");
        }}
      >
        <Image
          style={{
            width: 25,
            height: 25,
          }}
          resizeMode="contain"
          source={
            isActiveNavigate === "FindEvent"
              ? require("../assets/searchOrange.png")
              : require("../assets/search.png")
          }
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          style={{
            width: 25,
            height: 25,
          }}
          resizeMode="contain"
          source={require("../assets/circle.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          style={{
            width: 25,
            height: 25,
          }}
          resizeMode="contain"
          source={require("../assets/chat.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ProfilMain");
          dispatch(setIsActiveNavigate("Profil"));
        }}
      >
        <Image
          style={{
            width: 25,
            height: 25,
          }}
          resizeMode="contain"
          source={
            isActiveNavigate === "Profil"
              ? require("../assets/profilOrange.png")
              : require("../assets/profil.png")
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({});
