import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import * as WebBrowser from "expo-web-browser";

import { TextInput } from "react-native-gesture-handler";

import { useDispatch } from "react-redux";
import { setIsActiveNavigate } from "../../slices/navSlice.js";
import useAuth from "../../hooks/useAuth";

WebBrowser.maybeCompleteAuthSession();

const SignUp = () => {
  const {
    googleSignInRequest,
    request,
    setIsSignUp,
    alreadySignUp,
    setalreadySignUp,
    
  } = useAuth(); //! context auth
  const navigation = useNavigation();

  const dispatch = useDispatch(); //! modification etat avec redux

  const handleSignUp = () => {
    setIsSignUp(true);
    googleSignInRequest(); 
  };

  return (
    <View style={styles.container}>
      <>
        <View
          style={{
            height: "45%",
            width: "100%",
            marginBottom: 50,
          }}
        >
          <Image
            source={require("../../assets/valenciaImg.png")}
            style={{
              width: "100%",
              height: "100%",
            }}
            resizeMode="cover"
          />

          <Image
            style={{
              width: 100,
              height: 50,
              left: "50%",
              transform: [{ translateX: -50 }],
              position: "absolute",
              top: "20%",
            }}
            resizeMode="contain"
            source={require("../../assets/Meegel.png")}
          />
          <Text
            style={{
              position: "absolute",
              fontSize: 40,
              color: "#fff",
              fontWeight: "bold",
              bottom: 40,
              left: 20,
            }}
          >
            Create Account
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: 10,
          }}
        >
          <View
            style={{
              width: "90%",
              gap: 10,
            }}
          >
            <TextInput
              placeholder="Email"
              style={{
                paddingTop: 15,
                paddingBottom: 15,
                paddingLeft: 20,
                borderWidth: 0.5,
                borderColor: "#00000070",
                borderRadius: 10,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                gap: 10,
                marginBottom: 3,
              }}
            ></TextInput>
            <TextInput
              secureTextEntry={true}
              placeholder="Password"
              style={{
                paddingTop: 15,
                paddingBottom: 15,
                paddingLeft: 20,
                borderWidth: 0.5,
                borderColor: "#00000070",
                borderRadius: 10,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                gap: 10,
                marginBottom: 10,
              }}
            ></TextInput>

            <TouchableOpacity
              style={{
                alignItems: "flex-end",
                paddingBottom: 5,
              }}
            >
              <Text style={{ color: "#52C234" }}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <View
                style={{
                  paddingTop: 15,
                  paddingBottom: 15,
                  backgroundColor: "#52C234",
                  borderRadius: 10,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                  }}
                >
                  Login
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!request}
              onPress={() => {
                handleSignUp();
              }}
            >
              <View
                style={{
                  paddingTop: 15,
                  paddingBottom: 15,
                  borderWidth: 0.5,
                  borderColor: "#00000070",
                  borderRadius: 10,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                <Image
                  source={require("../../assets/google.png")}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: "#000000",
                  }}
                >
                  Sign up with Google
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                dispatch(setIsActiveNavigate("AuthMain"));
                setalreadySignUp(false);
                navigation.navigate("SignIn");
              }}
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                {alreadySignUp ? (
                  <Text style={{ color: "red" }}>Already have an account:</Text>
                ) : (
                  <Text> Already have an account?</Text>
                )}

                <TouchableOpacity
                  onPress={() => {
                    dispatch(setIsActiveNavigate("AuthMain"));
                    navigation.navigate("SignIn");
                  }}
                >
                  {alreadySignUp ? (
                    <Text style={{ color: "red", marginLeft: 10 }}>
                      Sign in
                    </Text>
                  ) : (
                    <Text style={{ color: "#52C234", marginLeft: 10 }}>
                      Sign in
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
});
