import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";

import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

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
        backgroundColor: "#ffffff",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "#222222",
            fontSize: 20,
          }}
        >
          Ajouter des amis
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("CreateEventLegende");
        }}
      >
        <Text
          style={{
            color: "#007BFF",
            fontSize: 16,
            transform: [{ translateY: -10 }],
            marginLeft: 15,
            width:"18%"
          }}
        >
          Annuler
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddFriendEvent;

const styles = StyleSheet.create({});
