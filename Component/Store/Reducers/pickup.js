import { createSlice } from "@reduxjs/toolkit";

const pickupSlice=createSlice({
    name:'pickup',
    initialState:{
        metaData:{},
        value:[]
    },
    reducers:{
        setPickup:(state,action)=>{
            state.value=action.payload;
        },
        editPickup:(state,action)=>{
          let temp=state.value.find((e,i)=>e.id===action.payload.id);
          if(temp){
            state.value=[...temp,state.value]
          }
        },
        removePickup:(state,action)=>{
           state.value=state.value.filter((e)=>e.id!==action.payload.id);
        }
    }
})

export const {setPickup,editPickup,removePickup}=pickupSlice.actions;
export default pickupSlice.reducer;