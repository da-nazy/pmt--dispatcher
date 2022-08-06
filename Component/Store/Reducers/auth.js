import { createSlice } from "@reduxjs/toolkit";
import { storeToken,removeToken } from "../../Storage";
 const authSlice=createSlice({
    name:'auth',
    initialState:{
    token:'',
    isAuthenticated:false
  }
    ,
    reducers:{
        setAuth:(state,action)=>{
          // auth should be boolean
         // should set token in local storage here
         state.token=action.payload.token;
         state.isAuthenticated=action.payload.auth;
        },
        removeAuth:(state)=>{
         state.token="";
         state.isAuthenticated=false;
         removeToken('token')
        }

    }
})

export const{setAuth,removeAuth}=authSlice.actions;
export default authSlice.reducer;