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
  selectImage,
  selectImageAppli,
  SelectPadelCourtUnknown,
} from "../slices/navSlice";

import MapView, { Marker } from "react-native-maps";

const MapEvent = (props) => {
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const SelectImage = useSelector(selectImage);
  const ImageAppli = useSelector(selectImageAppli);
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
    if (mapRef.current) {
      {
        (props?.origin !== undefined && PadelCourtUnknown.location.lat === null) ?
           mapRef.current.animateToRegion({
              latitude: props.origin.origin.origin.location.lat,
              longitude: props.origin.origin.origin.location.lng,
              latitudeDelta: 0.0202,
              longitudeDelta: 0.0002,
            })
          : mapRef.current.animateToRegion({
              latitude: ImageAppli[SelectImage].origin.location.lat,
              longitude: ImageAppli[SelectImage].origin.location.lng,
              latitudeDelta: 0.0102,
              longitudeDelta: 0.0002,
            });
      }

      {
        PadelCourtUnknown.location.lat !== null &&
          mapRef.current.animateToRegion({
            latitude: PadelCourtUnknown.location.lat,
            longitude: PadelCourtUnknown.location.lng,
            latitudeDelta: 0.0102,
            longitudeDelta: 0.0002,
          });
      }
    }
  }, []);

  const CreateEvent = () => {
    console.log("Evenement Créé");
  };

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


{PadelCourtUnknown.location.lat !== null ? 
  <Marker
            coordinate={{
              latitude: PadelCourtUnknown.location.lat,
              longitude: PadelCourtUnknown.location.lng,
            }}
            identifier="origin"
            //! rajouter description au click sur marker
          />: 
          
       <>
       {props?.origin?.origin?.origin?.location ? (
          <Marker
            coordinate={{
              latitude: props.origin.origin.origin.location.lat,
              longitude: props.origin.origin.origin.location.lng,
            }}
            identifier="origin"
            //! rajouter description au click sur marker
          />
        ) : (
          <Marker
            coordinate={{
              latitude: ImageAppli[SelectImage].origin.location.lat,
              longitude: ImageAppli[SelectImage].origin.location.lng,
            }}
            identifier="origin"
            //! rajouter description au click sur marker
          />
        )}
       </>   
          
          }


      </MapView>
    </View>
  );
};

export default MapEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
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
