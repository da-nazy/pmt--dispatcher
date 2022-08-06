import React, { useContext, useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { UserContext } from "../../DataProvider/UserContext";
import { apiRequest, api } from "../../WorkerComp/Api";
import LoaderComp from "../../WorkerComp/LoaderComp";
import { AppColor } from "../../WorkerComp/AppColor";
export default function Parcel({ parcelId }) {
  //  To get the parcel id and populate
  console.log(parcelId);
  const usercontext = useContext(UserContext);
  const { userG, userProfile } = usercontext;
  const [userParcel, setUserParcel] = useState(null);
  const [appDetails, setAppDetails] = useState({
    load: false,
    refresh: false,
  });
  
  const wait = (timeOut) => {
    return new Promise((resolve) => setTimeout(resolve, timeOut));
  };
  const parcelDetails = (main, desc) => {
    return (
      <View>
        <View style={styles.disc}>
          <Text
            style={{
              paddingLeft: 5,
              fontWeight: "bold",
              fontSize: 15,
              backgroundColor: `${AppColor.lightSecondary}`,
              borderWidth: 1,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              borderColor: `${AppColor.lightSecondary}`,
            }}
          >
            {main}:
          </Text>
          <Text style={{ paddingLeft: 5 }}>{desc}</Text>
        </View>
      </View>
    );
  };
  const parcelDescrition = () => {
    return (
      <ScrollView
        style={{
          height: Dimensions.get("screen").height / 1.2,
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        <Text style={{ textAlign: "center" }}>Item Details:</Text>
        {parcelDetails("Mass", parcelId.mass.toString())}
        {parcelDetails("Name", parcelId.name)}
        {parcelDetails("Quantity",parcelId.quantity.toString())}
        {parcelDetails("Volume", parcelId.volume.toString())}
        {parcelDetails("worth", parcelId.worth.toString())}

       
      </ScrollView>
    );
  };

  
  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
    {parcelDescrition()}

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  disc: {
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#fff",
    height: 50,
    margin: 10,
    borderTopEndRadius: 5,
    borderTopLeftRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
});
