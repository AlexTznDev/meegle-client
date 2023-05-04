import React, { createContext, useState, useContext, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { CLIENT_ID_GOOGLE } from "@env";
import { IOS_CLIENT_ID } from "@env";
import { auth } from "../firebase";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "@firebase/auth";


//! 3 keys to change on .ENV

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUserVerified, setisUserVerified] = useState(false);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: CLIENT_ID_GOOGLE,
    iosClientId: IOS_CLIENT_ID,
  });

  const googleSignInRequest = () => {
    promptAsync();
  };

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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);


  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        request,
        googleSignInRequest,
        signOut,
        setUser,
        setisUserVerified,
        isUserVerified
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
