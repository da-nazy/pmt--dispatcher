import React,{useContext} from 'react';
import { View,Text} from 'react-native';
import {UserContext} from "../../DataProvider/UserContext";
import { apiRequest,api} from '../../WorkerComp/Api';
export default function ViewParcelComp() {
    //  To get the parcel id and populate
     const usercontext=useContext(UserContext);
    const {userG,userProfile}=usercontext;
   const [appDetails,setAppDetails]=useState({
       load:false,
       refresh:false,

   })

    const getParcelDetails=(id)=>{
        var parcelObject={
       method:'GET',
       url:`${api.localUrl}${api.parcel}?id=${id}`,
       headers:{
       Authorization:' Bearer ' + userG.token,
     }
  }
   
  const parcelSuc=(e)=>{
  console.log(e);
  }
  const parcelFail=(e)=>{
  console.log(e);
  }
  const  parcelPayload=(e)=>{
  console.log(e);
  }
  apiRequest(parcelObject,(e)=>{setAppDetails({...appDetails,load:e})},(e)=>{parcelSuc(e)},(e)=>parcelFail(e),(e)=>parcelPayload(e));
  
    }
    return (
        <View>
           <View>
               <Text>
                   Parcel view
               </Text>
           </View>

        </View>
    )
}
