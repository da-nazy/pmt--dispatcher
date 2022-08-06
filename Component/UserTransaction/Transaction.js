import { Tabs } from "react-native-collapsible-tab-view";
import React, { useRef ,useState} from "react";
import ShipmentTransaction from "./ShipmentTransaction";
import WalletTransaction from "./WalletTransaction";
import HeaderTransaction from "./HeaderTransaction";


export default function TestTab() {
  const contRef = useRef(null);
  /**
   * console.log(contRef.current.getFocusedTab())
   */ 
     const[appState,setAppState]=useState({
       tabName:'',
       initialTabName:'Shipments',
     })
  const output = (e) => {
    console.log(e.tabName);
     setAppState({...appState,tabName:e.tabName});
    return e.tabName;
  };
  const check=(e)=>{
    console.log("working",e);
  }
  return (
    <Tabs.Container
      renderHeader={()=><HeaderTransaction test={(e)=>check(e)}/>}
      initialTabName="Shipments"
      pointerEvents='box-none'
      ref={contRef}
      onTabChange={(index) => output(index)}
     
    >
      <Tabs.Tab name="Shipments">
        <Tabs.ScrollView><ShipmentTransaction e={appState.tabName} a={appState.initialTabName}/>
        </Tabs.ScrollView>
      </Tabs.Tab>
      <Tabs.Tab name="Wallet">
        <Tabs.ScrollView><WalletTransaction e={appState.tabName} a={appState.initialTabName}/></Tabs.ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  );
}
 
