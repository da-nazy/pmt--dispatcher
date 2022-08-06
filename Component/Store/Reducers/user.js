import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:'user',
    initialState:{
    value:{}
    },
    reducers:{
        setUser:(state,action)=>{
            state.value=action.payload; 
        },
        editUser:(state,action)=>{
            state.value={...state.value,...action.payload}
        },
        removeUser:()=>{
            state.value={}
        }
    }
})

export const {setUser,editUser,removeUser}=userSlice.actions;
export default userSlice.reducer;