import React from "react";
import { Text, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { setImageEvent } from "../slices/navSlice";
import { TouchableOpacity } from "react-native-gesture-handler";

const UploadImage = () => {
  const dispatch = useDispatch(); //! modification etat avec redux

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(
        `Désolé, nous avons besoin de la permission d'accéder à vos photos pour que cela fonctionne!`
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0];
      dispatch(setImageEvent(selectedImage.uri));
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.buttonImage}>
          Image de t'as bibliothéque
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop:30

  },
  buttonImage: {
    color: "#fff",
    fontSize: 18,
    borderWidth:1,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    borderRadius:25,
    borderColor:"#fff",
    backgroundColor:"#333333",
    overflow:"hidden"

  },
});

export default UploadImage;
