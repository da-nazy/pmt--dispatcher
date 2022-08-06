import React from "react";
import { View, Text, StyleSheet,TouchableOpacity, Dimensions} from "react-native";

import { AppColor} from "./AppColor";
import IconComp from "./IconComp";
export default function OpComp({catIcon,subIcon,name,func,pickOp}) {
  return (
    <View style={style.pendPick}>
      <IconComp name={catIcon} size={20} color={AppColor.third} style={{ margin: 5,width:'10%' }} />
      <Text style={{ marginLeft: 10, marginRight: 10 ,width:'50%',color:'#000'}}>
        {name}
      </Text>
     <TouchableOpacity style={{ marginRight: 20,width:'10%' }} onPress={()=>pickOp()} >
       <IconComp
        name={subIcon}
        size={20}
        color={AppColor.third}   
      />
       </TouchableOpacity>
      <TouchableOpacity onPress={()=>func()} style={{width:'10%'}}>
        <IconComp name="ellipsis-v" size={20} color={AppColor.third} />
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  pendPick: {
    width:'97%',
    flexDirection: "row",
    height: 50,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
