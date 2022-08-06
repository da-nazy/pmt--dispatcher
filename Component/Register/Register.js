import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { AppColor, regX } from "../WorkerComp/AppColor";
import InputComp from "../WorkerComp/InputComp";
import { TextInput } from "react-native-paper";
import { apiRequest, api } from "../WorkerComp/Api";
import LoaderComp from "../WorkerComp/LoaderComp";
export default function Register() {
  const [appOpp, setAppOpp] = useState({
    load: false,
  });
  const [bizName, setBizName] = useState({
    bizName: "",
    bizNameError: "",
  });
  const [repassword, setRepassword] = useState({
    repassword: "",
    repasswordError: false,
    secure: true,
  });
  const [password, setPassword] = useState({
    password: "",
    passwordError: false,
    secure: true,
  });
  const [phone, setPhone] = useState({
    phone: "",
    phoneError: false,
  });

  const [email, setEmail] = useState({
    email: "",
    emailError: false,
  });

  const [name, setName] = useState({
    name: "",
    nameError: false,
  });

  const [lastName, setLastName] = useState({
    lastName: "",
    setLastNameError: false,
  });

  const emailValidation = () => {
    if (regX.emailFilter.test(email.email.trim())) {
      //   setUser({...user,type:'email'});
      return true;
    }
  };
  const phoneValidation = () => {
    if (regX.phoneFilter.test(phone.phone.trim())) {
      //   setUser({...user,type:'email'});
      return true;
    }
  };

  const inputCheck = () => {
    var check = true;

    if (name.name === "") {
      setName({ ...name, nameError: true });
      check = false;
      console.log("error");
    } else {
      setName({ ...name, nameError: false });
    }

    if (bizName.bizName === "") {
      setBizName({ ...bizName, bizNameError: true });
      check = false;
      console.log("error");
    } else {
      setBizName({ ...bizName, bizNameError: false });
    }

    if (lastName.lastName === "") {
      setLastName({ ...lastName, lastNameError: true });
      check = false;
    } else {
      setLastName({ ...lastName, lastNameError: false });
    }

    if (email.email === "") {
      setEmail({ ...email, emailError: true });
      check = false;
      console.log(email.email);
    } else {
      //setEmail({...email,emailError:false})
      if (emailValidation()) {
        setEmail({ ...email, emailError: false });
      } else {
        setEmail({ ...email, emailError: true });
        check = false;
      }
    }

    if (phone.phone === "") {
      setPhone({ ...phone, phoneError: true });
      check = false;
    } else {
      //setEmail({...email,emailError:false})
      if (phoneValidation()) {
        setPhone({ ...phone, phoneError: false });
        console.log("okay");
      } else {
        console.log("error");
        setPhone({ ...phone, phoneError: true });
        check = false;
      }
    }

    if (password.password === "") {
      setPassword({ ...password, passwordError: true });
      check = false;
      console.log("error");
    } else {
      if (password.password.length < 8) {
        check = false;
        setPassword({ ...password, passwordError: true });
      } else {
        setPassword({ ...password, passwordError: false });
      }
    }

    if (repassword.repassword === "") {
      setRepassword({ ...repassword, repasswordError: true });
      check = false;
      console.log("error");
    } else {
      if (repassword.repassword.length < 8) {
        check = false;
        setRepassword({ ...repassword, repasswordError: true });
      } else {
        setRepassword({ ...repassword, repasswordError: false });
      }
    }
    //console.log(check,'dan');
    return check;
  };

  const requestSuccess = (e) => {
    return Alert.alert("Success", e);
  };
  const requestFailure = (e) => {
    return Alert.alert("Error", e);
  };

  const registerRequest = () => {
    console.log("rgister");
    if (inputCheck()) {
      //console.log(password.password,repassword.repassword);
      if (password.password == repassword.repassword) {
        var registerObject = {
          method: "post",
          url: `${api.localUrl}${api.register}`,
          data: {
            email: email.email,
            phone: phone.phone,
            password: password.password,
            surname: name.name,
            otherName: lastName.lastName,
            businessName: bizName.bizName,
            userType: "LP",
            subsidiary: "PML",
          },
        };
        apiRequest(
          registerObject,
          (e) => {
            setAppOpp({ ...appOpp, load: e });
          },
          (e) => {
            requestSuccess(e);
          },
          (e) => {
            requestFailure(e);
          },
          (e) => payload(e)
        );
      } else {
        // okay
        Alert.alert("Error", "Password Mismatch!");
      }
    } else {
      Alert.alert("Error", "Empty field found!");
    }
  };
  return (
    <ScrollView>
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-end",
          marginTop: 45,
          marginRight: 15,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: `${AppColor.primary}`,
          }}
        >
          PML
        </Text>
        <Text style={{ fontSize: 8 }}>DISPATCHER</Text>
      </View>
      <View>
        <InputComp
          mode="outlined"
          right={null}
          label="First Name or Surname"
          style={style.name}
          error={name.nameError}
          secureText={false}
          setText={(e) => {
            setName({ ...name, name: e });
          }}
        />
        {name.nameError ? (
          <Text style={{ ...style.errMsg }}>Invalid FirstName.</Text>
        ) : null}
      </View>
      <View>
        <InputComp
          mode="outlined"
          right={null}
          label="Last Name"
          style={style.name}
          error={lastName.lastNameError}
          secureText={false}
          setText={(e) => {
            setLastName({ ...lastName, lastName: e });
          }}
        />
        {lastName.lastNameError ? (
          <Text style={{ ...style.errMsg }}>Invalid LastName.</Text>
        ) : null}
      </View>
      <View>
        <InputComp
          inputType="emailAddress"
          mode="outlined"
          right={null}
          label="Email Address"
          style={style.name}
          error={email.emailError}
          secureText={false}
          setText={(e) => {
            setEmail({ ...email, email: e });
          }}
        />
        {email.emailError ? (
          <Text style={{ ...style.errMsg }}>Invalid Email Address.</Text>
        ) : null}
      </View>
      <View>
        <InputComp
          inputType="telephoneNumber"
          mode="outlined"
          right={null}
          label="Phone"
          style={style.name}
          error={phone.phoneError}
          secureText={false}
          setText={(e) => {
            setPhone({ ...phone, phone: e });
          }}
        />
        {phone.phoneError ? (
          <Text style={{ ...style.errMsg }}>Invalid Phone Number.</Text>
        ) : null}
      </View>
      <View>
        <InputComp
          mode="outlined"
          right={null}
          label="Business Name:"
          style={style.name}
          error={bizName.bizNameError}
          secureText={false}
          setText={(e) => {
            setBizName({ ...bizName, bizName: e });
          }}
        />
        {bizName.bizNameError ? (
          <Text style={{ ...style.errMsg }}>Invalid Business Name.</Text>
        ) : null}
      </View>
      <View>
        <InputComp
          inputType="password"
          mode="outlined"
          right={
            <TextInput.Icon
              name="eye"
              onPress={() =>
                setPassword({ ...password, secure: !password.secure })
              }
            />
          }
          label="Password"
          style={style.name}
          error={password.passwordError}
          secureText={password.secure}
          setText={(e) => {
            setPassword({ ...password, password: e });
          }}
        />
        {password.passwordError ? (
          <Text style={{ ...style.errMsg }}>
            Invalid input 8 or more characters.
          </Text>
        ) : null}
      </View>
      <View>
        <InputComp
          inputType="password"
          mode="outlined"
          right={
            <TextInput.Icon
              name="eye"
              onPress={() =>
                setRepassword({ ...repassword, secure: !repassword.secure })
              }
            />
          }
          label="Re-enter Password"
          style={style.name}
          error={repassword.repasswordError}
          secureText={repassword.secure}
          setText={(e) => {
            setRepassword({ ...repassword, repassword: e });
          }}
        />
        {repassword.repasswordError ? (
          <Text style={{ ...style.errMsg }}>
            Invalid input 8 or more characters.
          </Text>
        ) : null}
      </View>
      <TouchableOpacity onPress={() => registerRequest()} style={style.proc}>
        <Text style={{ color: "#fff", textAlign: "center", fontSize: 15 }}>
          Proceed
        </Text>
      </TouchableOpacity>
      {appOpp.load && <LoaderComp siz={25} color={AppColor.third} />}
    </ScrollView>
  );
}

const style = StyleSheet.create({
  name: {
    margin: 10,
  },
  errMsg: {
    marginLeft: 25,
    color: "red",
  },
  proc: {
    justifyContent: "center",
    margin: 35,
    marginTop: 20,
    height: 45,
    backgroundColor: `${AppColor.primary}`,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
