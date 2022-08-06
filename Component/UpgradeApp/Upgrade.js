import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Linking,
} from "react-native";
import rocket from "../../Asset/rocket.png";
import { api } from "../WorkerComp/Api";
import { AppColor } from "../WorkerComp/AppColor";
export default function Upgrade({ route }) {
  console.log(route.params.payload);
  return (
    <View style={{ ...style.upgCont }}>
      <View style={{ ...style.bg }}>
        <View style={{ alignItems: "center" }}>
          <Image source={rocket} style={{ height: 50, width: 50 }} />
        </View>
        <View style={{ ...style.rocBg }}>
          <Text style={{ ...style.upgTxt }}>
            Upgrade to the latest version!
          </Text>
        </View>

        <View style={{ ...style.abUpdateCont }}>
          <View style={{ ...style.abtCont }}>
            <Text style={{ fontWeight: "bold" }}>About Update:</Text>
            <Text style={{ fontWeight: "bold", color: `${AppColor.fifth}` }}>
              {route.params.payload.value}
            </Text>
          </View>
          <View>
            <Text style={{ padding: 5 ,color:'#000'}}>
              {route.params.payload.description}
            </Text>
          </View>
          <TouchableOpacity
            style={{ ...style.updateBtn }}
            onPress={() => {
              Linking.openURL(
               `${api.playstorelink}`
              );
            }}
          >
            <Text style={{ ...style.upTxt }}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  upgTxt: {
    textAlign: "center",
    fontWeight: "700",
    color: "#fff",
  },
  upgCont: {
    margin: 20,
    height: "70%",
    justifyContent: "center",
  },
  abtCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  upTxt: {
    textAlign: "center",
    fontWeight: "700",
    color: "#fff",
  },
  abUpdateCont: {
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 5,
    backgroundColor: "#fff",
  },
  updateBtn: {
    width: "40%",
    height: 40,
    borderRadius: 15,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: `${AppColor.fifth}`,
    marginTop: 30,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  rocBg: {
    marginTop: -28,
    zIndex: -1,
    height: 130,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: "rgba(252,111,51,0.6)",
    flexDirection: "column",
    justifyContent: "center",
  },
  bg: {
    marginTop: 50,
  },
});
