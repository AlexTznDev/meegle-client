import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import MapEventLocalization from "../MapEventLocalization";
import { useRoute } from '@react-navigation/native';

import { useNavigation } from "@react-navigation/native";

const LocalizationCourtMain = () => {

const navigation = useNavigation()
const route = useRoute();
const origin = route?.params //

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("CreateEvent")
        }}
      >
        <View
          style={{
            marginLeft: 10,
            paddingBottom:10,
            flexDirection:"row",alignItems:"center", gap:20
          }}
        >
          <AntDesign name="left" size={25} color="#222222" />
          <Text style={{fontSize:20}}>Padel court</Text>
        </View>
      </TouchableOpacity>
      <MapEventLocalization origin={origin}/>
    </View>
  );
};

export default LocalizationCourtMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 50,
  },
});
