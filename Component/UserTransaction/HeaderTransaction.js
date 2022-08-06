import React from 'react';
import { View,Text,TouchableOpacity,StatusBar,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppColor } from "../WorkerComp/AppColor";

export default function   HeaderTransaction({test}){
    test("daniel");
     
    // Should have props for communicating with other components

    return(
        <View
        style={{
          height: 180,
          borderBottomWidth: 1,
          borderBottomColor: `${AppColor.third}`,
        }}
      >
        <StatusBar animated={true} backgroundColor={AppColor.third} />
        <View
          style={style.walletContainer}
        >
          <View style={{width:'40%',justifyContent:'center'}}>
            <Text style={{textAlign:'center',fontWeight:'bold',color:'#fff'}}>Orders</Text>
            <Text></Text>
            <Text style={{textAlign:'center',fontWeight:'bold',color:'#fff'}}>0</Text>
          </View>
          <View style={{width:'40%',justifyContent:'center'}}>
            <Text  style={{textAlign:'center',fontWeight:'bold',color:'#fff'}}>Total Balance</Text>
            <Text style={{textAlign:'center',fontWeight:'bold',color:'#fff'}}> {"\u20A6"}0.0</Text>
            <TouchableOpacity style={{ width:'75%',alignSelf:'center',height:30,flexDirection:'row',borderRadius:10,justifyContent:'space-evenly',alignItems:'center',backgroundColor:`${AppColor.third}`}}>
              <Icon name="eye" size={15} color='#fff' style={{justifyContent:'center'}}/>
              <Text  style={{textAlign:'center',fontWeight:'bold',color:"#fff",fontSize:12}}>Wallet</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{borderWidth:1,justifyContent:'space-evenly',padding:2,borderRadius:5,borderColor:'#bbbbbb',flexDirection:'row',alignSelf:'center',marginTop:10,width:'60%',height:30}}>
          <Text>
            search by date{" "}
            </Text>
            <TouchableOpacity>
              <Icon name="calendar" size={15} color="#000" />
            </TouchableOpacity>
         
        </View>
      </View>
    )
}
const style=StyleSheet.create({
    walletContainer:{
        width: "85%",
        flexDirection: "row",
        height: 100,
        borderRadius: 10,
        alignSelf: "center",
        margin: 10,
        justifyContent:'space-evenly',
        backgroundColor:`${AppColor.secondary}`,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5, 
        },
        shadowOpacity: 1.5,
        shadowRadius: 10,
        elevation: 10,
    },
})