import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/FontAwesome5";


export const removeToken=async()=>{
    try{
      await AsyncStorage.removeItem('token');
      return true;
    }catch(e){
     return false;
    }
  }
 
  export const storeToken =async(value)=>{
     try{
     await AsyncStorage.setItem("token",value); 
     return true;
   }catch(e){
       return false;
     }
   }

   export const getToken=async(token)=>{
    try{
      const value=await AsyncStorage.getItem(token);
      if(value!=null){
        // check if the token haven't expired
        // set the token null
        return value;
      }else{
        // Take user to login Screen
        return false;
      }
    }catch(e){
      // error reading value
      return null;
    }
   }

   export const IconComp = (name, style, size, color) => {
    return <Icon name={name} size={size} color={color} style={style} />;
  };
  export const currentDate=()=>{
  return  new Date().toISOString().split('T')[0];
  }