import React,{useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet} from "react-native";
import { AppColor } from "./AppColor";
import IconComp from "./IconComp";
import DateComp from "./Datecomp";
export default function DateFilter({func,update}) {
  const [dateFrom,setDateFrom]=useState(null);
  const [dateTo,setDateTo]=useState(null);
  const[appDetails,setAppDetails]=useState({
    openDate:false,
    dateType:null,
  });
 
  
  const from=()=>{
   setAppDetails({...appDetails,dateType:1,openDate:true});
  }
  
  const to=()=>{
  setAppDetails({...appDetails,dateType:2,openDate:true})
  }

  const onSetDate=()=>{
    setAppDetails({...appDetails,openDate:false})
  }
   
  const apply=()=>{
     var dateFilter='';
    
     if(dateFrom){
       console.log("test1")
      if(dateFilter){
        dateFilter+=`&createdAt>=${dateFrom}`;
      }else{
        dateFilter=`createdAt>=${dateFrom}`;
      }
     }

     if(dateTo){
       if(dateFilter){
         dateFilter+=`&createdAt<=${dateTo}`;
       }else{
         dateFilter=`createdAt<=${dateTo}`;
       }
     }
     console.log(dateFilter);
   //mad js concatinating undefined 
   
     func(dateFilter);
  }
  const pickDate=(e)=>{
    switch(appDetails.dateType){
      case 1: setDateFrom(e);
              console.log(e);
      break;
      case 2: setDateTo(e); 
              console.log(e);
      break;
    }
    setAppDetails({...appDetails,dateType:null})
  }

  return (
    <View>
      <View
        style={{
         ...style.filterCont
        }}
      >
        <Text style={{...style.filterTxt}}>
          Filter
        </Text>
        <IconComp
          name="times"
          size={15}
          color={AppColor.third}
          style={{ fontWeight: "bold" }}
        />
      </View>
      <View
        style={{
         ...style.endDateCont
        }}
      >
        <Text style={{alignSelf:'center',color:'#000'}}>{dateFrom?dateFrom:'Start Date'}</Text>
        <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>from()}>
          <IconComp name="calendar" size={20} color={AppColor.third} />
        </TouchableOpacity>
      </View>
      <View
        style={{
        ...style.endDateCont
        }}
      >
        <Text style={{alignSelf:'center',color:'#000'}}>{dateTo?dateTo:'End Date'}</Text>
        <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>to()}>
          <IconComp name="calendar" size={20} color={AppColor.third} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={style.applyBtn} onPress={()=>apply()}>
        <Text
          style={{ ...style.appFilter }}
        >
          Apply Filter
        </Text>
      </TouchableOpacity>
      {appDetails.openDate&&<DateComp setdate={(e)=>pickDate(e)} onSet={()=>onSetDate()}/>}
    </View>
  );
}

const style = StyleSheet.create({
  filterTxt:{
    color: `${AppColor.third}`, fontWeight: "bold"
  },
  appFilter:{
    textAlign: "center", 
    fontWeight: "bold",
     color: "#fff"
  },
  filterCont:{
    flexDirection: "row",
    margin: 8,
    justifyContent: "space-between",
    padding: 5,
  },
  endDateCont:{
    flexDirection: "row",
    borderWidth: 1,
    margin: 10,
    height: 40,
    borderRadius: 5,
    paddingRight:15,
    paddingLeft:15,
    justifyContent:'space-between'
  },
 
  applyBtn: {
    height: 35,
    margin: 20,
    justifyContent: "center",
    backgroundColor: `${AppColor.third}`,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
