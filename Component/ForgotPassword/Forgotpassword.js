import React,{useState} from 'react';
import {View,Image,StyleSheet, TouchableOpacity,Text, ScrollView, Dimensions,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import InputComp from '../WorkerComp/InputComp';
import { AppColor, regX } from '../WorkerComp/AppColor';
import { apiRequest,api } from '../WorkerComp/Api';
import LoaderComp from '../WorkerComp/LoaderComp';
export default function ForgotPassword(){
   

    const requestSuccess=(e)=>{
        e?(Alert.alert("Success",e)):null;

    }

    const requestFailure=(e)=>{
    e?( Alert.alert("Failure",e)):null;

    }

    const payload=(e)=>{
        console.log(e)
    }

    const [email,setEmail]=useState({
        value:'',
        error:false,
        inputType:'',
        load:false,
    });
    const validatePhone=()=>{
        if(regX.phoneFilter.test(email.value)){
          return true;   
    }
}
    const validateEmail=()=>{
        if(regX.emailFilter.test(email.value)){
           return true;
    }
   
} 
   
    const checkInput=()=>{
        var check=true;
        if(email.value==""){
            setEmail({...email,error:true});
             check=false;
        }else{
            if(validateEmail()||validatePhone()){
                setEmail({...email,error:false});
               // Alert.alert("Success","Values are set")
               var type='';
               if(validateEmail()){
                   type="email";
               }
               if(validatePhone()){
                   type="phone";
               }
               var recoverObject={
                 
                  method:"post",
                  url:`${api.localUrl}${api.recoverPassword}`,
                  data:{
                  
                  }
               }
               recoverObject.data[type]=email.value;
   console.log(recoverObject);
               if(type){
                if(type=='phone'){
                  Alert.alert("Phone","Endeavour to have do not disturb (DND) disabled. To get the sms",[{
                      text:"ok",onPress:()=>{
                        apiRequest(recoverObject,(e)=>{setEmail({...email,load:e})},(e)=>{requestSuccess(e)},(e)=>{requestFailure(e)},(e)=>{payload(e)});
                      
                        }
                  }]);
               }else{
                apiRequest(recoverObject,(e)=>{setEmail({...email,load:e})},(e)=>{requestSuccess(e)},(e)=>{requestFailure(e)},(e)=>{payload(e)});
           
               }
               }
                 }else{
                setEmail({...email,error:true});
                check=false;
            }
         return check;
        }
    }
   return(
       <ScrollView>
          <View style={{marginTop:80,justifyContent:'center',alignItems:'center',marginBottom:40}}><Icon name="user-lock" size={65} color={AppColor.primary}/>
           </View>
           <View style={{alignItems:'center'}}><Text style={{...style.fgTxt}}>Forgot Password?</Text><Text style={{...style.ergEmail}}>
                   Enter your registered email to reset your password
               </Text>
           </View>
           <View><InputComp mode="outlined" right={null}  label="Email or Phone"  style={style.email} error={email.error}  setText={(e)=>{setEmail({...email,value:e})}}/>
           {email.error?(<Text style={{marginLeft:25,color:'red'}}>Field Cannot be empty</Text>):null}
            </View>
            <TouchableOpacity onPress={()=>checkInput()} style={style.send}><Text style={{color:'#fff',textAlign:'center'}}>SEND OTP</Text></TouchableOpacity>
       {email.load&&(<LoaderComp size={25} color={AppColor.third}/>)}
       </ScrollView>
   )
}

const style=StyleSheet.create({
    ergEmail:{
        fontSize:18,
        width:'70%',
        textAlign:'center',
        color:`${AppColor.third}`,

    },
    fgTxt:{
        textAlign:'center', 
        fontSize:25,
        fontWeight:'bold',
        marginBottom:20,
        color:`${AppColor.primary}`
    },
     email:{
         marginTop:15,
         margin:10,
     },
     send:{
         justifyContent:'center',
         margin:15,
         marginTop:20,
         height:45,
         borderRadius:3,
         backgroundColor:`${AppColor.primary}`,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      }
     
})