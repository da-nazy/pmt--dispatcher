import React, { useState, useEffect, useRef, useContext } from "react";
import MapView, { Marker, Callout,Polyline } from "react-native-maps";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import axios from "axios";
import IconComp from "../WorkerComp/IconComp";
import { api, pinColor } from "../WorkerComp/Api";

export default function PickupLocationMap({ navigation, route }) {
  // This only have one function to display pickup and drop location
  const coordinates=[
    {
      latitude: route.params?.locFrom?.coordinates[0],
      longitude: route.params?.locFrom?.coordinates[1],
    },
    {
      latitude: route.params?.locTo?.coordinates[1],
      longitude: route.params?.locTo?.coordinates[0],
    },
  ];
  const [ovPolyline,setOvPolyline]=useState('');
  const [coords,setCoords]=useState([]);
  const { navigate } = navigation;

     const getCoords=()=>{
     axios({
      method:'get',
      url:`${api.mapDirections}${route.params?.locFrom?.coordinates[0]},${route.params?.locFrom?.coordinates[1]}&destination=${route.params?.locTo?.coordinates[0]},${route.params?.locTo?.coordinates[1]}&key=${api.mapKey}&mode='driving'`,
     }).then(function(response){
      setOvPolyline(response.data.routes[0].overview_polyline.points);
    // console.log(decode(response.data.routes[0].overview_polyline.points));
     setCoords(decode(response.data.routes[0].overview_polyline.points))
     }).catch(function (error){
      console.log(error);
     })
     };

  useEffect(()=>{
     
     if(!ovPolyline){
      getCoords();
     }

  },[ovPolyline,])

      const decode=(t,e)=>
        {
          for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){
            a=null,h=0,i=0;
            do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;
            while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;
            do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;
            while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}
            return d=d.map(
              function(t){
                return{latitude:t[0],longitude:t[1]}})}
      


  const locAddress = [
    { address: route.params?.locFrom?.address, color: pinColor.color2 },
    { address: route.params?.locTo?.address, color:pinColor.color17 },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.pick}>
        <View
          style={{
            width: "90%",
            display: "flex",
            height: "100%",
            justifyContent: "space-around",
          }}
        >
          
          {locAddress.map((e, i) => {
            return (
              <View
                key={i}
                style={{
                  height: "45%",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <IconComp
                  name="circle"
                  size={15}
                  color={e.color}
                  style={{ fontWeight: "bold", marginRight: 5 }}
                />
                <Text style={{ fontSize: 10 ,color:'#000'}}>{e.address}</Text>
              </View>
            );
          })}
        </View>
      </View>
{/** <MapViewDirections
          lineDashPattern={[0]}
            origin={{
              latitude: route.params?.locFrom?.coordinates[0],
              longitude: route.params?.locFrom?.coordinates[1],
            }}
            destination={{
              latitude: route.params?.locTo?.coordinates[1],
              longitude: route.params?.locTo?.coordinates[0],
            }}
            apikey={"AIzaSyBKPEWUhmafR04GageHVAbLMeFqURBrX9o"} 
            strokeWidth={3}
            strokeColor={`${AppColor.third}`}
            onError={(error)=>console.log(error)}
          /> */}
      <View style={{ flexDirection: "row" }}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          onMapReady={() => console.log("Map ViewDirection")}
          initialRegion={{
            latitude: route.params?.locFrom?.coordinates[0],
            longitude: route.params?.locFrom?.coordinates[1],
            latitudeDelta: 0.0622,
            longitudeDelta: 0.0121,
          }}
          provider="google"
        >
          <Polyline
          lineDashPattern={[0]}
          coordinates={[
            {
              latitude: route.params?.locFrom?.coordinates[0],
              longitude: route.params?.locFrom?.coordinates[1],
            },
            ...coords,
            {
              latitude: route.params?.locTo?.coordinates[1],
              longitude: route.params?.locTo?.coordinates[0],
            },
          ]}
          strokeColor={pinColor.color2}
          fillColor={pinColor.color2}
          strokeColors={pinColor.color2}
          strokeWidth={2}
          />

          <Marker
            pinColor={pinColor.color2}
            coordinate={{
              latitude: route.params?.locFrom?.coordinates[0],
              longitude: route.params?.locFrom?.coordinates[1],
            }}
          >
            <Callout>
              <Text style={{color: pinColor.color2 }}>Pickup Location</Text>
            </Callout>
          </Marker>
          <Marker
            pinColor={pinColor.color17}
            coordinate={{
              latitude: route.params?.locTo?.coordinates[1],
              longitude: route.params?.locTo?.coordinates[0],
            }}
          >
            <Callout>
              <Text style={{color: pinColor.color17}}>Drop Location</Text>
            </Callout>
          </Marker>
        
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    top: 5,
  },
  pick: {
    flexDirection: "row",
    position: "absolute",
    margin: 10,
    zIndex: 1,
    height: 90,
    width: Dimensions.get("screen").width / 1.13,
    borderRadius: 5,
    backgroundColor: "#fff",
    justifyContent: "space-evenly",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  btn: {
    margin: 5,
    height: 50,
    fontSize: 13,
    textAlign: "left",
  },
});
