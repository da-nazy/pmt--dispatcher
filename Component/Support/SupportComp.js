import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {AppColor} from '../WorkerComp/AppColor';
export default function SupportComp({fabFunc, name, value, iconName}) {
  return (
    <TouchableOpacity onPress={() => fabFunc()} style={style.supportView}>
      <Icon
        style={{...style.icon}}
        name={iconName}
        size={20}
        color={AppColor.third}
      />
      <View style={{...style.subCont}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{...style.nameTxt}}>{name}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{...style.valueTxt}}>{value} </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const style = StyleSheet.create({
  nameTxt: {
    color: `${AppColor.third}`,
    fontWeight: 'bold',
  },
  valueTxt: {
    fontWeight: '500',
    fontSize: 20,
    color: '#000',
  },
  subCont: {
    flexDirection: 'column',
    width: '60%',
    borderLeftWidth: 1,
    borderStyle: 'dashed',
    height: '100%',
    padding: 3,
    justifyContent: 'space-evenly',
  },
  icon: {
    width: '15%',
    alignSelf: 'center',
    textAlign: 'center',
  },
  supportView: {
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    height: 65,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
