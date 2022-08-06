import React, { useState,useContext} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useDispatch,useSelector } from "react-redux";
import { AppColor } from "./AppColor";
import { StackActions } from "@react-navigation/native";
import { removeAuth } from "../Store/Reducers/auth";
export const CustomDrawerContent = (props) => {
  const dispatchApp=useDispatch();
  const appUser=useSelector((app)=>app.user.value);
  
 const logout=()=>{
   dispatchApp(removeAuth());
   props.navigation.dispatch(StackActions.replace("Login"));
 }
  const [sideBar, setSideBar] = useState([
    {
      icon: "bars",
      name: "Menu",
      func: () =>props.navigation.navigate("Menu"),
      id: 2,
    },
    {
      icon: "phone-alt",
      name: "Support",
      func: () => props.navigation.navigate("Support"),
      id: 1,
    },

    {
      icon: "box",
      name: "Pickup & Delivery",
      func: () =>props.navigation.navigate("PickDrop"),
      id: 3,
    },
    {
      icon: "truck",
      name: "Delivery",
      func: () =>props.navigation.navigate("Deliveries"),
      id: 4,
    },
    {
      icon: "cubes",
      name: "Assignment",
      func: () =>props.navigation.navigate('Pickups'),
      id: 5,
    },
    {
      icon: "sign-out-alt",
      name: "Logout",
      func: () => logout(),
    },
  ]);
  return (
    <DrawerContentScrollView {...props}>
      <View>
        <View
          style={{
            paddingLeft: 20,
            borderBottomColor: `${AppColor.third}`,
            borderBottomWidth: 1,
            margin: 5,
            paddingBottom: 10,
          }}
        >
          <View style={{ flexDirection: "row", marginTop: 30 }}>
            <TouchableOpacity
              style={{
                backgroundColor:'#bbbbbb',
                height: 70,
                width: 70,
                justifyContent: "center",
                borderRadius: 35,
              }}
              onPress={()=>props.navigation.navigate('Profile')}
            >
              <Icon
                style={{ textAlign: "center" }}
                name="user"
                color="#3F3F3F"
                size={30}
              />
            </TouchableOpacity>
            <Text style={{ marginTop: 20, marginLeft: 10, fontWeight: "bold",color:'#000' }}>
              Dispatcher Account
            </Text>
          </View>
          <Text style={{ marginTop: 10,color:'#000' }}>{appUser?appUser.surname+" "+appUser.otherName:''}</Text>
        </View>
        <View style={{ marginTop: 35, marginLeft: 15 }}>
          {sideBar &&
            sideBar.map((e, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={()=>e.func()}
                  style={{ flexDirection: "row", marginBottom: 30 }}
                >
                  <Icon
                    name={e.icon}
                    size={20}
                    color={AppColor.third}
                    style={{ marginRight: 15, fontSize: 15, marginTop: 4 }}
                  />
                  <Text style={{ fontSize: 15 ,color:'#000'}}>{e.name}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </View>
    </DrawerContentScrollView>
  );
};
