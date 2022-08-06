import * as  React from 'react';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { CustomDrawerContent } from '../WorkerComp/DrawerContent';
import {dispatch,useDispatch,useSelector} from 'react-redux';
import Profile from '../Profile/Profile';
import ResetPassword from '../ResetPassword/ResetPassword';
import Menu from '../Menu/Menu';
import Transaction from '../UserTransaction/Transaction';
import Support from '../Support/Support';
import Parcel from '../DispatchOperations/Parcel/Parcel';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppColor } from '../WorkerComp/AppColor';
import PickDrop from '../DispatchOperations/Pickup/PickDrop';
import Pickups from '../DispatchOperations/Collection/Pickups';
import Deliveries from '../DispatchOperations/Delivery/Deliveries';
 import PickupLocationMap from '../Map/PickupLocationMap';
 import Transactions from '../Transaction/Transactions';
 import Wallet from '../Wallet/Wallet';
 import History from '../History/History';
 import { UserContext } from '../DataProvider/UserContext';
import GetLocation from 'react-native-get-location'
import { Alert ,PermissionsAndroid} from 'react-native';
import { apiRequest,api } from '../WorkerComp/Api';
import { removeAuth } from '../Store/Reducers/auth';
import { StackActions } from "@react-navigation/native";
import axios from 'axios';
const Drawer=createDrawerNavigator();
 // To read props and act on it
export default function AppSection({navigation,route}){
  const appAuth=useSelector((app)=>app.auth);
  const appUser=useSelector((app)=>app.user);
  const dispatch=useDispatch();
    var goto="";
    goto=route.params.goto;
    const usercontext=React.useContext(UserContext);
    const {userG,userProfile}=usercontext;
    const [coordinate,setCoordinate]=React.useState({
      long:0,
      lat:0,
    })
    const requestPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Permission",
            message:
              "Cool Photo App needs access to your camera " +
              "so you can take awesome pictures.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
            console.log(location);
          setCoordinate({...coordinate,lat:location?.latitude,long:location?.longitude});
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        });
        
          } else {
          console.log("permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    
    }
  const updateLocation=()=>{
    var locationObject={
      method:'put',
      url:`https://sandbox.pmt.ng/${api.currentLocation}/${appUser.id}`,
      headers:{
          Authorization:' Bearer ' + appAuth.token,
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
      },
      data:{
        latitude:coordinate.lat,
        longitude:coordinate.long
      }
    }

    axios(locationObject).then(function(response){
     setCoordinate({...coordinate,long:0,lat:0})
    }).catch(function(error){
    console.log(error.response.data)
    })
   
  }
      React.useEffect(()=>{
          if(coordinate.lat>0){
           // perform the update 
           // after update set the cord to 0
           updateLocation();
          }
      },[coordinate])
       let interval;
        React.useEffect(()=>{
          requestPermission();
        },[]);

       interval=setInterval(() => {
        requestPermission();
       }, 1000*60);

       const logout=()=>{
        dispatch(removeAuth());
        navigation.dispatch(StackActions.replace("Login"));
      }

      React.useEffect(()=>{
         if(!appAuth.token){
          logout();
         }
      },[appAuth.token]);
          
    return(    
         <Drawer.Navigator  initialRouteName={goto?goto:'Menu'} drawerContent={(props)=><CustomDrawerContent {...props}/>}>
             <Drawer.Screen name='Profile' component={Profile} options={{headerShown:true}}/>
             <Drawer.Screen name="Reset Password" component={ResetPassword} options={{headerShown:true}}/>
             <Drawer.Screen name="Menu" component={Menu} options={{headerShown:false}}/>
             <Drawer.Screen name="Deliveries" component={Deliveries} options={{headerShown:false}}/>
             <Drawer.Screen name="Pickups" component={Pickups} options={{headerShown:false}}/>
             <Drawer.Screen name="PickDrop" component={PickDrop} options={{headerShown:false}}/>
             <Drawer.Screen name="Transaction" component={Transaction} options={{headerShown:false}}/>
             <Drawer.Screen name="Support" component={Support} options={{headerShown:true}}/>
             <Drawer.Screen name="Location" component={PickupLocationMap} options={{headerShown:false}}/>
             <Drawer.Screen name="Parcel" component={Parcel} options={{headerShown:true,headerRight:()=>(<Icon name="box-open" size={20} color={AppColor.third} style={{marginRight:15}}/>)}}/>  
             <Drawer.Screen name="Transactions" component={Transactions} options={{headerShown:false}}/>
             <Drawer.Screen name="Wallet" component={Wallet} options={{headerShown:false}}/>
             <Drawer.Screen name="History" component={History} options={{headerShown:false}}/>   
         </Drawer.Navigator>  
    )
}
