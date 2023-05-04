import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, {useState} from "react";

import { useNavigation } from "@react-navigation/native";

import useAuth from "../../hooks/useAuth";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

import {
  setIsActiveNavigate,
  SetUsername
} from "../../slices/navSlice.js";

const UserNameChoose = () => {
  const { user, signOut, setUser } = useAuth(); //! context auth
  const [handleChange, sethandleChange] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch()

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", alignItems: "center" }}>
        <Text style={{ fontSize: 25 }}>Hi { user && user.displayName} </Text>
      </View>

      <Text style={{ paddingTop: 40, marginBottom: 5 }}>Choose Username</Text>
      <TextInput
      onChangeText={text => sethandleChange(text)}
        style={{
          borderWidth: 0.5,
          width: "100%",
          padding: 10,
          borderRadius: 5,
        }}
        placeholder={ user  && user.displayName}
      ></TextInput>

      <TouchableOpacity

      onPress={()=>{
        navigation.navigate("GenreChoose");
        dispatch(setIsActiveNavigate("GenreChoose"))
        dispatch(SetUsername(handleChange))
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

export default UserNameChoose;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
