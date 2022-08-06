import * as React from 'react';
import{TextInput} from 'react-native-paper';
import { AppColor} from './AppColor';
export default function InputComp({value,ref,right,mode,label,placeholder,style,error,setText,secureText,inputType,disabled}){

    // mode : flat,outlined
    // label outlined input
    // placeholder
    //right={<TextInput.Affix text="/100" />}

    return(
        <TextInput
        mode={mode}
        label={label}
        placeholder={placeholder}
        right={right}
        style={style}
        error={error}
        value={value}
        onChangeText={(e)=>setText(e)}
        secureTextEntry={secureText}
        textContentType={inputType}
        disabled={disabled}
        ref={ref}
        theme={{
          colors: {
                primary:`${AppColor.third}`,
                   
             }
       }}
      />
    )
}