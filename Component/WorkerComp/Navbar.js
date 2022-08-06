import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { IconComp } from "./ExternalFunctions";
export default function Navbar({color,nav}) {
 
  return (
    <TouchableOpacity
      onPress={()=>nav.toggleDrawer()}
      style={{
        ...style.navBar,
      }}
    >
      {IconComp("bars", null, 25,color)}
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
    navBar:{
        marginBottom: -40,
		zIndex: 10,
		paddingLeft: 15,
		paddingTop: 8,
    }
});
