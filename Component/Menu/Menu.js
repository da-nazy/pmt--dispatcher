import React, { useState, useContext ,useEffect} from "react";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  StatusBar,
  Platform
} from "react-native";
import { useSelector } from "react-redux";
import menu_bg from "../../Asset/menu_bg.png";
import { AppColor } from "../WorkerComp/AppColor";
import Icon from "react-native-vector-icons/FontAwesome5";
import Navbar from "../WorkerComp/Navbar";
export default function Menu({ navigation }) {
 const appUser=useSelector((app)=>app.user.value);
  const [menu,setMenu]=useState({
     walletLodaded:true,
  });

 
  const [menuItem, setMenuItem] = useState([
    {
      icon: "box",
      name: "Pickup & Delivery",
      callAction: "Customer-to-Customer",
      // To pass pickup param
      func: () => {
      //  disOperation("Pickup");
      navigation.navigate('PickDrop');
      },
      id: 1,
    },
    {
      icon: "cubes",
      name: "Assignment",
      callAction: "Customer-to-Terminal",
      // To pass collection param
      func: () => {
        navigation.navigate('Pickups')
      },
      id: 2,
    },
    {
      icon: "truck",
      name: "Delivery",
      callAction: "Terminal-to-Customer",
      // To pass delivry param
      func: () => {
        navigation.navigate('Deliveries')
      },
      id: 3,
    },
    {
      icon: "wallet",
      name: "Transactions",
      callAction: "Shipment Payment",
      func: () =>navigation.navigate("Transactions"),
      id: 4,
    },
    {
      icon: "clipboard-check",
      name: "History",
      callAction: "Previous Deliveries",
      func: () => navigation.navigate('History'),
      id: 5,
    },
    {
      icon: "money-bill-wave",
      name: "Ewallet",
      callAction: "Go-to-Ewallet",
      func: () =>navigation.navigate('Wallet'),
      id: 6,
    },
  ]);

  const { navigate } = navigation;
  return (
    <View style={{...style.container}}>
      <StatusBar animated={true} backgroundColor={AppColor.third} />
      <View style={{ backgroundColor:"#000", height:240 }}>
     
        <Navbar color={"#fff"} nav={navigation}/>
        <ImageBackground
          source={menu_bg}
          resizeMode="cover"
          style={style.image}
          blurRadius={3}
        >
          <View
            style={{ top: -80, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "#fff",paddingTop:10 }}>
              PMT  LOGISTICS
            </Text>
            
          </View>
          <Text
            style={{
              fontSize: 25,
              top: -25,
              textAlign: "center",
              color: "#fff",
            }}
          >
            Hello!, {appUser?appUser.surname:''}
          </Text>
          <TouchableOpacity
            style={{ top: 40 }}
            onPress={() => navigate("Profile")}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 12,
                color: "#fff",
              }}
            >
              View Profile
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      {/** Can be in a scroll view for swipe referesh of account */}
      <ScrollView style={style.menu_bdy}>
        <View
          style={{
            margin: 10,
            marginTop: 15,
            height: 80,
            borderRadius: 5,
            backgroundColor: "#F0F0F0",
            padding: 5,
          }}
        >
          <Text style={{ marginLeft: 15,color:'#000' }}>Wallet Balance</Text>
          <View
            style={{
              flexDirection: "row",
              marginLeft: 15,
              marginTop: 5,
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  marginRight: 10,
                  backgroundColor: "#FCE1D0",
                  height: 40,
                  borderWidth: 1,
                  borderColor: "#F8B890",
                  width: 40,
                  justifyContent: "center",
                  borderRadius: 20,
                }}
              >
                <Icon
                  style={{ textAlign: "center" }}
                  name="wallet"
                  size={15}
                  color={AppColor.third}
                />
              </View>
              {menu.walletLodaded ? (
                <Text style={{ alignSelf: "center", fontWeight: "bold",color:'#000' }}>
                  {"\u20A6"} 0.0
                </Text>
              ) : (
                <ActivityIndicator size="small" color={AppColor.third} />
              )}
            </View>
            <TouchableOpacity
              style={{
                borderColor: `${AppColor.third}`,
                backgroundColor: `${AppColor.third}`,
                flexDirection: "row",
                borderWidth: 1,
                height: 35,
                width: 90,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 15,
              }}
            >
              <Text
                style={{ fontWeight: "bold", marginRight: 5, color: "#fff" }}
              >
                Wallet
              </Text>
              <Icon name="eye" size={15} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: 500,
            margin: 5,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          {menuItem &&
            menuItem.map((e, i) => {
              return (
                <TouchableOpacity
                  onPress={() => e.func()}
                  key={i}
                  style={{
                    width: "47%",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 5,
                    height: 100,
                    borderRadius: 5,
                    backgroundColor: "#F0F0F0",
                  }}
                >
                  <Icon name={e.icon} size={40} color={AppColor.third} />
                  <Text style={{ fontWeight: "bold",color:`${AppColor.fifth}`}}>{e.name}</Text>
                  {e.callAction ? <Text style={{fontSize:12,fontWeight:'600',color:'#000'}}>{e.callAction}</Text> : null}
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  container:{

  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  navBar: {
		marginBottom: -40,
		zIndex: 10,
		paddingLeft: 15,
		paddingTop: 8,
	},
  menu_bdy: {
    height: Dimensions.get("screen").height / 1.5,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    top: -20,
    backgroundColor: "#fff",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },

});
