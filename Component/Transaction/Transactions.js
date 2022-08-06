import React,{useContext, useEffect,useState,useRef} from 'react';
import { View,Text ,StyleSheet, ScrollView, Dimensions} from 'react-native';
import { AppColor } from '../WorkerComp/AppColor';
import { useSelector,useDispatch } from 'react-redux';
import Custombtm from '../WorkerComp/Custombtm';
import SearchByComp from '../WorkerComp/SearchByComp';
import TransComp from './TransComp';
import { api,apiRequest } from '../WorkerComp/Api';
import { UserContext } from '../DataProvider/UserContext';
import LoaderComp from '../WorkerComp/LoaderComp';
import HeaderComp from '../WorkerComp/HeaderComp';
import DateFilter from '../WorkerComp/DateFilter';

export default function Transaction({navigation}){
    const dispatch=useDispatch();
    const appAuth=useSelector((app)=>app.auth);
    console.log(appAuth,'danny')

    const[transactions,setTransactions]=useState(null);
  
    const[appDetails,setAppDetails]=useState({
        load:false,
    })
    const dateFilterRef=useRef(null);

    useEffect(()=>{
    if(!transactions){
        getTransactions();
    }
    },[transactions])
   
    const transSuc=(e)=>{
        //console.log(e)
    }
    const transFail=(e)=>{
        console.log(e)
    }
    const transPayload=(e)=>{
     if(!e.payload===0){
       setTransactions(e.payload);
     }
       
    }

    const filterApp=(e)=>{
      dateFilterRef.current.close();
      if(e){
        getTransactions(e);
      }
}

    const getTransactions=(dateQuery)=>{
       var transObject={
           method:'get',
           url:`${api.localUrl}${api.transaction}`,
           headers:{
            Authorization:'Bearer ' + appAuth.token,
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
          }
    
       }

       if(dateQuery){
        transObject.url+=`&${dateQuery}`;
       }
          
         apiRequest(transObject,(e)=>{setAppDetails({...appDetails,load:e})},(e)=>{transSuc(e)},(e)=>{transFail(e)},(e)=>{transPayload(e)})
  
    }
  
    return(
        <View style={{backgroundColor:'#fff',height:'100%'}}>
            <HeaderComp iconName={'wallet'} name={"Transactions"} nav={navigation}/>
           <SearchByComp func={()=>dateFilterRef.current.open()}/>
            <ScrollView style={{height:Dimensions.get('screen').height/1.31}}>
            {transactions?transactions.map((e,i)=>{
              if(e.type==="D"){
                return(       
           <TransComp key={i} iconName="long-arrow-alt-down" color={AppColor.green} transText="Cash deposit" transTime={e.createdAt.split('T')[0]} transAmount={e.amount} func={()=>console.log("Okay")}/>
           
                  )
             }else if (e.type==="T"){
               return  <TransComp  key={i} iconName="long-arrow-alt-up" color="red" transText={e.narration} transTime={e.createdAt.split('T')[0]} transAmount={`-${e.amount}`} func={()=>console.log("Okay")}/>
             }
            }):<View><Text style={{...style.noTrx}}>No Transactions Record Found!</Text></View>}
        </ScrollView>
        {appDetails.load&&<LoaderComp size={30} color={AppColor.third}/>}
        <Custombtm e={()=><DateFilter func={(e)=>filterApp(e)}/>} height={Dimensions.get('screen').height/2.5} btmRef={dateFilterRef} cod={true}/>
   
        </View>
    )
}

const style=StyleSheet.create({
trxHead:{
    flexDirection:'row',
    justifyContent:'center',
    padding:15,
    borderBottomWidth:1,
    borderBottomColor:`${AppColor.third}`
},
noTrx:{
textAlign:'center',
fontWeight:'bold',
marginTop:10
}
})