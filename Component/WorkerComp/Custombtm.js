import React,{useState,useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Dimensions } from 'react-native';
import { AppColor } from './AppColor';
export default  function Custombtm({e,btmRef,height,cod,cop}){

    return(
  <RBSheet
    dragFromTopOnly={true}
    ref={btmRef}
    closeOnDragDown={true}
    closeOnPressMask={true}
    openDuration={12}
    height={height}
    customStyles={{
        wrapper: {
            backgroundColor: "transparent"
        },
        draggableIcon: {
            backgroundColor:`${AppColor.third}`
        },
        container: {
            backgroundColor: '#fafafa',
            borderTopRightRadius:10,
            borderTopLeftRadius:10,
           
        }
    }}
>
   {e()} 
   </RBSheet>
    
    )
}