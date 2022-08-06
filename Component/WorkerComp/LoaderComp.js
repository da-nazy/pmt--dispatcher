import React from 'react';
import {View,Text,ActivityIndicator,Dimensions} from 'react-native';
export default function LoaderComp({size,color}){

    return (
        <View style={{ position: 'absolute', flex: 1, zIndex: 2, justifyContent: "center", alignSelf: 'center', flexDirection: "row", top: -5, justifyContent: "space-around", padding: 10, width: '100%', height: Dimensions.get('screen').height }}>
        <ActivityIndicator animating={true} size={size} color={color} />
      </View>
    )
}