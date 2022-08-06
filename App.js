import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import Splash from './Component/Splash/Splash';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import ForgotPassword from './Component/ForgotPassword/Forgotpassword';
import AppSection from './Component/AppSection/AppSection';
import UserProvider from './Component/DataProvider/UserContext';
import Upgrade from './Component/UpgradeApp/Upgrade';
import Store from './Component/Store';
export default function App() {
  const Stack=createStackNavigator();
  return (
    
   <Provider store={Store}>
     <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>  
         
          <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown:false}}
          />
           <Stack.Screen
          name="Upgrade"
          component={Upgrade}
          options={{headerShown:false}}
          />
          <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown:false}}
          />
          <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown:false}}
          />
          <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{headerShown:false}}
          />
          <Stack.Screen
          name="AppSection"
          component={AppSection}
          options={{headerShown:false}}
          />
        
        </Stack.Navigator>
      </NavigationContainer>
      </UserProvider>
   </Provider>
  );
}

