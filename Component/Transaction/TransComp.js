import React from 'react';
import { View,Text,TouchableOpacity,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppColor } from '../WorkerComp/AppColor';
export default function TransComp({color,iconName,func,transTime,transAmount,transText}){
    return(
        <View style={style.trans}> 
          <TouchableOpacity style={{flexDirection:'row',height:60,justifyContent:'space-evenly'}}>
          <Icon name={iconName} color={color} size={25} style={{...style.icon}}/>
          <View style={{width:'55%',alignSelf:'center',justifyContent:'center'}}>
              <Text style={{fontSize:17 }}>{transText}</Text>
              <Text style={{...style.transTime}}>{transTime}</Text>
          </View>
          <Text style={{...style.transAmount,color:`${color}`}}>{transAmount}</Text>
         </TouchableOpacity>
        </View>
    )
}

const style=StyleSheet.create({
  transTime:{
    fontSize:15,fontWeight:'bold',color:'#bbbbbb'
  },
  transAmount:{
    fontSize:18,width:'20%',alignSelf:'center',textAlign:'center',
  },
  icon:{
    width:'15%',
    alignSelf:'center',
    textAlign:'center'
  },
  transAmount:{
    fontSize:18,
    width:'20%',
    alignSelf:'center',
    textAlign:'center',
    
  },
    trans:{
        margin:10,
        marginTop:15,
        backgroundColor:'#fff',
        shadowColor: `${AppColor.third}`,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    }
})