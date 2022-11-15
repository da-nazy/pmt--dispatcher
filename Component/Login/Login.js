import React, { useState, useContext, useRef } from "react";
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
  Switch,
} from "react-native";
import { useDispatch ,useSelector} from "react-redux";
import InputComp from "../WorkerComp/InputComp";
import { AppColor, regX } from "../WorkerComp/AppColor";
import { apiRequest, api } from "../WorkerComp/Api";
import LoaderComp from "../WorkerComp/LoaderComp";
import ResetPassword from "../ResetPassword/ResetPassword";
import Custombtm from "../WorkerComp/Custombtm";
import { TextInput } from "react-native-paper";
import {StackActions} from "@react-navigation/native";
import {storeToken} from "../WorkerComp/ExternalFunctions";
import { setUser as setProfile } from "../Store/Reducers/user";
import { setAuth } from "../Store/Reducers/auth";
export default function Login({ navigation }) {

  const dispatch=useDispatch();
  const btmRef = useRef(null);
  const { navigate } = navigation;
  const [isOtpEnabled, setOtpIsEnabled] = useState(false);
   
    const appAuth=useSelector((app)=>app.auth);
    const appUser=useSelector((app)=>app.user)
  const toggleSwitch = () => setOtpIsEnabled((previousState) => !previousState);
  
  const [appOp, setAppOp] = useState({
    load: false,
  });

  const pwdAlert = (e, m) => {
    return Alert.alert(e, m);
  };
  const [user, setUser] = useState({
    type: "",
    emailPhone: "",
    password: "",
    emailPhoneError: false,
    passwordError: false,
    pwdSecure: true,
  });

  const validatePhone = () => {
    if (regX.phoneFilter.test(user.emailPhone.trim())) {
    
      return true;
    }
  };

  const validateEmail = () => {
    if (regX.emailFilter.test(user.emailPhone.trim())) {
     
      return true;
    }
  };
  const resetpwdFail = (e) => {
    Alert.alert("Error", e);
  };
  const resetPwdSucc = (e) => {
    Alert.alert("Success", e);
    btmRef.current.open();
  };
  const userProfilePayload = (e) => {
    dispatch(setProfile(e));
  };
  const userProfileSuc = (e) => {
    // console.log(e);
    if (isOtpEnabled) {
      // request for the btm
      btmRef.current.open();
    } else {
      console.log("No otp");
      // should login
      navigation.dispatch(StackActions.replace("AppSection", { goto: null }));
    }
  };
  const userProfileFail = (e) => {
    return Alert.alert("Error", e);
  };
  const getUser = (e) => {
    // To get the user
    var userObject = {
      method: "get",
      url: `${api.localUrl}${api.userProfile}`,
      headers: {
        Authorization: " Bearer " + e,
      },
    };
   
    apiRequest(
      userObject,
      (e) => {
        setAppOp({ ...appOp, load: e });
      },
      (e) => {
        userProfileSuc(e);
      },
      (e) => {
        userProfileFail(e);
      },
      (e) => {
        userProfilePayload(e);
      }
    );
  };
  const requestSuccess = (e) => {
    //return  Alert .alert("Success",e);
    //
    console.log(e);
  };
  const requestFailure = (e) => {
    return Alert.alert("Error", e ? e : "Nothing returned");
  };

  const payload = (e) => {
    dispatch(setAuth({token:e.token,auth:true}));
   // setUserG({ ...userG, token: e.token });
  
    storeToken(e.token).then((check)=>{
      console.log(check)
    }).catch((err)=>{
    console.log(err)
    })
    

    if (e.token) {
      getUser(e.token);
    }
  };

  const check = () => {
    var check = true;
    if (!user.emailPhone) {
      check = false;
      setUser({ ...user, emailPhoneError: true });
    } else {
     
      if (validateEmail()) {
        setUser({ ...user, emailPhoneError: false });
       
        if (!user.password) {
          check = false;
          setUser({ ...user, passwordError: true });
        } else {
          setUser((prevState) => ({
            ...prevState,
            passwordError: false,
            emailPhoneError: false,
          }));
        }
      } else if (validatePhone()) {
        setUser((prevState) => ({ ...prevState, emailPhoneError: false }));
 
        if (!user.password) {
          check = false;
          setUser({ ...user, passwordError: true });
        } else {
          setUser((prevState) => ({
            ...prevState,
            passwordError: false,
            emailPhoneError: false,
          }));
        }
      } else {
        check = false;
        setUser({ ...user, emailPhoneError: true });
        console.log("error");
      }
    }

    return check;
  };
  const checkInput = () => {
    if (check()) {
      //   Alert.alert("Success","Values correct")
      var loginObject = {
        method: "post",
        url: `${api.localUrl}${api.login}`,
        data: {},
      };
      // loginObject[`${user.type}`]=user.emailPhone;
      var type;
      if (validateEmail()) {
        type = "email";
      }
      if (validatePhone()) {
        type = "phone";
      }

      if (isOtpEnabled) {
        loginObject.data["otp"] = user.password;
      } else {
        loginObject.data["password"] = user.password;
      }
      // This section adds the property type to the loginObject
      // loginObject[type]=user.emailPhone;

      loginObject.data[type] = user.emailPhone;
  
      apiRequest(
        loginObject,
        (e) => {
          setAppOp({ ...appOp, load: e });
        },
        (e) => {
          requestSuccess(e);
        },
        (e) => {
          requestFailure(e);
        },
        (e) => {
          payload(e);
        }
      );
    }
    
  };
  return (
    <ScrollView style={{paddingTop:100,backgroundColor:`${isOtpEnabled?"#ECECEC":"#fff"}` }}>
      <StatusBar animated={true} backgroundColor={AppColor.third} />
      <View style={{ alignSelf: "center", marginBottom: 20 }}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
            color: `${AppColor.primary}`,
          }}
        >
          PMT
        </Text>
        <Text style={{ textAlign: "center" }}>DISPATCHER</Text>
      </View>
      <View>
        <InputComp
          mode="outlined"
          right={null}
          label="Email or Phone number"
          style={style.emailPhone}
          error={user.emailPhoneError}
          secureText={false}
          setText={(e) => {
            setUser({ ...user, emailPhone: e });
          }}
        />
        {user.emailPhoneError && (
          <Text style={{ marginLeft: 25, color: "red" }}>Empty field!</Text>
        )}
      </View>
      <View>
        <InputComp
          mode="outlined"
          label={isOtpEnabled?'Enter OTP':'Enter Password'}
          style={style.emailPhone}
          error={user.passwordError}
          secureText={user.pwdSecure}
          setText={(e) => {
            setUser({ ...user, password: e });
          }}
          right={
            <TextInput.Icon
              name="eye"
              onPress={() => setUser({ ...user, pwdSecure: !user.pwdSecure })}
            />
          }
        />
        {user.passwordError && (
          <Text style={{ marginLeft: 25, color: "red" }}>
            Empty field!
          </Text>
        )}
      </View>
    
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => checkInput()}
          style={{
           ...style.loginBtn
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: `${AppColor.forth}`,
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate("ForgotPassword")}>
          <Text style={{ marginTop: 20, textAlign: "center",color:`${AppColor.third}`}}>
            Forgot password?
          </Text>
        </TouchableOpacity>
      </View>
  
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop:10,
        }}
      >
       
        <TouchableOpacity onPress={() => toggleSwitch()}>
          <Text style={{...style.otpLog}}>{isOtpEnabled?"Login With Password":"Login With OTP"}</Text>
        </TouchableOpacity>
      </View>
      {appOp.load && <LoaderComp size={25} color={AppColor.third} />}
      <Custombtm
        e={() => (
          <ResetPassword
            token={appAuth.token}
            showText={true}
            id={appUser.userid}
            setAlert={(e, m) => pwdAlert(e, m)}
            succ={(e) => resetPwdSucc(e)}
            load={(e) => setAppOp({ ...appOp, load: e })}
            fail={(e) => resetpwdFail(e)}
          />
        )}
        btmRef={btmRef}
        height={390}
      />
    </ScrollView>
  );
}

const style = StyleSheet.create({
  otpLog:{
    color:`${AppColor.third}`,
    textDecorationStyle:'solid',
    textDecorationLine:'underline',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  emailPhone: {
    margin: 10,
  },
  loginBtn:{
    backgroundColor: `${AppColor.primary}`,
    borderWidth: 1,
    borderColor:`${AppColor.primary}`,
    width: Dimensions.get("screen").width / 1.2,
    alignSelf: "center",
    marginTop: 40,
    height: 45,
    justifyContent: "center",
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  }
});
