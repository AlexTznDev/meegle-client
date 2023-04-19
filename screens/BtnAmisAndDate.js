import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import { selectEventStep, selectIsBtnAmisAndDateOn } from "../slices/navSlice";
import { useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";

const BtnAmisAndDate = () => {
  const EventStep = useSelector(selectEventStep);
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
      {EventStep === 1 && IsBtnAmisAndDateOn === false  ? (
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
                <AntDesign name="right" size={25} color="#222222" />
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={()=>{navigation.navigate("AddDateToEvent");}
            }
           
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
  },
});
