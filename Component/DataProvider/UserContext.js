import React,{useState,createContext} from 'react';

export const  UserContext=createContext();

export default UserProvider=props=>{
    const[dispatch,setDispatch]=useState({
      title:'default',
    });
    const[userG,setUserG]=useState({
        token:'',
    });
    const[userProfile,setUserProfile]=useState(null);
    const[pickup,setPickup]=useState(null);
    const[delivery,setDelivery]=useState(null);
    const[collection,setCollection]=useState(null);
    return(
        <UserContext.Provider value={{ dispatch,setDispatch,userG,setUserG,userProfile,setUserProfile}}>
            {props.children}
        </UserContext.Provider>
    )
}