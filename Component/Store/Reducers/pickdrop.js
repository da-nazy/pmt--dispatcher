import { createSlice } from "@reduxjs/toolkit";

const pickDrop=createSlice({
    name:'pickDrop',
    initialState:{
        metaData:{},
        value:[]
    },
    reducers:{
        setPickup:(state,action)=>{
            state.value=action.payload.value;
            state.metaData=action.payload.metaData;
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

export const {setPickup,editPickup,removePickup}=pickDrop.actions;
export default pickDrop.reducer;