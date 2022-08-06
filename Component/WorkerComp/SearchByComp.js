import React from 'react';
import { TouchableOpacity,Text ,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppColor } from './AppColor';

export default function SearchByComp({func}){
    return(
        <TouchableOpacity style={style.searchContainer} onPress={(e)=>func(e)} >
          <Text style={{color:'#000'}}>
            search by date{" "}
            </Text>
            <Icon name="calendar" size={15} color="#000" />
        </TouchableOpacity>
    )
}

const style=StyleSheet.create({
    searchContainer:{
        backgroundColor:"#fff",
         borderWidth:1,
         justifyContent:'space-evenly',
         padding:2,
         borderRadius:5,
         borderColor:`${AppColor.third}`,
         flexDirection:'row',
         alignSelf:'center',
         marginTop:20,
         width:'50%',
         height:30,
         shadowColor: `${AppColor.third}`,
         shadowOffset: {
           width: 0,
           height: 5, 
         },
         shadowOpacity: 1.5,
         shadowRadius: 10,
         elevation: 10,
    }
})