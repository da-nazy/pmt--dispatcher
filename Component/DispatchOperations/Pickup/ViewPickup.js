import React,{useState} from 'react';
import { View,Text,ScrollView,TouchableOpacity,StyleSheet,Alert} from 'react-native';
import { AppColor } from '../../WorkerComp/AppColor';
import IconComp from '../../WorkerComp/IconComp';

export default function ViewPickup({pickupPayload,viewLocation,onPickUpChange,viewParcel}) {
    const[appDetails,setAppDetails]=useState({
        parcelDisplay:false,
    })
    console.log(pickupPayload);
    
    const [pickAction,setPickAction]=useState([
        {
            name:"View on Map",
            func:()=>viewLocation(),
            id:1
        },
       
      

    ])

    const assignPickup=()=>{
       Alert.alert("Message","")
    }
    const declinePickup=()=>{

    }
       const assType=()=>{
             switch(pickupPayload.type){
                 case 'CC': 
                    return "Pick&Drop";
                     break;
                     case 'CT':
                         return 'Pickup';
                         break;
                         case 'TC':
                               return "Delivery";
                             break;
                             default:
                                 return null;
                                 break;
             }
       }
    // To display pml parcels none or count
    const pmlParcels=()=>{
      return(
        <View stle={{flexDirection:'row',justifyContent:'center'}}>
        <View style={{paddingTop:'1.2%',flexDirection:'row',margin:5,paddingLeft:5,height:30,backgroundColor:'#fff',justifyContent:'space-between',paddingRight:5,flexDirection:'row'}}>
                 <Text style={{fontSize:15,fontWeight:'bold',color:`${AppColor.third}`}}>
                 Items:
                 </Text>
                 <View style={{flexDirection:'row',justifyContent:'space-between',width:45,marginRight:3}}>
                  <Text style={{fontSize:15}}>{pickupPayload.pmlParcel.items.length}</Text>
         <TouchableOpacity onPress={()=>setAppDetails({...appDetails,parcelDisplay:!appDetails.parcelDisplay})} >
             <IconComp name={"angle-down"} size={25} color={appDetails.parcelDisplay?'#bbb':AppColor.third}/>
         </TouchableOpacity>
         </View>
         </View>
          {/** For displaying Parcel component */}

         {appDetails.parcelDisplay?pickupPayload.pmlParcel.items.map((e,i)=>{
          return  <View key={i} style={{flexDirection:'row',margin:5,paddingLeft:5,height:30,backgroundColor:'#fff',justifyContent:'space-between',paddingRight:5,flexDirection:'row',paddingTop:'1.2%'}}>
                <Text style={{fontSize:15,fontWeight:'bold',color:`${AppColor.third}`}}>
                    {++i} Item
                </Text>
                
                <TouchableOpacity onPress={()=>viewParcel(e)} >
             <IconComp name={"eye"} size={15} color={AppColor.third} />
         </TouchableOpacity>
            </View>
         }):console.log("error")}
         </View>
      )
    }

    const desc=(name,value)=>{
        return(
            <View style={{flexDirection:'row',paddingTop:'1.2%',margin:5,paddingLeft:5,height:30,backgroundColor:'#fff',justifyContent:'space-between',paddingRight:5,flexDirection:'row'}}>
                <Text style={{fontSize:15,fontWeight:'bold',color:`${AppColor.third}`}}>
                    {name}:
                </Text>
                <Text style={{fontSize:15,color:'#000'}}> {value}</Text>
            </View>
        )
    }

    return (
       <View>  
       <Text style={{textAlign:'center',fontWeight:'bold'}}>Parcel Details</Text>
       <ScrollView style={{marginTop:20,margin:10}}>
           {desc("Id",pickupPayload.id)}
           {desc("Pickup Status",pickupPayload.status)}
           {pmlParcels()}
           {desc("Description",pickupPayload.pmlParcel.description)}
           {desc("Amount",pickupPayload.pmlParcel.costPayable)}
           {desc("Created At",pickupPayload.pmlParcel.createdAt.split('T')[0])}
           {desc("Type",assType())}
       </ScrollView>
   
       <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
         {pickAction.map((e,i)=>{
      return <TouchableOpacity key={i} onPress={()=>e.func()} style={style.btnCont}><Text style={style.btnText}>{e.name}</Text></TouchableOpacity>
         })}
     </View>
       </View>
    )
}

const style=StyleSheet.create({
    btnCont:{
        width:'30%',
        height:30,
        justifyContent:'center',
        borderRadius:2,
        backgroundColor:`${AppColor.third}`,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    btnText:{
        textAlign:'center',
        fontWeight:'bold',
        color:'#fff',
    }

})