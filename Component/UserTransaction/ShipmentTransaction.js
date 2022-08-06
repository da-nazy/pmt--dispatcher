import React from 'react';
import {View,Text} from 'react-native';
export default function ShipmentTransaction({e,a}){
    return(
<View style={{ height: "100%"}}>
    <Text>
        Shipment Screen show:{e?e:a}
    </Text>
</View>
    )
}