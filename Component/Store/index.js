import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Reducers/auth";
import userReducer from  "./Reducers/user";
import walletReducer from "./Reducers/wallet";
import transactionsReducers from "./Reducers/transactions";
import pickupReducer from './Reducers/pickup';
import pickDropReducer from './Reducers/pickdrop';
import deliveryReducer from './Reducers/delivery';
import deliveriesReducer from './Reducers/deliveries';
export default configureStore({
      reducer:{
      auth:authReducer,
      user:userReducer,
      wallet:walletReducer,
      transactions:transactionsReducers,
      pickup:pickupReducer,
      pickDrop:pickDropReducer,
      deilvery:deliveryReducer,
      deliveries:deliveriesReducer
      }
})