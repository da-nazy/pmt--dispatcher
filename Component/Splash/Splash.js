import React,{useState,useEffect, useContext} from 'react';
import { View,Text,Image,StyleSheet} from 'react-native';
import { UserContext } from '../DataProvider/UserContext';
import { useDispatch,useSelector } from 'react-redux';

import splashImg from '../../Asset/splashImg.png';
import pmldispatcher from '../../Asset/pmldispatcher.png';
import LoaderComp from '../WorkerComp/LoaderComp';
import { AppColor } from '../WorkerComp/AppColor';
import {StackActions} from '@react-navigation/native';
import {getToken} from '../WorkerComp/ExternalFunctions';
import {api,apiRequest,symbols,getUserProfile} from '../WorkerComp/Api';
import { setUser } from '../Store/Reducers/user';
import { setAuth } from '../Store/Reducers/auth';

export default function Splash({navigation}){
     const dispatch=useDispatch();
     const userAuth=useSelector((e)=>e.auth);
    
    const [appOp,setAppOp]=useState({
      load:false,
      token:''
    })


  useEffect(()=>{
    checkAppVersion();
  },[])

    const userProfileSuc=(e)=>{
       console.log(e);
    }

     const userProfileFail=(e)=>{
       navigation.dispatch(StackActions.replace('Login'));
     }
     const appVersionFail=(e)=>{
      navigation.dispatch(StackActions.replace('Login'));
     }
     const versionSucc=(e)=>{
      console.log(e);
     }

      const appVersionPayload=(e)=>{
       if(e){
         if(e.value!==api.versionKey){
           navigation.dispatch(StackActions.replace('Upgrade',{payload:e}))
         }else{
           checkAppToken();
         }
       }
       // perform app logic here
      }

     const userProfilePayload=(e)=>{
     
       if(e){
     
       
        dispatch(setUser(e));
        navigation.dispatch(StackActions.replace('AppSection',{goto:null}));
       }else{
        dispatch(setUser(e));
        navigation.dispatch(StackActions.replace('Login',{goto:null}));
       }
     }

    const getProfile=(token)=>{
   
      var userObject={
        method:'get',
        url:`${api.localUrl}${api.userProfile}`,
            headers:{
                Authorization: " Bearer "+ token,
          
              }
    }
   
    
    apiRequest(
      userObject,
      (e) => {
        setAppOp({ ...appOp, load: e });
      },
      (e) => {
        userProfileSuc(e);
      },
      (e) => {
        userProfileFail(e);
      },
      (e) => {
        userProfilePayload(e);
      }
    );
    }

    const checkAppVersion=()=>{
        var checkObject={
          method:'get',
          url:`${api.localUrl}${api.appVersion}`,
            headers:{
              'Cache-Control': 'no-cache',
              Pragma: 'no-cache',
            }
        }
      
    apiRequest(checkObject,(e)=>{setAppOp({...appOp,load:e})},(e)=>{versionSucc(e)},(e)=>{appVersionFail(e)},(e)=>{appVersionPayload(e)})
  
    }

    const checkAppToken=()=>{
       
      getToken('token').then((appToken)=>{
        if(appToken){
        dispatch(setAuth({token:appToken,auth:true}));
        
       getProfile(appToken);
        }else{
          console.log('Token not found!');
          navigation.dispatch(StackActions.replace('Login'));
        }
      }).error((error)=>
      console.log(error));
    }
  
    return(
        <View style={styles.container}> 
        <View style={{...styles.headCont}}>
            <View style={{...styles.cont1}}><Text style={{...styles.pmtTxt}}>PMT {'\n'}DISPATCHER</Text>
            <View style={{...styles.logoCont}}><Image source={pmldispatcher} style={{...styles.logo}}/></View></View>
            </View>
            <View style={{...styles.splashCont}}>
              <Image source={splashImg} resizeMode='contain' height={270}/>
            </View>
            <View style={{...styles.cpCont}}><Text  style={{...styles.ctTxt}}>{symbols.copyright}PMT Logistics</Text></View>
            {appOp.load&&<LoaderComp size={25} color='#433E91'/>}
             </View>
    )
}
const styles=StyleSheet.create({
  cpCont:{
    marginBottom:20
    },
    ctTxt:{
         fontSize:20,
         color:`${AppColor.secondary}`,
         fontWeight:'500',
         textAlign:'center',
         
    },
    splashCont:{
  
     height:270,
    },
    headCont:{
      flexDirection:'row',
      justifyContent:'center',
    },
    logoCont:{
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      
      elevation: 7,
    },
    logo:{
      height:37,
      width:40,
    },
    cont1:{
     marginTop:96,
     width:'85%',
     flexDirection:'row',
    justifyContent:'space-between',
    display:'flex',
    },
    imgCont:{
    height:37,
    width:40 
    }, 
    pmtTxt:{
      fontWeight:'700',
      fontSize:24,
      color:`${AppColor.secondary}`,
      textShadowRadius:5,
    },
      image: {
          flex: 1,
          justifyContent: "center"
        },
      container:{
          flex:1,
          backgroundColor:'#fff',
          justifyContent:'space-between'
          
        },
        txt:{
          color:'#fff',
          height:100,
          width:100,
          borderWidth:1,
          borderColor:'#fff',
          borderRadius:5,
          alignSelf:'center', 
          textAlign:'center',
        
        }
})