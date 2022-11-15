// Should house the url Api for the application 
import axios from 'axios';
import {GoogleKey,LocalUrl,RemoteUrl,Ewallet} from '@env';

/** 
 *   method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
 */
/**
 *  PICKUP_STATUS: {
    PENDING: "PENDING",  // STEP -1
    ASSIGNED: "ASSIGNED",  // STEP -2
    ACCEPTED: "ACCEPTED",  // STEP -3
    COLLECTION: "RELEASED",  // STEP -4
    DECLINED: "DECLINED",  // STEP -3
    CANCELLED: "CANCELLED",  // STEP - x -> 0
    DISPATCHED: "DISPATCHED",  // STEP -5
    DELIVERED: "DELIVERED",  // STEP -6
    CONFIRMED: "CONFIRMED",  // STEP -7
    DISPUTED: "DISPUTED",
 */

    export const currentDate=()=>{
        var today=new Date();
        return today.getFullYear();
    }

    export const symbols = {
        naira: "\u20A6",
        copyright:"\u00A9"
      };
      export const color={
          primary:"#5A4BD9",
      }
    export const pinColor = {
        color1: "red",
        color2: "tomato",
        color3: "orange",
        color4: "yellow",
        color5: "gold",
        color6: "wheat",
        color7: "tan",
        color8: "linen",
        color9: "green",
        color10: "blue",
        color11: "navy",
        color12: "aqua",
        color13: "teal",
        color14: "turquoise",
        color14: "violet",
        color15: "purple",
        color16: "plum",
        color17: "indigo",
      };


export const api={
    pickupStatus:["COLLECTION","DECLINE","CANCEL","DISPATCHED","DELIVERED","CONFIRM","ACCEPTED"],
    login:'api/erp/staff/login',
    register:'api/erp/partners',
    userProfile:'api/erp/staff/me',
    pickup:'api/pml/pml-pickups',
    parcel:'api/pml/pml-parcels',
    delivery:'',
    collection:'api/pml/pml-collections',
    assignment:'api/pml/assignments',
    assignmentOperation:'api/pml/assignments/operation/',
    pickupOperation:'api/pml/pml-pickups/',
    editProfile:'',
    recoverPassword:'api/erp/staff/otp',
    transaction:'api/ewallet/transactions/user?sort=-_id&populate=deposits',
    ewallet:Ewallet,
   // localUrl:LocalUrl,
    currentLocation:'api/erp/staff/self/location',
    mapDirections:'https://maps.googleapis.com/maps/api/directions/json?origin=',
    localUrl:RemoteUrl,
    mapKey:GoogleKey,
    appVersion:'api/erp/settings/version/PML_DISPATCHER',
    versionKey:'1.13',
    playstorelink:'https://play.google.com/store/apps/details?id=com.pmtdispatcher',
}


 
 // Generic request call 

export const apiRequest=(requestObject,load,succFunc,errorFun,getPayload)=>{
     console.log(requestObject)
    load(true);
    axios(
        requestObject
      ).then(function (response){
          load(false);
          if(typeof response!=='undefined'){
            
            succFunc(response.data.message);
            getPayload(response.data.payload);
          }else{
            return;
          }
          
       //   console.log(response);
      }).catch(function (error){
          load(false);
    
         // errorFun(error.response.data.message);
         // console.log(error.response.data);
         // typeof keyword is used to check the datatype
         if(typeof error.response!=='undefined'){
            if(error.response.data.message){
                errorFun(error.response.data.message);
             }else{
 
                errorFun(error.response);
             }
           
         }else{
           
            return;
           
         }

         
        
     
      });
}

export const getUserProfile=(requestObject,load,succFunc,errorFun,getPayload)=>{
  
    load(true);
    axios(
        requestObject
      ).then(function (response){
          load(false);
          let msg=response.data.message;
          succFunc(msg?msg:'No message');
          let appData=response.data.payload;
           getPayload(appData);
          console.log('response')
       //   console.log(response);
      }).catch(function (error){
          load(false);
          console.log(error.response.data)
          //errorFun("Error found")
          errorFun('error');
          // console.log(error);
        
     
      });
}