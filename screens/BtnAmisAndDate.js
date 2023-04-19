import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

import { selectEventStep } from "../slices/navSlice";
import { useSelector } from "react-redux";

const BtnAmisAndDate = () => {
  const EventStep = useSelector(selectEventStep);

  return (
    <>
      {EventStep !== 0 && (
        <View>
          <View style={styles.footer}>
            <TouchableOpacity>
              <View style={styles.BtnDown}>
                <Text style={{ fontSize: 17 }}>Ajouter amis</Text>
                <AntDesign name="right" size={25} color="#222222" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={[styles.BtnDown, { borderTopWidth: 0 }]}>
                <Text style={{ fontSize: 17 }}>Date de l'évenement</Text>
                <AntDesign name="right" size={25} color="#222222" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default BtnAmisAndDate;

const styles = StyleSheet.create({
  footer: {
    marginBottom: 0,
  },
  BtnDown: {
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 2,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: "#00000020",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
