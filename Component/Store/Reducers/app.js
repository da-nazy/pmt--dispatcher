import { createSlice } from "@reduxjs/toolkit";

const appSlice=createSlice({
    name:'app',
    initialState:{
        value:{}
    },
    reducers:{
        setApp:(state,action)=>{
            state.value=action.payload;
        },
        removeApp:()=>{
        state.value={};
        }
    }
})

export const{setApp,removeApp}=appSlice.actions;
export default appSlice.reducer;