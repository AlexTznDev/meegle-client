import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  TextInput,
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
            width: "18%",
          }}
        >
          Annuler
        </Text>
      </TouchableOpacity>

      <View style={styles.containerTextInput}>
        <TextInput
          style={{
            backgroundColor: "#F5F5F5",
            width: "90%",
            padding: 10,
            borderRadius: 5,
          }}
          placeholder=" Rechercher"
        ></TextInput>
      </View>

      <ScrollView
        style={{
          paddingTop: 20,
        }}
      >
        <View style={styles.containerCardsFriend}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 30,
              }}
              source={require("../assets/girlAngela.png")}
            />
            <Text style={styles.h2}>Angela electra</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddFriendEvent;

const styles = StyleSheet.create({
  containerCardsFriend: {
    flexDirection: "row",
    paddingLeft: 20,
    alignItems: "center",
  },
  containerTextInput: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 4,
  },
  h2: {
    fontSize: 20,
    fontWeight: 400,
    paddingLeft: 20,
  },
});
