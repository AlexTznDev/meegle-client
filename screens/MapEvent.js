import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setIsBtnAmisAndDateOn } from "../slices/navSlice";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_KEY } from "@env";

const MapEvent = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(setIsBtnAmisAndDateOn(true));
      //   console.log("Le composant est maintenant focalisé");
    });
    const subscribe = navigation.addListener("blur", () => {
      //   console.log("Le composant est maintenant defocalisé");
      dispatch(setIsBtnAmisAndDateOn(false));
    });

    return () => {
      //demontage des composants
      unsubscribe();
      subscribe();
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        styles={{
          container: {
            flex: 0,
            width:"90%",

          },
          textInputContainer: {
            backgroundColor: "white", // Ajout de la couleur de fond pour votre TextInput
            height: 44,
            borderRadius: 5,
            paddingHorizontal: 10,
            marginBottom: 5,
          },
          textInput: {
            fontSize: 18,
          },
          placeholder: {
            color: "gray", // Ajout de la couleur du texte pour votre placeholder
            fontSize: 18,
          },
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        placeholder="Votre recherche"
        query={{
            key:GOOGLE_MAPS_KEY,
            language:"fr"
        }}
      />
    </View>
  );
};

export default MapEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
