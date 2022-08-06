import { createSlice } from "@reduxjs/toolkit";

const wallet=createSlice({
    name:'wallet',
    initialState:{
        value:{}
    },
    reducers:{
     setWallet:(state,action)=>{
        state.value=action.payload
     },
     removeWallet:()=>{
    state.value={};
     }
    }
})

export const {setWallet,removeWallet}=wallet.actions;
export default wallet.reducer;