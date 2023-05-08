import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";


import { SelectGender, SelectUsername, setIsActiveNavigate } from "../../slices/navSlice";
import { useSelector, useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";



const PictureChoose = () => {

const selectGender = useSelector(SelectGender)
const selectUsername = useSelector(SelectUsername)
const {authToken, setisEditStep, updateUserMongoDb} = useAuth()
const dispatch = useDispatch()


const submitInformationDb = async () => {
  try {
    
    if (authToken) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
      };

      const data = {
        username: selectUsername,
        gender: selectGender,
      };

      const response = await axios.patch(
        "http://localhost:5005/api/profil",
        data,
        config
      );

      if (response.status === 200) {
        setisEditStep(false)
        dispatch(setIsActiveNavigate("Profil"))
        updateUserMongoDb();
        console.log("The edit is OK");
      } else {
        console.log("There was an error updating the profile");
      }
    } else {
      console.log("No token found");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};



  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, position: "absolute", top: "20%" }}>Choose your picture</Text>
      <Text>PictureChoose</Text>
      <TouchableOpacity
      style={{marginTop:40}}
      onPress={()=>{
        submitInformationDb()
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
