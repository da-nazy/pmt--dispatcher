import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import IconComp from './IconComp';
import { AppColor } from './AppColor';
import Navbar from '../WorkerComp/Navbar';
export default function HeaderComp({iconName,name,nav}){
   
    return(
        <View style={{width:'100%'}}>
             <Navbar nav={nav} color={AppColor.third}/>
            <View style={{...style.trxHead}}><IconComp name={iconName} size={17} color={AppColor.third} /><Text style={{...style.txt}}>{name}</Text></View>
        </View>
    )
}

const style=StyleSheet.create({
    trxHead:{
        flexDirection:'row',
        justifyContent:'center',
        padding:15,
        borderBottomWidth:1,
        borderBottomColor:`${AppColor.third}`,
        height:50,       
    },
    txt:{
        fontWeight:'bold',
        textAlign:'center',
        fontSize:15,
        marginLeft:5,
        color:'#000',
       
    }
})