import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/FontAwesome5";


export const removeToken=async()=>{
    try{
      await AsyncStorage.removeItem('token');
    }catch(e){
     console.log(e)
    }
  }
 
  export const storeToken =async(name,value)=>{
     try{
     await AsyncStorage.setItem(name,value); 
      
   }catch(e){
      console.log(e)
     }
   }

   export const getToken=async(token)=>{
    try{
      const value=await AsyncStorage.getItem(token);
      return value;
    }catch(e){
      // error reading value
      console.log(e)
    }
   }
