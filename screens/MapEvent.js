import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsBtnAmisAndDateOn,
  setOrigin,
  setDestination,
  selectOrigin,
  setIsActiveNavigate,
  setEventStep,
  SetPadelCourtUnknown,
  SelectPadelCourtUnknown
} from "../slices/navSlice";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_KEY } from "@env";
import MapView, { Marker } from "react-native-maps";
import CourtUnknown from "../assets/padelUnknown.jpg"

const MapEvent = () => {
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const PadelCourtUnknown = useSelector(SelectPadelCourtUnknown);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(setIsBtnAmisAndDateOn(true));
    });
    const subscribe = navigation.addListener("blur", () => {
      dispatch(setIsBtnAmisAndDateOn(false));
    });

    return () => {
      //demontage des composants
      unsubscribe();
      subscribe();
    };
  }, [navigation]);

  const CreateEvent = () => {
    console.log("Evenement Créé");
  };

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [origin]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        //mapType="mutedStandard" //permet de reduire les composant affiché sur la map
        style={{ flex: 1, width: "100%" }}
        onPress={() => {
          if (keyboardVisible) {
            Keyboard.dismiss();
          }
        }}
      >
        {origin?.location && (
          <Marker
            coordinate={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            }}
            description={origin.description}
            title="Lieu description"
            identifier="origin"
          />
        )}
      </MapView>

      <TouchableOpacity
        disabled={PadelCourtUnknown.location.lat === null}
        style={[styles.btn, { position: "absolute", bottom: "15%" }]}

        onPress={() => {
          CreateEvent();
          dispatch(setIsActiveNavigate("Profil"));
          navigation.navigate("CreateEventLegende");
          dispatch(setEventStep(1));
          dispatch(setIsBtnAmisAndDateOn(false));
        }}
      >
        <Text style={{ color: "#fff", fontSize: 20 }}>Add address</Text>
      </TouchableOpacity>

      <GooglePlacesAutocomplete
        styles={{
          container: {
            width: "90%",
            position: "absolute",
            top: "10%",
          },
          textInputContainer: {
            backgroundColor: "white", 
            height: 44,
            borderRadius: 5,
            paddingHorizontal: 10,
            marginBottom: 5,
          },
          textInput: {
            fontSize: 18,
          },
          placeholder: {
            color: "gray", 
            fontSize: 18,
          },
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        placeholder="Find your padel court"
        returnKeyType={"search"}
        query={{
          key: GOOGLE_MAPS_KEY,
          language: "fr",
          components: "country:ES"
        }} // faire la demande a l api
        enablePoweredByContainer={false} // remove google brand
        onPress={(data, detail = null) => {
          dispatch(
            SetPadelCourtUnknown({   
              location: detail.geometry.location,
              name: CourtUnknown,
              adress:data.description
            })
          );
          dispatch(
            setOrigin({
              location: detail.geometry.location,
              description: data.description,
            })
          );
          dispatch(setDestination(null));
        }}
        fetchDetails={true}
        minLength={2}
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
  btn: {
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#52C234",
    borderRadius: 10,
  },
});
