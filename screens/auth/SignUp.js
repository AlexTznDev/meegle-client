import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import { auth } from "../../firebase";

import axios from "axios";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "@firebase/auth";
import { TextInput } from "react-native-gesture-handler";
import { CLIENT_ID_GOOGLE } from "@env";
import { IOS_CLIENT_ID } from "@env";

import { useDispatch, useSelector } from "react-redux";
import {
  setIsActiveNavigate,
  SelectfirstTimeUser,
  SetfirstTimeUser,
} from "../../slices/navSlice.js";

//! 3 keys to change on .ENV

WebBrowser.maybeCompleteAuthSession();

const SignUp = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch(); //! modification etat avec redux
  const isFirstTimeUser = useSelector(SelectfirstTimeUser);

  const [user, setUser] = useState(null);
  const [alreadySignUp, setalreadySignUp] = useState(false);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: CLIENT_ID_GOOGLE,
    iosClientId: IOS_CLIENT_ID,
  });

  const signInWithGoogle = async (credential) => {
    await signInWithCredential(auth, credential);
  };



  useEffect(() => {
    if (response?.type === "success" && response?.authentication) {
      const { idToken, accessToken } = response.authentication;
      const credential = GoogleAuthProvider.credential(idToken, accessToken);
      signInWithGoogle(credential);
    }
  }, [response]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {

      if (user) {
        try {
          const response = await axios.post(
            "http://localhost:5005/api/auth/signup",
            {
              email: user.email,
              firebaseUid: user.uid,
            }
          );
          if (response.data.userExists) {
            console.log("User already exists in the database.");
            await auth.signOut()
            setUser(null);
            setalreadySignUp(true);
          } else if (response.data.errorMessage) {
            console.log(response.data.errorMessage);
            setUser(null);
          } else {
            setUser(user);
          }
        } catch (error) {
          console.error(error);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const goToSignIn = () => {
      navigation.navigate("SignIn");
      setalreadySignUp(false);
  };
  

  const ShowUserInfo = () => {
    if (user && !alreadySignUp) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Welcome</Text>
          <Image
            source={{ uri: user.photoURL }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          ></Image>
          <Text>{user.displayName}</Text>
          <TouchableOpacity onPress={signOut}>
            <View
              style={{
                marginTop: 20,
                paddingTop: 15,
                paddingBottom: 15,
                backgroundColor: "#FFB25F",
                borderRadius: 10,
                width: 200,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                }}
              >
                Sign Out
              </Text>
            </View>
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ProfilMain"),
                  dispatch(setIsActiveNavigate("Profil"));
              }}
            >
              <Text>Profil page</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>User alreadySignUp</Text>
          <TouchableOpacity
            style={{
              paddingTop: 15,
              paddingBottom: 15,
              backgroundColor: "#FFB25F",
              borderRadius: 10,
              width: 300,
              justifyContent: "center",
              alignItems: "center",

            }}
            onPress={goToSignIn}
          >
            <Text
            style={{
              color:"#fff"
            }}
            >Go sign in</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {(user || alreadySignUp) && <ShowUserInfo />}

      {user === null && !alreadySignUp && (
        <>
          <View
            style={{
              height: "40%",
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
              source={require("../../assets/Meegle.png")}
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
                <Text style={{ color: "#FFB25F" }}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <View
                  style={{
                    paddingTop: 15,
                    paddingBottom: 15,
                    backgroundColor: "#FFB25F",
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
                  promptAsync();
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
                  navigation.navigate("ProfilMain"),
                    dispatch(setIsActiveNavigate("Profil"));
                }}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 30,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text>Already have an account?</Text>

                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("SignIn");
                    }}
                  >
                    <Text style={{ color: "#FFB25F", marginLeft: 10 }}>
                      Sign in
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
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
