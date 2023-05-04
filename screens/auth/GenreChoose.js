import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { setIsActiveNavigate, SetGender } from "../../slices/navSlice.js";

const GenreChoose = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const handleButtonPress = (button) => {
    setSelectedButton(button);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, position: "absolute", top: "20%" }}>
        What's your gender?
      </Text>

      <TouchableOpacity
        style={styles.BtnChoose}
        onPress={() => handleButtonPress("Man")}
      >
        <View
          style={
            selectedButton === "Man"
              ? styles.BtnChooseInnerSelected
              : styles.BtnChooseInner
          }
        >
          <Text style={{ color: "#000000" }}>Man</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.BtnChoose}
        onPress={() => handleButtonPress("Women")}
      >
        <View
          style={
            selectedButton === "Women"
              ? styles.BtnChooseInnerSelected
              : styles.BtnChooseInner
          }
        >
          <Text style={{ color: "#000000" }}>Women</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.BtnChoose}
        onPress={() => handleButtonPress("Other")}
      >
        <View
          style={
            selectedButton === "Other"
              ? styles.BtnChooseInnerSelected
              : styles.BtnChooseInner
          }
        >
          <Text style={{ color: "#000000" }}>Other</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={!selectedButton}
        onPress={() => {
          navigation.navigate("PictureChoose");
          dispatch(setIsActiveNavigate("PictureChoose"));
          dispatch(SetGender(selectedButton));
        }}
        style={{
          backgroundColor: "#FFB25F",
          width: "100%",
          padding: 10,
          borderRadius: 5,
          alignItems: "center",
          position: "absolute",
          bottom: "15%",
        }}
      >
        <Text style={{ color: "#fff" }}>Next step</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GenreChoose;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 40,
  },
  BtnChoose: {
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  BtnChooseInner: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    alignItems: "center",
  },
  BtnChooseInnerSelected: {
    backgroundColor: "#00000005",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#00000030",
  },
  selectedBtn: {
    backgroundColor: "#FFB25F",
  },
});
