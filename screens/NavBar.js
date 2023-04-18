import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

//redux
import { useDispatch } from "react-redux";
import { setIsActiveNavigate } from "../slices/navSlice.js";
import { selectIsActiveNavigate } from "../slices/navSlice";
import { setEventStep } from "../slices/navSlice";
import { setImageEvent } from "../slices/navSlice";
import { setIsImageFromAppli } from "../slices/navSlice";
import { setSelectImage } from "../slices/navSlice";

import { useSelector } from "react-redux";

const NavBar = () => {
  const dispatch = useDispatch(); //! modification etat avec redux
  const navigation = useNavigation();
  const isActiveNavigate = useSelector(selectIsActiveNavigate);

  return (
    <>
      {isActiveNavigate !== "CreateMain" ? (
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
              dispatch(setEventStep(0));
              dispatch(setImageEvent(null));
              dispatch(setIsImageFromAppli(true));
              dispatch(setSelectImage(0));
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
          <TouchableOpacity
            onPress={() => {
              dispatch(setIsActiveNavigate("CreateMain"));
              dispatch(setEventStep(0));
              dispatch(setImageEvent(null));
              dispatch(setIsImageFromAppli(true));
              dispatch(setSelectImage(0));
              navigation.navigate("CreateMain");
            }}
          >
            <Image
              style={{
                width: 25,
                height: 25,
              }}
              resizeMode="contain"
              source={
                isActiveNavigate === "CreateMain"
                  ? require("../assets/circleOrange.png")
                  : require("../assets/circle.png")
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
              source={require("../assets/chat.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ProfilMain");
              dispatch(setEventStep(0));
              dispatch(setImageEvent(null));
              dispatch(setSelectImage(0));
              dispatch(setIsActiveNavigate("Profil"));
              dispatch(setIsImageFromAppli(true));
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
      ) : null}
    </>
  );
};

export default NavBar;

const styles = StyleSheet.create({});
