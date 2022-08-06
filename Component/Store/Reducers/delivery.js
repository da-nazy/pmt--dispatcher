import { createSlice } from "@reduxjs/toolkit";

const delivery=createSlice({
    name:'delivery',
    initialState:{
        metaData:{},
        value:[]
    },
    reducers:{
        setdelivery:(state,action)=>{
            state.value=action.payload.value;
            state.metaData=action.payload.metaData;
        },
        editdelivery:(state,action)=>{
          let temp=state.value.find((e,i)=>e.id===action.payload.id);
          if(temp){
            state.value=[...temp,state.value]
          }
        },
        removedelivery:(state,action)=>{
           state.value=state.value.filter((e)=>e.id!==action.payload.id);
        }
    }
})

export const {setdelivery,editdelivery,removedelivery}=delivery.actions;
export default delivery.reducer;