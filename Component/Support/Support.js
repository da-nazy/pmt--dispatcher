import React from 'react';
import { View,Text,ScrollView,StyleSheet, Dimensions,Linking } from 'react-native';

import SupportComp from './SupportComp';
export default function Support({navigation}){

    

    const {navigate}=navigation;
 

    return(
        <View style={style.container}>
        <ScrollView>
         <SupportComp iconName={"envelope"} fabFunc={()=>Linking.openURL('mailto:admin@pmt.com?to=admin.pmt.com')} name={"Message Customer Care "} value={"admin@pmt.com"}/>
        </ScrollView>
          </View>
    )
}

const style=StyleSheet.create({
    container:{
    height:Dimensions.get('screen').height/1.22,
    paddingBottom:40,
    backgroundColor:'#fff'
    }
})