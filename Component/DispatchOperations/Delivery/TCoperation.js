import React,{useState,useEffect,useContext} from 'react';
import {View,Text, TouchableOpacity,StyleSheet, Dimensions,StatusBar,Alert} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { useSelector } from 'react-redux';
import { AppColor } from '../../WorkerComp/AppColor';
import IconComp from '../../WorkerComp/IconComp';
import {api,apiRequest} from '../../WorkerComp/Api';
import LoaderComp from '../../WorkerComp/LoaderComp';
const {width,height}=Dimensions.get("window");
export default function TCoperation({pickup,onChange}){
  
    const appAuth=useSelector((app)=>app.auth);

    
    const [load,setLoad]=useState(false);
     
   
  const [appDetails,setAppDetails]=useState({
      load:false,
      accepted:null,
      collected:null,
      dispatched:null,
      delivered:null,
  })
    
  const customOperation=(name)=>{
    //  console.log(func)
    return(
      <TouchableOpacity onPress={()=>onChange()} style={style.txtCont}><Text style={{textAlign:'center',color:'#fff'}}>{name}</Text></TouchableOpacity>)
  }

     const pickUpOpeartion=()=>{
         if(pickup.status==="ACCEPTED"){
            acceptOp();
          //  console.log(pickup.status,pickup.pmlParcel.status);
         }else{
           // console.log(pickup.pmlParcel.status);
             switch(pickup.status){
            
               case "ASSIGNED":
                   acceptOp();
                   break;
               case "RELEASED":
                const collectItems=[...data];
                collectItems.map((e,i)=>{
                   if(e.id===1){
                   collectItems[i].accepted=true;
                   collectItems[i].message="You have accepted to attend to the pickup";
                   delete collectItems[i].view;
                   }
                   if(e.id===2){
                    collectItems[i].accepted=true;
                    collectItems[i].message="Customer has confirmed pickup collection";
                    delete collectItems[i].view;
                   }
                   setCurrentPosition(2);
                   setData(collectItems);
                })
                   break;
                   case "DISPATCHED":
                    
                    const dispatchItems=[...data];
                       dispatchItems.map((e,i)=>{
                       if(e.id===1){
                        dispatchItems[i].accepted=true;
                        dispatchItems[i].message="You have accepted to attend to the pickup";
                       delete dispatchItems[i].view;
                       }
                       if(e.id===2){
                        dispatchItems[i].accepted=true;
                        dispatchItems[i].message="Customer has confirmed pickup collection";
                        delete dispatchItems[i].view;
                       }
                       if(e.id===3){
                        dispatchItems[i].accepted=true;
                        dispatchItems[i].message="Pickup has been dispatched by you.";
                        delete dispatchItems[i].view; 
                       }
                       setCurrentPosition(3);
                       setData(dispatchItems);

                    })
                       break;
                       case "DELIVERED":
                        const deliveryItems=[...data];
                        deliveryItems.map((e,i)=>{
                        if(e.id===1){
                         deliveryItems[i].accepted=true;
                         deliveryItems[i].message="You have accepted to attend to the pickup";
                        delete deliveryItems[i].view;
                        }
                        if(e.id===2){
                            deliveryItems[i].accepted=true;
                            deliveryItems[i].message="Customer has confirmed pickup collection";
                         delete deliveryItems[i].view;
                        }
                        if(e.id===3){
                            deliveryItems[i].accepted=true;
                            deliveryItems[i].message="Pickup has been dispatched by you.";
                         delete deliveryItems[i].view; 
                        }
                        if(e.id===4){
                           // deliveryItems[i].accepted=true;
                        deliveryItems[i].message="Pickup has been delivered wait for customer to confirm";
                        deliveryItems[i].view=customOperation("RERESH"); 
                        setCurrentPosition(3);
                        }
        
                        setData(deliveryItems);
 
                     })
                           break;

                           case  "CONFIRMED":
                            const confirmItems=[...data];
                            confirmItems.map((e,i)=>{
                            if(e.id===1){
                                confirmItems[i].accepted=true;
                                confirmItems[i].message="You have accepted to attend to the pickup";
                            delete confirmItems[i].view;
                            }
                            if(e.id===2){
                                confirmItems[i].accepted=true;
                                confirmItems[i].message="Customer has confirmed pickup collection";
                             delete confirmItems[i].view;
                            }
                            if(e.id===3){
                                confirmItems[i].accepted=true;
                                confirmItems[i].message="Pickup has been dispatched by you.";
                             delete confirmItems[i].view; 
                            }
                            if(e.id===4){
                               confirmItems[i].accepted=true;
                               confirmItems[i].message="Pickup delivery confirmed";
                              delete confirmItems[i].view;
                            setCurrentPosition(4);
                            }
                           
                            setData(confirmItems);
     
                         })
                               break;
             }
         }
       
     }
      const succFunc=(e)=>{
          console.log(e);
      }
      const failFunc=(e)=>{
          console.log(e);
      }
      const dispatchPickupPayload=(e)=>{
          onChange();
          console.log(e)
      }
     const pickupDispatch=()=>{
        var dispatchObject={
         method:'put',
         url:`${api.localUrl}${api.assignmentOperation}${pickup.id}`,
         data:{
            status:`${api.pickupStatus[3]}`,
        },
         headers:{
            Authorization:' Bearer ' + appAuth.token,
            'Cache-Control': 'no-cache',
          }
        }

        console.log(dispatchObject);
       apiRequest(dispatchObject,(e)=>setLoad(e),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>dispatchPickupPayload(e));

    }

    const deliverPickup=()=>{
        Alert.alert("Message","Confirm that the pickup has been delivered",[
            {
                text:'Confirm',
                onPress:()=>pickupDelivered(),
            },
            {
                text:"Cancel", 
            }
        ])
    }
     
      useEffect(()=>{
          pickUpOpeartion();
      },[])
    
    const labels = ["ASSIGNED","COLLECTED","DISPATCHED","DELIVERED"];
    const  [data,setData]=useState([
        {   
             id:1,
            name:'ASSIGNED',
            accepted:null,
            message:'Pickup has been assigned to you?',
            view:<View style={{flexDirection:'row'}}><TouchableOpacity onPress={()=>performAssignOp("ACCEPT")} style={style.txtCont}><Text style={{textAlign:'center',color:'#fff'}}>ACCEPT</Text></TouchableOpacity><TouchableOpacity onPress={()=>performAssignOp("DECLINE")}  style={{borderWidth:1,height:28,width:70,justifyContent:'center',borderRadius:2,margin:2,backgroundColor:AppColor.third,borderColor:AppColor.third}}><Text style={{textAlign:'center',color:'#fff'}}>DECLINE</Text></TouchableOpacity></View>,
        },
        {  
             id:2,
            name:'COLLECTED',
            accepted:null,
            message:'If pickup has been collected, prompt customer to approve',
            view:<TouchableOpacity onPress={()=>onChange()} style={style.txtCont}><Text style={{textAlign:'center',color:'#fff'}}>REFRESH</Text></TouchableOpacity>
        },
        {   
            id:3,
            name:'DISPATCHED',
            accepted:null,
            message:'Have you dispateched the collected pickup?',
            view:<TouchableOpacity onPress={()=>dispatchPickup()} style={style.txtCont}><Text style={{textAlign:'center',color:'#fff'}}>YES</Text></TouchableOpacity>
        },
        {
            id:4,
            name:'DELIVERED',
            accepted:null,
            message:'Have you delivered the pickup?',
            view: <TouchableOpacity onPress={()=>deliverPickup()} style={style.txtCont}><Text style={{textAlign:'center',color:'#fff'}}>YES</Text></TouchableOpacity>
        }
    ]);
    const[accepted,setAccepted]=useState(null);
    const[currentPosition,setCurrentPosition]=useState(0);
    const deliveredPayload=(e)=>{
        onchange();
        console.log(e)
    }
    //question,check
        const dispatchPickup=()=>{
           Alert.alert("Message","Confirm that the pickup has been dispatched",[
               {
                   text:'Confirm',
                   onPress:()=>pickupDispatch(),
               },
               {
                   text:"Cancel", 
               }
           ])
        }
        
        const pickupDelivered=()=>{
            var dispatchObject={
             method:'put',
             url:`${api.localUrl}${api.assignmentOperation}${pickup.id}`,
             data:{
                status:`${api.pickupStatus[4]}`,
            },
             headers:{
                Authorization:' Bearer ' + appAuth.token,
                'Cache-Control': 'no-cache',
              }
            }
         apiRequest(dispatchObject,(e)=>setLoad(e),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>deliveredPayload(e));
    
        }
    
    const aoSucc=(e)=>{
        console.log(e);
    }
    const aoFail=(e)=>{
        console.log(e);
    }
    const aoPayload=(e)=>{
        onChange();
        if(e.status="ACCEPTED"){
            // PERFORM BTM CLOSE
            // REFRESH PICKUP

        }
    }
    const performAssignOp=(e)=>{
        // check DECLINE TO DECLINED, ACCEPTED
     Alert.alert("Assignement",`Are you sure you want to ${e}, this pickup`,[
         {
             text:'Proceed',
             onPress:()=>assignOperation(e),
         },
         {
             text:'Cancle',
         }
     ])
    }
    const assignOperation=(e)=>{
    // e should be either accept or decline
      var assignObject={
          method:'PUT',
          url:`${api.localUrl}${api.assignmentOperation}${pickup.id}`,
          data:{
              status:e.charAt(0)==='A'?"ACCEPTED":"DECLINED",
          },
          headers:{
              Authorization:' Bearer ' + appAuth.token,
              'Cache-Control': 'no-cache',
          }
      }
   

  apiRequest(assignObject,(e)=>setLoad(e),(e)=>{aoSucc(e)},(e)=>aoFail(e),(e)=>aoPayload(e));

    }

     const acceptOp=()=>{
     // set Accepted:true
    //set appDetails.Accepted to true;
    //Remove the buttons
    // Change the text to : You have accepted to attend to the pickup.
      const newItems=[...data];
      newItems.map((e,i)=>{
         if(e.id===1){
         newItems[i].accepted=true;
         newItems[i].message="You have accepted to attend to the pickup";
         delete newItems[i].view;
         setCurrentPosition(1);
         setData(newItems);
        // console.log("upate")
         }
      })
     }

    
      const collectCheck=()=>{
          if(!data[0].accepted&&!data[0].name=="ASSIGNED"){
              Alert.alert("Caution","You haven't accepted the assigned pickup");
          }else{
           // setAppDetails({...appDetails,collected:true})
           onChange();
          }
      }


     const collectedOp=()=>{
       
      // 2 is the id for collected Item
     // Message: Pickup collectiong confirmed by customer
     // delete: view
     // setCurrentPosition 2;
     // set :collected true
      const newItems=[...data];
      newItems.map((e,i)=>{
         if(e.id===2){
             newItems[i].accepted=true;
             newItems[i].message="Pickup collection confirmed by customer";
             delete newItems[i].view;
             setData(newItems);
             setCurrentPosition(2);
         }
      })
     }

const update=(idx)=>{
    // data.map(()=>{})
    //idx is object id not array index id search for the array index and display
    const newItems=[...data];
    console.log(idx);
   //console.log(newItems[idx]);
   newItems.map((e,i)=>{
      if(e.id===idx){
         // console.log(i);
        //console.log(newItems[i]);
          newItems[i].accepted=true;
        //  delete newItems[i].message;
        //  delete newItems[i].view;
          //console.log(newItems[i]);
          setData(newItems);
      }
   })
   
    
}


useEffect(()=>{
    if(appDetails.collected){
        collectedOp();
    }
},[appDetails.collected])
    const customStyles = {
        stepIndicatorSize: 25,
        currentStepIndicatorSize:30,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: '#fe7013',
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: '#fe7013',
        stepStrokeUnFinishedColor: '#aaaaaa',
        separatorFinishedColor: '#fe7013',
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: '#fe7013',
        stepIndicatorUnFinishedColor: '#ffffff',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: '#fe7013',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: '#aaaaaa',
        labelColor: '#999999',
        labelSize: 13,
        currentStepLabelColor: '#fe7013',
        
      }
    return(
    <View style={style.container}>
         <StatusBar animated={true} backgroundColor={AppColor.third} />
       <StepIndicator
         customStyles={customStyles}
         currentPosition={currentPosition}
         labels={labels}
         stepCount={4}
         direction='vertical'
         renderLabel={({position,label,currentPosition,stepStatus})=>{
            return (
                    <View key={position} style={{marginTop:5,width:width-100,marginTop:30}}>
                    <View style={{flexDirection:'row',justifyContent:"space-between",padding:5}}><Text style={{fontSize:15,fontWeight:'700'}}>{data[position].name}</Text>
                    <View style={{width:20,height:20,borderWidth:1,borderRadius:10,justifyContent:'center',borderColor:AppColor.third}}>
                    <IconComp name={data[position].accepted?'check':'question'} size={10} style={{textAlign:'center',color:'#000'}}/></View></View>
                    <Text style={{padding:5,color:'#000'}}>{data[position].message}</Text>
                    {data[position].view}
                    </View>
            )
         }}
    />
     {load&&<LoaderComp size={25} color={AppColor.third}/>}
    </View>
    )
}

const style=StyleSheet.create({
    txtCont:{
        borderWidth:1,
        height:28,
        width:70,
        justifyContent:'center',
        borderRadius:2,
        margin:2,
        backgroundColor:AppColor.third,
        borderColor:AppColor.third
    },
    container:{
     height:height-100,
     width:width-50,
    padding:5, 
    justifyContent:'center',
    alignSelf:'center',
    borderRadius:5,
    margin:15,
  
     flexDirection:'column',
     elevation:10,
     backgroundColor:'#fff'
    },
   dContainer:{

   }
})