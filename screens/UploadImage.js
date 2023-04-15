import React, { useState } from "react";
import { Button, Image, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";

const UploadImage = () => {
    
  const dispatch = useDispatch(); //! modification etat avec redux
  const [imageEvent, setImageEvent] = useState(null);

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
      setImageEvent(selectedImage.uri);
    }
  };

  return (
    <View style={styles.container}>
      {imageEvent && (
        <Image
          source={{ uri: imageEvent }}
          style={{ width: 350, height: 200 }}
        />
      )}
      <Button
        title="Choisi une image depuis t'as bibliothéque"
        onPress={pickImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default UploadImage;
