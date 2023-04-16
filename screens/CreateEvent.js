import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { selectImageEvent } from "../slices/navSlice";
import { AntDesign } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

//REDUX
import { useDispatch } from "react-redux";
import { setIsActiveNavigate } from "../slices/navSlice.js";
import { setImageEvent } from "../slices/navSlice";

const CreateEvent = () => {
  const imageEvent = useSelector(selectImageEvent);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(imageEvent);
  }, [imageEvent]);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          paddingTop: 10,
          paddingBottom: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ProfilMain", { shouldAnimate: true });
            dispatch(setIsActiveNavigate("Profil"));
            dispatch(setImageEvent(null));
          }}
        >
          <View
            style={{
              marginLeft: -10,
            }}
          >
            <AntDesign name="close" size={25} color="#FFF" />
          </View>
        </TouchableOpacity>

        <Text
          style={{
            color: "#fff",
            fontSize: 18,
            transform: [{ translateX: 24 }],
          }}
        >
          Creer évenement
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              color: "#007BFF",
              fontSize: 18,
              transform: [{ translateX: 10 }],
            }}
          >
            Suivant
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {imageEvent !== null && (
          <Image
            source={{ uri: imageEvent }}
            // source={imageEvent}
            style={{ width: "80%", height: 300 }}
          />
        )}
      </View>

      {/* <Text
        style={{
          color: "#fff",
          fontSize: 20,
          padding: 20,
        }}
        onPress={() => dispatch(setImageEvent("rando"))}
      >
        rando
      </Text>
      <Text
        onPress={() => dispatch(setImageEvent(BarCocktail))}
        style={{
          color: "#fff",
          fontSize: 20,
          padding: 20,
        }}
      >
        rando
      </Text> */}
    </View>
  );
};

export default CreateEvent;

const styles = StyleSheet.create({});
