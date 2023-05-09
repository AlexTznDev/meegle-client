import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";

import {
  SelectGender,
  SelectUsername,
  setIsActiveNavigate,
} from "../../slices/navSlice";
import { useSelector, useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";

const PictureChoose = () => {
  const selectGender = useSelector(SelectGender);
  const selectUsername = useSelector(SelectUsername);
  const { authToken, setisEditStep, updateUserMongoDb, user } = useAuth();
  const [ChooseImg, setChooseImg] = useState(null);
  const dispatch = useDispatch();

  const submitInformationDb = async () => {
    try {
      if (authToken) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        };

        const data = {
          username: selectUsername,
          gender: selectGender,
          ...(ChooseImg !== null ? { imageProfile: ChooseImg } : { imageProfile: user.photoURL }),
        };
        

        const response = await axios.patch(
          "http://localhost:5005/api/profil",
          data,
          config
        );

        if (response.status === 200) {
          setisEditStep(false);
          dispatch(setIsActiveNavigate("Profil"));
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

  //! choose picture

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

  const uploadImage = async (uri, mimeType) => {
    const apiUrl = "http://localhost:5005/api/upload"; // Remplacez par l'URL de votre API

    try {
      const formData = new FormData();
      formData.append("image", {
        uri,
        name: `image.${mimeType.split("/").pop()}`,
        type: mimeType,
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post(`${apiUrl}/`, formData, config);

      return response.data.imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
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
      setChooseImg(selectedImage.uri);

      // Get the file extension from the URI
      const fileExtension = selectedImage.uri.split(".").pop();
      // Get the MIME type based on the file extension
      const mimeType = `image/${fileExtension}`;

      // Upload the image to the back-end and get the Cloudinary URL
      const imageUrl = await uploadImage(selectedImage.uri, mimeType);
      if (imageUrl) {
        console.log("Image uploaded to Cloudinary. URL:", imageUrl);
        setChooseImg(imageUrl);
        // You can update the state or dispatch an action with the Cloudinary URL if needed
      } else {
        console.error("Error uploading image to Cloudinary");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, position: "absolute", top: "10%" }}>
        Choose your picture
      </Text>
      <Text
        style={{
          paddingTop: 30,
          paddingBottom: 20,
        }}
      >
        PictureChoose
      </Text>
      <View
        style={{
          width: 150,
          height: 150,
          borderRadius: 150,
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {ChooseImg !== null ? (
          <Image
            source={{ uri: ChooseImg }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
            }}
          />
        ) : (
          <Image
            source={{ uri: user.photoURL }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
            }}
          />
        )}
      </View>
      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.buttonImage}>Image de t'as bibliothéque</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginTop: 40,
          paddingLeft: 30,
          paddingRight: 30,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: "#FF9D33",
          borderRadius: 20,
        }}
        onPress={() => {
          submitInformationDb();
        }}
      >
        <Text style={{ color: "#fff" }}>valider</Text>
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
  buttonImage: {
    color: "#fff",
    fontSize: 18,
    borderWidth: 1,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    borderRadius: 25,
    borderColor: "#fff",
    backgroundColor: "#333333",
    overflow: "hidden",
    marginTop: 40,
  },
});
