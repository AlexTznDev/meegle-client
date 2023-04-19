import { StyleSheet, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";

import { useNavigation } from "@react-navigation/native";

import { setIsBtnAmisAndDateOn } from "../slices/navSlice";
import { useDispatch } from "react-redux";

const AddFriendEvent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(setIsBtnAmisAndDateOn(true));
    //   console.log("Le composant est maintenant focalisé");
    });
    const subscribe = navigation.addListener("blur", () => {
      dispatch(setIsBtnAmisAndDateOn(false));
    //   console.log("Le composant est maintenant defocalisé");
    });

    return () => {
      // Nettoyez le listener lorsque le composant est démonté
      unsubscribe();
      subscribe();
    };
  }, [navigation]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: "#ffffff",
      }}
    >
      <Text>AddFriendEvent</Text>
    </SafeAreaView>
  );
};

export default AddFriendEvent;

const styles = StyleSheet.create({});
