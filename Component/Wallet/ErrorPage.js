import React from 'react';
import {View,Text,StyleSheet,Dimensions} from 'react-native';
import { AppColor } from '../WorkerComp/AppColor';
import IconComp from '../WorkerComp/IconComp';
import BtnComp from '../WorkerComp/BtnComp'
export default function ErrorPage({func}) {
  return(
    <View style={{...style.container}}>

   <View style={{...style.subCont}}> 
   <View>
        <IconComp name="exclamation-triangle" size={50} color={AppColor.third} style={{textAlign:'center'}}/>
    </View>
     <View style={{...style.bdCont}}>
         <Text style={{...style.hdTxt}}> !Oops Something Went Wrong</Text>
         <Text style={{...style.bdTxt}}>Make sure wifi and cellular data is turned on then you try again!</Text>
        <BtnComp mode="contained" name="Retry" style={{...style.btn}} func={()=>func()}/>
     </View>
   </View>
    </View> 
  );
}

const style=StyleSheet.create({
    container:{
    height:Dimensions.get('screen').height,
    backgroundColor:'#fff',
    justifyContent:'center',
    flexDirection:'column'
    
    },
    hdTxt:{
    textAlign:'center',
    fontWeight:'700',
    marginTop:15,
    marginBottom:10,
    color:`${AppColor.primary}`
    },
    bdTxt:{
       textAlign:'center',
      width:'80%',
    },
    bdCont:{
        alignItems:'center',justifyContent:'space-between',height:'35%'
    },

    subCont:{
    height:'60%',
    
    },
    btn:{
  width:'80%',
  marginTop:10,
  shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.22,
shadowRadius: 2.22,

elevation: 3,
    }
})