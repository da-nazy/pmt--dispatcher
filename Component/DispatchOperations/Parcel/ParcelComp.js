import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Touchable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { AppColor } from "../../WorkerComp/AppColor";
export default function ParcelComp({ func, name, status, Date }) {
  return (
    <View style={style.container}>
     <View>
       <Icon
        name="box-open"
        size={20}
        color={AppColor.third}
        style={{ width: "15%", alignSelf: "center", textAlign: "center" }}
      />
       <Text>
         Parcel View
       </Text>
      </View>
      <View style={{ width: "55%", borderLeftWidth: 1, margin: 1 }}>
        <View style={style.conDesc}>
          <Text style={style.textDesc}>Name:</Text>
          <Text>Books</Text>
        </View>
        <View style={style.conDesc}>
          <Text style={style.textDesc}>Status:</Text>
          <Text>Pending</Text>
        </View>
        <View style={style.conDesc}>
          <Text style={style.textDesc}>Date:</Text>
          <Text>10-10-2008</Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          width: "15%",
          flexDirection:"row",
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <Icon
          onPress={() => func()}
          name="ellipsis-v"
          color={AppColor.third}
          size={20}
        />
      </TouchableOpacity>
    </View>
  );
}
const style = StyleSheet.create({
  conDesc: {
    flexDirection: "row",
    paddingLeft: 10,
  },
  textDesc: {
    fontWeight: "bold",
    marginRight: 5,
    color: `${AppColor.third}`,
  },
  container: {
    height: 65,
    margin: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
