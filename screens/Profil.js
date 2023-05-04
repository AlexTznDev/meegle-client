import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, {useEffect} from "react";

import useAuth from "../hooks/useAuth";

import { useNavigation } from "@react-navigation/native";

import { setIsActiveNavigate } from "../slices/navSlice";
import { useDispatch } from "react-redux";

const Profil = () => {
  const { user, signOut , setUser} = useAuth(); //! context auth
  const navigation = useNavigation();
  const dispatch = useDispatch()


  useEffect(() => {
    if (user === null) {
      signOut();
      dispatch(setIsActiveNavigate("AuthMain"))
      navigation.navigate("AuthMain");
      
    }
  }, [user, signOut, navigation]);




  return (
<>

{user !== null ? 
(<SafeAreaView
      style={{
        backgroundColor: "#1D2328",
        color: "#fff",
        borderBottomRightRadius: 37,
      }}
    >
      <View
        testID="containerProfil"
        style={{
          paddingBottom: 20,
          paddingTop: 20,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <View
          testID="containerImageNameProfil"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 40,
            gap: 40,
          }}
        >
          <Image
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
            }}
            source={{ uri: user.photoURL }}
            // source={require("../assets/moi.jpg")}
          />

          <View>
            <Text style={styles.h1}>Alex Tuysuzian</Text>
            <Text style={styles.h3}>Valencia, Alboraya</Text>
          </View>
        </View>

        <View
          testID="containerButtonProfil"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: 150,
              paddingTop: 10,
              paddingBottom: 10,
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <Text>Edit profil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setUser(null);
            }}
            style={{
              width: 150,
              paddingTop: 10,
              paddingBottom: 10,
              borderWidth: 1,
              borderColor: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <Text style={styles.h3}>Find someone</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 90,
              height: 30,
            }}
            resizeMode="contain"
            source={require("../assets/Meegle.png")}
          />
        </View>
      </View>
    </SafeAreaView>):(<View><Text>...is fetching</Text></View>)}

</>


  );
};

export default Profil;

const styles = StyleSheet.create({
  h1: {
    color: "#fff",
    fontSize: 20,
  },
  h3: {
    color: "#fff",
    fontSize: 12,
  },
});
