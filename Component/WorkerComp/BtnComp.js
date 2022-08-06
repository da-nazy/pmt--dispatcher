import React from 'react';
import { Button } from "react-native-paper";
export default function BtnComp({mode,func,style,icon,name}) {
  return  <Button
  icon={icon}
  mode={mode}
  style={style}
  onPress={() =>func()}
>
  {name}
</Button>;
}
