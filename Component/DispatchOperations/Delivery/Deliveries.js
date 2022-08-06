import React, { useState,useCallback,useContext,useRef,useEffect} from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from "react-native";


import { AppColor } from "../../WorkerComp/AppColor";
import OpComp from "../../WorkerComp/OpComp";
import { useSelector,useDispatch} from "react-redux";
import { apiRequest,api } from "../../WorkerComp/Api";
import { UserContext } from "../../DataProvider/UserContext";
import LoaderComp from "../../WorkerComp/LoaderComp";
import Custombtm from "../../WorkerComp/Custombtm";
import ViewPickup from "../Pickup/ViewPickup";
import Parcel from '../Parcel/Parcel';
import IconComp from '../../WorkerComp/IconComp';
import DateFilter from '../../WorkerComp/DateFilter';
import TCoperation from './TCoperation';
import HeaderComp from '../../WorkerComp/HeaderComp';
import {currentDate} from '../../WorkerComp/ExternalFunctions';
export default function Deliveries({navigation}) {
  const {navigate}=navigation;
  const appAuth=useSelector((app)=>app.auth);
  const appUser=useSelector((app)=>app.user.value);

   const btmRef=useRef(null); 
   const parcelRef=useRef(null);
   const dateFilterRef=useRef(null);
   const pickRef=useRef(null);
  const [pendingPickup, setPendingPickup] = useState(null);
  const [appOp, setAppOp] = useState({
    refresh: false,
    loader: false,
    parcelId:'',// 1 for pickup 2 for parcel 3 for map 
    operation:'',
    pickupObject:null,
  });
  
 useEffect(()=>{
   if(!pendingPickup){
     getAssignedPickup()
   }
 },[pendingPickup])
  const[currentPickup,setCurrentPickup]=useState(null);

  const pendPickSuc=(e)=>{
  // Alert.alert("Success",e);
  }
  const pendPickFail=(e)=>{
   Alert.alert("Fail",e);
  }
  const pendPickPayload=(e)=>{
   setPendingPickup(e);
  }
  const pickupPayload=(e)=>{
    if(e.length>0){
      setPendingPickup(e);
    }
     console.log(e);
  }

  const filterApp=(e)=>{
    dateFilterRef.current.close();
    if(e){
      getAssignedPickup(e);
    }
}

  const getAssignedPickup=(dateQuery)=>{
    var pickupObject={
      method:'GET',
      url:`${api.localUrl}${api.assignment}?populate=pmlParcel&dispatcher=${appUser.id}&type=TC&status=PENDING`,
       headers:{
         Authorization:' Bearer ' + appAuth.token,
         'Cache-Control': 'no-cache',
       }
    }
    if(dateQuery){
      pickupObject.url+=`&${dateQuery}`;
     }else{
       pickupObject.url+=`&createdAt>=${currentDate()}`
     }

    apiRequest(pickupObject,(e)=>{setAppOp({...appOp,load:e})},(e)=>{pendPickSuc(e)},(e)=>pendPickFail(e),(e)=>pickupPayload(e));
    
  }
  
 

 const wait=(timeOut)=>{
     return new Promise(resolve=>setTimeout(resolve,timeOut))
 }


 const openPickOp=(e)=>{
   console.log(e.type);
   setAppOp({...appOp,pickupObject:e},pickRef.current.open());
     
 }
 const openPickup=(e)=>{
   btmRef.current.open();
   // should setpickup object
    //  console.log(e);
    setCurrentPickup(e);
 }

  const onRefresh=useCallback(()=>{
      setAppOp({...appOp,load:true});
      console.log("onrefreshing");
       getAssignedPickup();
      //Action to perform goes here
      wait(200).then(()=>setAppOp({...appOp,load:false}))
  },[]); 
 
   const onOpehange=()=>{
     pickRef.current.close();
     setPendingPickup(null);
   }
  const pickupAssignment=(e)=>{
    console.log(e);
    Alert.alert(
      'Pickup Assignment',
      'Choose to Accept the Pickup?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pickup'),
        },
        {
          text: 'Accept',
          onPress: () => console.log('Accept Pickup'),
          style: 'cancel',
        },
        {text: 'Decline', onPress: () => console.log('Delined Pickup')},
      ],
      {cancelable: false},
     );
  }

  const viewParcel=(e)=>{
    btmRef.current.close();
    setAppOp({...appOp,parcelId:e},parcelRef.current.open());
    
  }

 
  return (
    <View style={style.container}>
      <HeaderComp iconName={'truck'} name={"Delivery"} nav={navigation}/>

     <View style={{width:'100%',flexDirection:'row',justifyContent:'flex-end'}}>
   
     <TouchableOpacity onPress={()=>dateFilterRef.current.open()} style={{flexDirection:'row',alignItems:'center',marginTop:10}}><IconComp name={"calendar-week"} color={AppColor.third} size={20} /></TouchableOpacity>

     </View>
    
      <ScrollView
        style={style.scrollContainer}
        refreshControl={<RefreshControl
            refreshing={appOp.refresh}
            onRefresh={onRefresh}
            />}
      >
        
        {pendingPickup?(pendingPickup.map((e,i)=>{
          return(
            <OpComp key={i}
            catIcon="boxes"
            subIcon="clock"
            name={e.pmlParcel.description}
            func={() => openPickup(e)}
            pickOp={()=>openPickOp(e)}
          />
          )
        })):<OpComp  name="No Pending Delivery Found Today. Swipe To Refresh!" func={()=>console.log("Nothing to Show")}/>}
      </ScrollView>
      {appOp.refresh&&(<LoaderComp size={20} color={AppColor.third}/>)}
      <Custombtm e={()=><ViewPickup pickupPayload={currentPickup} viewLocation={()=>navigation.navigate('Location',{locTo:currentPickup.locationTo,locFrom:currentPickup.locationFrom})} viewParcel={(e)=>viewParcel(e)} collectPick={(e)=>pickupAssignment(e)}/>} height={450} btmRef={btmRef} />
      <Custombtm   e={()=><Parcel parcelId={appOp.parcelId}/>} height={Dimensions.get('screen').height} btmRef={parcelRef} cod={false}/>
       <Custombtm e={()=><DateFilter func={(e)=>filterApp(e)}/>} height={Dimensions.get('screen').height/2.5} btmRef={dateFilterRef} cod={true}/>
       <Custombtm e={()=><TCoperation pickup={appOp.pickupObject}/>} height={Dimensions.get('screen').height} btmRef={pickRef} cod={true}/>
    
    </View>
  );
}
const style = StyleSheet.create({
  pendPick: {
    flexDirection: "row",
    height: 50,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  scrollContainer: {
    width: Dimensions.get("screen").width / 1.02,
  },
  container: {
    display: "flex",
    alignItems: "center",
    padding: 10,
    paddingBottom: 30,
    backgroundColor: "#fff",
    height: Dimensions.get("screen").height,
    //   height:Dimensions.get('screen').height/1,
  },
  text: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "bold",
    borderBottomWidth: 1,
    width: "100%",
  },
  filType:{
    
     borderRadius: 2,
     width:'80%',
     marginTop:10,
     backgroundColor:'#fff',
     flexDirection:'row',
     shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  }
});
