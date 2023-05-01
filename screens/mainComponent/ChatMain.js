import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  View,
} from "react-native";

import React, { useEffect, useState } from "react";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import {auth} from "../../firebase"

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential
} from "@firebase/auth";

//! 3 keys to change on .ENV

WebBrowser.maybeCompleteAuthSession();

const ChatMain = () => {
  const [accessToken, setAccesToken] = useState(null);
  const [user, setUser] = useState(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "621288007374-s35nf4b11qcn1q9db1t9859gtto3eaa1.apps.googleusercontent.com",
    iosClientId:
      "621288007374-umtio2qe2de5a29gqkjvnl6cqk09a6o8.apps.googleusercontent.com",
  });

  const signInWithGoogle = async (credential) => {
    await signInWithCredential(auth, credential);
  };

  useEffect(() => {
    if (response?.type === "success" && response?.authentication) {
      const { idToken, accessToken } = response.authentication;

      const credential = GoogleAuthProvider.credential(idToken, accessToken);

      signInWithGoogle(credential);

      setAccesToken(accessToken);
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
          <View></View>
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

  const fetchUserInfo = async () => {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const userInfo = await response.json();
    setUser(userInfo);
  };

  return (
    <SafeAreaView style={styles.container}>
      {user && <ShowUserInfo />}

      {user === null && (
        <>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              gap: 10,
            }}
          >
            <Text>Signup</Text>

            <View
              style={{
                width: "90%",
              }}
            >
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
                    backgroundColor: "#FFB25F",
                    borderRadius: 10,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                    }}
                  >
                    Button
                  </Text>
                </View>
              </TouchableOpacity>

            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default ChatMain;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
