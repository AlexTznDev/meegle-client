import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";

//redux
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { setEventStep } from "../slices/navSlice.js";
import { setIsActiveNavigate } from "../slices/navSlice.js";

import { selectImageAppli } from "../slices/navSlice";
import { selectImage } from "../slices/navSlice";
import { selectImageEvent } from "../slices/navSlice";
import { selectIsImageFromAppli } from "../slices/navSlice";


const CreateEventLegende = () => {
  const dispatch = useDispatch();
  const imageEvent = useSelector(selectImageEvent);
  const SelectImage = useSelector(selectImage);
  const ImageAppli = useSelector(selectImageAppli);
  const IsImageFromAppli = useSelector(selectIsImageFromAppli);
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
            dispatch(setEventStep(0));
            dispatch(setIsActiveNavigate("CreateMain"));
          }}
        >
          <View
            style={{
              marginLeft: -10,
            }}
          >
            <AntDesign name="left" size={25} color="#222222" />
          </View>
        </TouchableOpacity>

        <Text
          style={{
            color: "#222222",
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
        {IsImageFromAppli ? (
          <Image
            source={ImageAppli[SelectImage]}
            style={{ width: "80%", height: 300 }}
          />
        ) : (
          <Image
            source={{ uri: imageEvent }}
            style={{ width: "80%", height: 300 }}
          />
        )}
      </View>
    </View>
  );
};

export default CreateEventLegende;

const styles = StyleSheet.create({});
