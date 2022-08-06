import React from 'react';
import Icon from  'react-native-vector-icons/FontAwesome5';
export default function IconComp({name,size,color,style}){
    return(
<Icon
        name={name}
        size={size}
        color={color}
        style={style}
      />
    )
}