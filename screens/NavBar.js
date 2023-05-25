import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, StackActions } from '@react-navigation/native';
import BtnAmisAndDate from "./BtnAmisAndDate";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  setEventStep,
  setImageEvent,
  setIsImageFromAppli,
  setSelectImage,
  setIsActiveNavigate,
  setIsBtnAmisAndDateOn,
  setTimeEvent,
  setDateEvent,
  selectIsActiveNavigate,
  resetPadelCourtUnknown,
  resetOrigin
} from "../slices/navSlice";

const NavBar = () => {
  const dispatch = useDispatch(); //! modification etat avec redux
  const navigation = useNavigation();
  const isActiveNavigate = useSelector(selectIsActiveNavigate);


//! permet de reinitialiser le stack navigator au screen que tu souhaite
  const navigateToCreateMain = () => {
    navigation.dispatch(
      StackActions.replace('CreateMain', {
        shouldAnimate: false,
      })
    );
  };
//! permet de reinitialiser le stack navigator a l element premier de la pile de screen
  // const resetToCreateMain = StackActions.reset({
  //   index: 0,
  //   routes: [{ name: 'CreateMain' }],
  // });
  
  // navigation.dispatch(resetToCreateMain);
  
  

  return (
    <View style={{ position: "absolute", bottom: 0, width: "100%" , borderTopWidth:.5, borderTopColor:"#00000020"}}>
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
        <TouchableOpacity>
          <Image
            style={{
              width: 25,
              height: 25,
            }}
            resizeMode="contain"
            source={require("../assets/home.png")}
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
            dispatch(resetPadelCourtUnknown());
            dispatch(resetOrigin());
            
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
                ? require("../assets/searchGreen.png")
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
            dispatch(resetPadelCourtUnknown())
            dispatch(resetOrigin());
            navigateToCreateMain()
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
                ? require("../assets/circleGreen.png")
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
            dispatch(resetPadelCourtUnknown())
            dispatch(resetOrigin());
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
                ? require("../assets/chatGreen.png")
                : require("../assets/chat.png")
            }
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
            dispatch(resetPadelCourtUnknown())
            dispatch(resetOrigin());
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
                ? require("../assets/ProfilGreen.png")
                : require("../assets/profil.png")
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({});
