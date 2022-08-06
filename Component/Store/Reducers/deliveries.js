import { createSlice } from "@reduxjs/toolkit";

const deliveries=createSlice({
    name:'deliveries',
    initialState:{
        metaData:{},
        value:[],
    },
    reducers:{
        setDelivery:(state,action)=>{
            state.value=action.payload.value;
            state.metaData=action.payload.metaData;
        },
        removeDelivery:(state,action)=>{
            state.value=state.value.filter((e)=>e.id!==action.payload.id);
         }
    }
})

export const {setConfirmedDelivery,removeDevHistory}=deliveries.actions;
export default deliveries.reducer;