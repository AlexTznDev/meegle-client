import { StyleSheet, View, Keyboard } from "react-native";
import React, { useEffect, useRef, useState } from "react";



import MapView, { Marker } from "react-native-maps";

const MapEventInfo = (props) => {
  const mapRef = useRef(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);


  

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
    mapRef.current.animateToRegion({
      latitude: props.dataEventToRender?.localisation.location.lat,
      longitude: props.dataEventToRender?.localisation.location.lng,
      latitudeDelta: 0.0102,
      longitudeDelta: 0.0002,
    });
  }, []);

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
        <Marker
          coordinate={{
            latitude: props.dataEventToRender?.localisation.location.lat,
            longitude: props.dataEventToRender?.localisation.location.lng,
          }}
          identifier="origin"
          //! rajouter description au click sur marker
        />
      </MapView>
    </View>
  );
};

export default MapEventInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
