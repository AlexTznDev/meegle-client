import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";


import { SelectGender, SelectUsername } from "../../slices/navSlice";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
const PictureChoose = () => {

const selectGender = useSelector(SelectGender)
const selectUsername = useSelector(SelectUsername)
const {user} = useAuth()


// const SubmitInformationDb = async () => {

// try {
//   await 

// } catch (error) {
  
// }

// }


  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, position: "absolute", top: "20%" }}>Choose your picture</Text>
      <Text>PictureChoose</Text>
      <TouchableOpacity
      style={{marginTop:40}}
      onPress={()=>{
        SubmitInformationDb()
      }}
      >
        <Text>valider</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PictureChoose;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
