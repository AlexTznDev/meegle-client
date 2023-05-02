import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setIsActiveNavigate } from "../../slices/navSlice.js";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import { auth } from "../../firebase";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "@firebase/auth";
import { TextInput } from "react-native-gesture-handler";
import { CLIENT_ID_GOOGLE } from "@env";
import { IOS_CLIENT_ID } from "@env";

//! 3 keys to change on .ENV

WebBrowser.maybeCompleteAuthSession();

const SignUp = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch(); //! modification etat avec redux

//   const [accessToken, setAccesToken] = useState(null);
  const [user, setUser] = useState(null);
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
    //   setAccesToken(accessToken);
    }
  }, [response]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  const ShowUserInfo = () => {
    if (user) {
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
      {user && <ShowUserInfo />}

      {user === null && (
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
              Sign In to your Account
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
                    Sign in with Google
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
                  <Text>Dont't have an account?</Text>

                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("SignUp");
                    }}
                  >
                    <Text style={{ color: "#FFB25F", marginLeft: 10 }}>
                      Sign up
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
