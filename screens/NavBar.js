import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import BtnAmisAndDate from "./BtnAmisAndDate";

//redux
import { useDispatch, useSelector } from "react-redux";

import {
  selectIsActiveNavigate,
  setEventStep,
  setImageEvent,
  setIsImageFromAppli,
  setSelectImage,
  setIsActiveNavigate,
  setIsBtnAmisAndDateOn,
  setTimeEvent,
  setDateEvent,
} from "../slices/navSlice";

const NavBar = () => {
  const dispatch = useDispatch(); //! modification etat avec redux
  const navigation = useNavigation();
  const isActiveNavigate = useSelector(selectIsActiveNavigate);

  return (
    <>
      {isActiveNavigate !== "CreateMain" && isActiveNavigate !== "SignIn" && isActiveNavigate !== "Login" ? (
        <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <BtnAmisAndDate />

          <View
            style={{
              paddingBottom: 40,
              paddingTop: 20,
              backgroundColor: "#F5F5F5",
              flex: 1,
              flexDirection: "row",
              gap: 50,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
            onPress={()=>{
              dispatch(setIsActiveNavigate("SignIn"));
                navigation.navigate("SignIn");
            }}
            >
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
                dispatch(setIsBtnAmisAndDateOn(false));
                dispatch(setDateEvent(null));
                dispatch(setTimeEvent(null));
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
                dispatch(setIsBtnAmisAndDateOn(false));
                dispatch(setDateEvent(null));
                dispatch(setTimeEvent(null));
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
                  isActiveNavigate === "CreateMain2"
                    ? require("../assets/circleOrange.png")
                    : require("../assets/circle.png")
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ChatMain");
                dispatch(setEventStep(0));
                dispatch(setImageEvent(null));
                dispatch(setSelectImage(0));
                dispatch(setIsActiveNavigate("ChatMain"));
                dispatch(setIsImageFromAppli(true));
                dispatch(setIsBtnAmisAndDateOn(false));
                dispatch(setDateEvent(null));
                dispatch(setTimeEvent(null));
              }}
            >
              <Image
                style={{
                  width: 25,
                  height: 25,
                }}
                resizeMode="contain"
                source={
                  isActiveNavigate === "ChatMain"
                    ? require("../assets/chatOrange.png")
                    : require("../assets/chat.png")}
                
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
                dispatch(setIsBtnAmisAndDateOn(false));
                dispatch(setDateEvent(null));
                dispatch(setTimeEvent(null));
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
        </View>
      ) : null}
    </>
  );
};

export default NavBar;

const styles = StyleSheet.create({});
