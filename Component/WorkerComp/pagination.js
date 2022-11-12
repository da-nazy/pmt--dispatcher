import React,{useEffect, useState} from 'react'
import { StyleSheet, View,Button,Text,TouchableOpacity } from 'react-native'
import { Picker } from "@react-native-picker/picker";
import { AppColor } from './AppColor';
export default function Pagination({total,limit,currentPage,setCurrentPage}) {
  const [totalPage,setTotalPage]=useState('');
  useEffect(()=>{
    if(total%limit>0){
      let temp=Math.trunc(total/limit)+1;
      setTotalPage(temp);
    }else{
       setTotalPage(total/limit);
    }
  },[total])
   

  const previous=()=>{
    if(Number.parseInt(currentPage)!=0){
      setCurrentPage(Number.parseInt(currentPage)-1)
  }
  }
  const next=()=>{ 
    if(Number.parseInt(totalPage-1)>Number.parseInt(currentPage)){
        setCurrentPage(Number.parseInt(currentPage)+1)
    }
  }

  return (
     <View style={style.cont}>
     <TouchableOpacity style={{...style.btn}} onPress={()=>previous()}>
        <Text style={style.txt}>Previous</Text>
     </TouchableOpacity>
        <View style={style.pick}>
        <Picker
            selectedValue={currentPage+""}
            onValueChange={(itemValue, itemIndex) =>
               setCurrentPage(itemValue)
            }
            style={{width: "100%" }}
          >
            {[...Array(Number.parseInt(totalPage)>0?Number.parseInt(totalPage):1)].map((x, i) =>
            <Picker.Item key={i} label={`${i+1}`} value={`${i}`} />
        )}
              
          </Picker>
        </View>
       <TouchableOpacity  style={style.btn} onPress={()=>next()} >
       <Text style={style.txt}>
        Next
       </Text>
       </TouchableOpacity>
     </View>
  )
}


const style=StyleSheet.create({
    cont:{
        border:'1px solid #000',
         flexDirection:'row',
         height:60,
         justifyContent:'space-evenly',
         margin:10,
         padding:10
          
    },
    btn:{
      width:'30%',
      height:40,
      borderRadius:5,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:`${AppColor.third}`,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    pick:{
      width:'30%',
      height:40,
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      borderWidth:1,
      borderRadius:5,
    
    },
    txt:{
      fontSize:15,
      fontWeight:'500',
      color:'#fff'
    }
})