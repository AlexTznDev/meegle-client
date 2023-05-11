import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import {
    setIsBtnAmisAndDateOn,
    setIsActiveNavigate
  } from "../slices/navSlice";
const FinalizeEventCreate = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
          dispatch(setIsBtnAmisAndDateOn(true));
                  
        });
        const subscribe = navigation.addListener("blur", () => {
            dispatch(setIsActiveNavigate("CreateMain2")); 
          setTimeout(() => {
            dispatch(setIsBtnAmisAndDateOn(false));
            
          }, 50);          
        });
    
        return () => {
          //demontage des composants
          unsubscribe();
          subscribe();
        };
      }, [navigation]);

    
  return (
    <View style={styles.container}>
      <Text>FinalizeEventCreate</Text>
    </View>
  )
}

export default FinalizeEventCreate

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})