import React,{useRef} from 'react';
import {WebView} from 'react-native-webview';
import { api } from '../WorkerComp/Api';
import { AppColor } from '../WorkerComp/AppColor';
import LoaderComp from '../WorkerComp/LoaderComp';
import ErrorPage from   './ErrorPage';
export default function Wallet(){
    const webViewRef=useRef(null);
    const reload=()=>{
        webViewRef.current.reload()
    }
    return(
        <WebView 
        ref={(ref) => webViewRef.current = ref} 
        source={{uri:`${api.ewallet}`}}
        startInLoadingState={true}
        renderLoading={()=><LoaderComp size={30} color={AppColor.third}/>}
        onHttpError={()=>console.log("error")}
        renderError={()=><ErrorPage func={()=>reload()}/>}
        />
       )
}