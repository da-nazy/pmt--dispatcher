import React,{useState,useContext} from 'react';
import { View,Text,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import InputComp from '../WorkerComp/InputComp';
import { AppColor} from '../WorkerComp/AppColor';
import { apiRequest,api } from '../WorkerComp/Api';
import { TextInput } from 'react-native-paper';
import LoaderComp from '../WorkerComp/LoaderComp';
import { useSelector } from 'react-redux';
export default function ResetPassword({showText,setAlert,load,token,id,fail,succ}){

 const appUser=useSelector((app)=>app.user.value);
 const authUser=useSelector((app)=>app.auth)
  const[resetOp,setResetOp]=useState({
     load:false,
     password:'',
   })
   const onSucc=(e)=>{
     return Alert.alert("Success",e);
   }

   const onFail=(e)=>{
     return Alert.alert("Error",e);
   }

  const resetPwd=()=>{
  //  console.log(currentPwd,confirmPwd);
 
 
    if(checkInput()){
     if(showText){
     // as a component
     var resetObject={
      method:'put',
      url:`${api.localUrl}${api.userProfile}/${id}`,
      data:{
        password:currentPwd.currentPassword,
      },
      headers:{
        Authorization:' Bearer ' +token,
      }
      
    }

     console.log(resetObject);
     apiRequest(resetObject,(e)=>setResetOp({...resetOp,load:e}),(e)=>succ(e),(e)=>fail(e),(e)=>{console.log(e)});
   
     }else{
       // Normal 
      // Should be done normally and without using any props
      var resetObject={
        method:'put',
        url:`${api.localUrl}${api.userProfile}/${userProfile.id}`,
        data:{
          password:currentPwd.currentPassword,
        },
        headers:{
          Authorization:' Bearer ' +authUser.token,
        }
        
      }
      
      apiRequest(resetObject,(e)=>setResetOp({...resetOp,load:e}),(e)=>onSucc(e),(e)=>onFail(e),(e)=>{console.log(e)});
    
     }
    }
  }
   
  const checkInput=()=>{
    var check=true;
   
    if(!currentPwd.currentPassword){
      setCurrentPwd({...currentPwd,cpError:true})
      check=false;
    }else{
      setCurrentPwd({...currentPwd,cpError:false});
    }
    if(!confirmPwd.confirmPwd){
      setConfirmPwd({...confirmPwd,cpError:true});
      check=false;
    }else{
      setConfirmPwd({...confirmPwd,cpError:false});
    }
    if(!(currentPwd.currentPassword===confirmPwd.confirmPwd)){
      check=false;
       
      if(showText){
        setAlert("Error","Password doesn't match");
      }else{
        Alert.alert('Error',"Password doesn't match");
      }

    }else{
      //setResetOp({...resetOp,password:currentPwd.currentPassword});
    }

    return check;

  }

const [currentPwd,setCurrentPwd]=useState({
      currentPassword:'',
      cpError:false,
      cpSecure:true,
    })

const [confirmPwd,setConfirmPwd]=useState({
      confirmPwd:'',
      cpError:false,
      cpSecure:true,
    })

    return (
    <View>
        <View style={{marginLeft:15,marginTop:30}}>
          {showText?(<Text style={{fontWeight:'bold',textAlign:'center'}}>Password Reset</Text>):null}  
        </View>
        <View>
          <InputComp mode="outlined" right={<TextInput.Icon name="eye"  onPress={()=>setCurrentPwd({...currentPwd,cpSecure:!currentPwd.cpSecure})}/>}  label="New Password"   style={style.name} error={currentPwd.cpError} secureText={currentPwd.cpSecure} setText={(e)=>{setCurrentPwd({...currentPwd,currentPassword:e})}}/>
          {currentPwd.cpError?(<Text style={{marginLeft:25,color:'red'}}>Invalid input.</Text>):null}
            </View>
            <View>
          <InputComp mode="outlined" right={<TextInput.Icon name="eye"  onPress={()=>setConfirmPwd({...confirmPwd,cpSecure:!confirmPwd.cpSecure})}/>}  label="Confirm New Password"   style={style.name} error={confirmPwd.cpError} secureText={confirmPwd.cpSecure} setText={(e)=>{setConfirmPwd({...confirmPwd,confirmPwd:e})}}/>
          {confirmPwd.cpError?(<Text style={{marginLeft:25,color:'red'}}>Invalid input.</Text>):null}
            </View>  
          <TouchableOpacity onPress={()=>resetPwd()} style={style.proc}><Text style={{color:'#fff',textAlign:'center',fontSize:15}}>Reset password</Text></TouchableOpacity>
       {resetOp.load&&<LoaderComp size={25} color={AppColor.third}/>}
    </View>)
}

const style=StyleSheet.create({
    name:{
     margin:10,
    },
    proc:{
        justifyContent:'center',
    margin:35,
    marginTop:20,
    height:45,
    backgroundColor:`${AppColor.third}`,
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