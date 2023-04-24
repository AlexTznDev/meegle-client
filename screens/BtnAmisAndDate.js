import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import {
  selectEventStep,
  selectIsBtnAmisAndDateOn,
  selectTimeEvent,
  selectDateEvent,
  SelectListFriendAdded
} from "../slices/navSlice";
import { useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";

const BtnAmisAndDate = () => {
  const timeEvent = useSelector(selectTimeEvent);
  const dateEvent = useSelector(selectDateEvent);
  const EventStep = useSelector(selectEventStep);
  const addedFriendList = useSelector(SelectListFriendAdded);
  const IsBtnAmisAndDateOn = useSelector(selectIsBtnAmisAndDateOn);
  const [animationValue1] = useState(new Animated.Value(50));
  const [animationValue2] = useState(new Animated.Value(50));
  const navigation = useNavigation();

  const startAnimation = () => {
    Animated.timing(animationValue1, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
    Animated.timing(animationValue2, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <>
      {EventStep === 1 && IsBtnAmisAndDateOn === false ? (
        <View>
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AddFriendEvent");
              }}
            >
              <Animated.View
                style={[
                  styles.BtnDown,
                  {
                    transform: [{ translateY: animationValue1 }],
                  },
                ]}
              >
                <Text style={{ fontSize: 17 }}>Ajouter amis</Text>
                {addedFriendList.length !== 0 ? (
                  <Text style={{ fontSize: 11, color:"#00000050" }}>
                    {addedFriendList.length} amis
                  </Text>
                ) : null}
                <AntDesign name="right" size={25} color="#222222" />
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AddDateToEvent");
              }}
            >
              <Animated.View
                style={[
                  styles.BtnDown,
                  {
                    transform: [{ translateY: animationValue2 }],
                    borderTopWidth: 0,
                  },
                ]}
              >
                <Text style={{ fontSize: 17 }}>Date de l'évenement</Text>
                {timeEvent || dateEvent ? (
                  <Text style={{ fontSize: 11, color:"#00000050" }}>
                    {dateEvent}, {timeEvent}
                  </Text>
                ) : null}
                <AntDesign name="right" size={25} color="#222222" />
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
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
    alignItems: "center",
  },
});
