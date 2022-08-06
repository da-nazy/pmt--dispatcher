import { createSlice } from "@reduxjs/toolkit";

const transactions=createSlice({
    name:'transactions',
    initialState:{
        metaData:{},
        value:[],
    },
    reducers:{
        setTransactions:(state,action)=>{
            state.value=action.payload.value;
            state.metaData=action.payload.metaData;
        },
        removeTransactions:()=>{
            state={};
        }
    }
})

export const {setTransactions,removeTransactions}=transactions.actions;
export default transactions.reducer;