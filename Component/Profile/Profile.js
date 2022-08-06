import React, {useState,useContext} from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useSelector } from "react-redux";
import { AppColor,regx} from "../WorkerComp/AppColor";
import InputComp from "../WorkerComp/InputComp";
import { UserContext } from "../DataProvider/UserContext";
import { StackActions } from "@react-navigation/native";
export default function Profile({navigation}) {
  const {navigate}=navigation;
  // should setuser profile once update is completed
  const appUser=useSelector((app)=>app.user.value);

  const [profile, setProfile]=useState({
    image: null,
    edit: false,
  });

  const[firstName,setFirstName]=useState({
    firstName: appUser.surname,
    fnError: false,
  })
 
  const[lastName,setLastName]=useState({
    lastName: appUser.otherName,
    lnError: false,
  })

  const[emailAddress,setEmailAddress]=useState({
   emailAddress:appUser.email,
   emError: false,
  })

  const[phoneNumber,setPhoneNumber]=useState({
    phoneNumber:appUser.phone,
    pnError: false,
  })

  const emailValidation=()=>{
    if(regx.emailFilter.test(emailAddress.emailAddress)){
      //   setUser({...user,type:'email'});
           return true;  
  }
   }

   const phoneValidation=()=>{
    if(regx.phoneFilter.test(phoneNumber.phoneNumber)){
      //   setUser({...user,type:'email'});
           return true;  
  }
   }

  const checkInput=()=>{
    var check=true;
     if(!firstName.firstName){
      setFirstName({...firstName,fnError:true});
      check=false;
     }else{
      setFirstName({...firstName,fnError:false});
     }
     if(!lastName.lastName){
       check=false;
        setLastName({...lastName,lnError:true});
     }else{
      setLastName({...lastName,fnError:true});
     }
     if(!emailAddress.emailAddress){
        check=false;
     }else{
       // check input type
         if(!emailValidation()){
          setEmailAddress({...emailAddress,emError:true});
          check=false;
         }else{
          setEmailAddress({...emailAddress,emError:false});
        
         }
     }
  }

  return (
    <View style={{margin:15}}>
      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <View
          style={{
            marginTop: 40,
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <Icon name="user-lock" size={65} color="#000"  />
        {profile.edit&&(<TouchableOpacity
            style={{
              height: 25,
              width: 25,
              borderRadius: 15,
              justifyContent: "center",
              marginTop:50,
              marginLeft:-10,
              backgroundColor:'#fff'
            }}
          >
            <Icon
              style={{ textAlign: "center" }}
              name="camera"
              size={15}
              color={AppColor.third}
            />
          </TouchableOpacity>)}
        </View>
        <View style={{flexDirection:'row',marginTop:40}}> 
        <TouchableOpacity onPress={()=>navigate('Reset Password')}><Text style={{ textDecorationLine: "underline" ,marginRight:10,marginLeft:10,color:`${AppColor.third}`}}>
            Change Password{" "}
          </Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>setProfile({...profile,edit:!profile.edit})}><Icon color="#000" size={15} name="edit" /></TouchableOpacity>
        </View>
      </View>
      <View>
        <InputComp
          inputType="name"
          value={firstName.firstName}
          mode="outlined"
          right={null}
          label="First Name"
          placeholder="Input value"
          style={style.name}
          error={firstName.fnError}
          secureText={false}
          disabled={!profile.edit}
          setText={(e) => {
            setProfile({ ...profile, firstName: e });
          }}
        />
        {firstName.fnError ? (
          <Text style={{ marginLeft: 25, color: "red" }}>Invalid input.</Text>
        ) : null}
      </View>
      <View>
        <InputComp
        value={lastName.lastName}
          inputType="name"
          mode="outlined"
          right={null}
          label="Last Name"
          placeholder="Input value"
          style={style.name}
          error={lastName.lnError}
          secureText={false}
          disabled={!profile.edit}
          setText={(e) => {
            setProfile({ ...profile, lastName: e });
          }}
        />
        {lastName.lnError ? (
          <Text style={{ marginLeft: 25, color: "red" }}>Invalid input.</Text>
        ) : null}
      </View>
      <View>
        <InputComp
        value={emailAddress.emailAddress}
          inputType="name"
          mode="outlined"
          right={null}
          label="Email Address"
          placeholder="Input value"
          style={style.name}
          error={emailAddress.emError}
          secureText={false}
          disabled={!profile.edit}
          setText={(e) => {
            setProfile({ ...profile, eaName: e });
          }}
        />
        {emailAddress.emError ? (
          <Text style={{ marginLeft: 25, color: "red" }}>Invalid input.</Text>
        ) : null}
      </View>
      <View>
        <InputComp
        value={phoneNumber.phoneNumber}
          inputType="telephoneNumber"
          mode="outlined"
          right={null}
          label="phone"
          placeholder="Input value"
          style={style.name}
          error={phoneNumber.pnError}
          secureText={false}
          disabled={!profile.edit}
          setText={(e) => {
            setProfile({ ...profile, eaName: e });
          }}
        />
        {phoneNumber.pnError ? (
          <Text style={{ marginLeft: 25, color: "red" }}>Invalid input.</Text>
        ) : null}
      </View>
      <View style={{flexDirection:'row',marginTop:10}}>
        <Text style={style.dcText}>Dispatcher Code: </Text>
        <Text style={{color:'#000',fontSize:11}}>{profile.id}</Text>
      </View>
      <View style={{flexDirection:'row',marginTop:20,display:'flex',justifyContent:'space-between'}}>
        {profile.edit&&(<TouchableOpacity style={style.updateBtn}>
          <Text style={{textAlign:'center',fontSize:15,fontWeight:'bold',color:'#fff'}}>Update</Text>
        </TouchableOpacity>)}
        <TouchableOpacity onPress={()=>navigation.dispatch(StackActions.replace('Login'))} style={{justifyContent:'center',marginRight:5}} >
          <Text style={{fontWeight:'bold',color:'#bbbbbb'}}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  name: { height:45,marginTop:15 },
  dcText:{
    fontWeight:'bold',
    color:'#000',
  },

  updateBtn:{
    height:40,
    width:100,
    borderRadius:5,
   
    backgroundColor:`${AppColor.third}`,
    justifyContent:'center',
    shadowColor: `${AppColor.third}`,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
});
