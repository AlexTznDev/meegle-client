import React, { createContext, useState, useContext, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { CLIENT_ID_GOOGLE } from "@env";
import { IOS_CLIENT_ID } from "@env";
import { auth } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setIsActiveNavigate } from "../slices/navSlice";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "@firebase/auth";

import { useNavigation } from "@react-navigation/native";

//! 3 keys to change on .ENV

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); //! user reponse de google
  const [userDBMONGO, setuserDBMONGO] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isEditStep, setisEditStep] = useState(false);

  const [alreadySignUp, setalreadySignUp] = useState(false);

  const navigation = useNavigation();

  const dispatch = useDispatch(); //! modification etat avec redux

  const [authToken, setAuthToken] = useState(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: CLIENT_ID_GOOGLE,
    iosClientId: IOS_CLIENT_ID,
  });



const updateUserMongoDb = async()=>{
try {

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };
  const response = await axios.get("http://localhost:5005/api/profil", config)

if(response.data){
  setuserDBMONGO(response.data)
  
}

} catch (error) {
  console.log(error)
}
}




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
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          if (isSignUp === false) {
            const response = await axios.post(
              "http://localhost:5005/api/auth/login",
              {
                firebaseToken: firebaseUser.stsTokenManager.accessToken,
              }
            );
            if (response.data.errorMessage && response.data.errorMessage === "There is no created user") {
              console.log(response.data.errorMessage);
              dispatch(setIsActiveNavigate("AuthMain"));
              navigation.navigate("SignUp");
              await auth.signOut();

              setUser(null);
            } else if ( response.data.errorMessage && response.data.errorMessage === "Invalid token") {
              console.log(response.data.errorMessage);
              await auth.signOut();
            }
            else if(response.data.message && response.data.message === "Logged in successfully"){
              console.log(response.data.message);
              const authToken = response.data.authToken;
              setUser(firebaseUser);
              setAuthToken(authToken);
  
              if (authToken !== undefined && authToken !== null) {
                storeToken(authToken);
                dispatch(setIsActiveNavigate("Profil"));
              }
            }
          }

          if (isSignUp === true) {
           
            const response = await axios.post(
              "http://localhost:5005/api/auth/signup",
              {
                firebaseToken: firebaseUser.stsTokenManager.accessToken,
              }
            );

            if (response.data.errorMessage && response.data.errorMessage === "Already registered") {
              console.log(response.data.errorMessage);
              setalreadySignUp(true);
              dispatch(setIsActiveNavigate("AuthMain"));
              await auth.signOut();

              setUser(null);
            } else if (response.data.errorMessage && response.data.errorMessage === "Invalid token") {
              console.log(response.data.errorMessage);
              await auth.signOut();
            } else {
              console.log(response.data.message)
              const authToken = response.data.authToken;
              setUser(firebaseUser);
              setisEditStep(true)
              setAuthToken(authToken);
              if (authToken !== undefined && authToken !== null) {
                storeToken(authToken);
              }
              navigation.navigate("UserNameChoose")
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, [isSignUp]);

  useEffect(() => {
    if (authToken !== undefined && authToken !== null) {
      getUserData();
    }
  }, [authToken]);

  const getUserData = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response = await axios.get(
        "http://localhost:5005/api/profil",
        config
      );

      const userData = response.data;
      dispatch(setIsActiveNavigate("Profil"))
      setuserDBMONGO(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  //! permet au rechargement de la page de recuperer le token de l ancienne session et de recuper les data de l user
  const loadToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("authToken");
      if (storedToken) {
        setAuthToken(storedToken);
      }
    } catch (error) {
      console.error("Error loading JWT from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    loadToken();
  }, []);

  //! permet de stocker le token dans le async storage
  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem("authToken", token);
    } catch (error) {
      console.log("Error storing token:", error);
    }
  };

  //! permet de remove le token
  const removeToken = async () => {
    try {
      setAuthToken(null);
      await AsyncStorage.removeItem("authToken");
    } catch (error) {
      console.log("Error removing token from AsyncStorage:", error);
    }
  };

  //! permet de deconnecter la session google de firebase
  const signOut = async () => {
    try {
      setUser(null);
      setuserDBMONGO(null);
      await auth.signOut();
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
        authToken,
        setAuthToken,
        storeToken,
        setuserDBMONGO,
        userDBMONGO,
        removeToken,
        setIsSignUp,
        alreadySignUp,
        setalreadySignUp,
        setisEditStep,
        isEditStep,
        updateUserMongoDb
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
