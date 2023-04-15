import { SafeAreaView, StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import UploadImage from "./UploadImage";
import { useSelector } from "react-redux";
import { selectImageEvent } from "../slices/navSlice";
import { FontAwesome5 } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

//REDUX
import { useDispatch } from "react-redux";
import { setIsActiveNavigate } from "../slices/navSlice.js";


const CreateEvent = () => {
  const imageEvent = useSelector(selectImageEvent);
  const navigation= useNavigation()
  const dispatch = useDispatch()


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#222222",
      }}
    >
      <TouchableOpacity
      onPress={()=>{
        navigation.navigate('ProfilMain', { shouldAnimate: true });;
        dispatch(setIsActiveNavigate("Profil"))
        }}

      >
        <FontAwesome5 name="chevron-left" size={25} color="#FFF" />
      </TouchableOpacity>

      <View>
        {imageEvent && (
          <Image
            source={{ uri: imageEvent }}
            style={{ width: 350, height: 200 }}
          />
        )}
      </View>

      <UploadImage />
    </SafeAreaView>
  );
};

export default CreateEvent;

const styles = StyleSheet.create({});
