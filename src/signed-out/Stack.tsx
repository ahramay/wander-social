import React, { Fragment } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ForgotPassword from './ForgotPassword';
import PhoneSignIn from './PhoneSignIn';
import EmailSignIn from './EmailSignIn';
import SignIn from './SignIn';
// import Auth Screens
import LoginScreen from './AuthScreen/LoginScreen';
import EmailCreate from './AuthScreen/EmailCreate';
import Info1 from './AuthScreen/Info1';
import AddInterestScreen from './AuthScreen/AddIntrestScreen';



import Signup_Signin from './Signup_Signin';
import LoginOptionScreen from './LoginOptionScreen';


import Wander from '../signed-in/main/Wander';

import theme from '../theme'
import { StyleSheet, TouchableWithoutFeedback, Button, View,TouchableOpacity,Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const Stack = createStackNavigator();

function SignedOutStack() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
         
          headerTitle:"",
          headerBackTitle:"",            
          headerBackTitleVisible:false,
          headerTransparent:true,
          headerStyle: {
            height: 100,
            backgroundColor: theme.colors.light.background,
          },
          headerLeft: ({onPress,canGoBack}) => {
            
            return  canGoBack ? ( <TouchableOpacity 
            style={styles.back}
                 onPress={onPress} >
                <Icon name="long-arrow-left" size={24} color="#000" /> 
            </TouchableOpacity> ) : null
          }  ,
          headerTintColor: theme.colors.light.text.heading,
        }}>

        <Stack.Screen
                  name="Signup_Signin"
                  component={Signup_Signin}
                />
        <Stack.Screen
                name="LoginOptionScreen"
                component={LoginOptionScreen}
              />

      <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
              />

<Stack.Screen
                name="EmailCreate"
                component={EmailCreate}
              />

<Stack.Screen
                name="Info1"
                component={Info1}
              />

          <Stack.Screen
                name="AddIntrestScreen"
                component={AddInterestScreen}
              />




        <Stack.Screen
          name="SignIn"
          component={SignIn}
        />

        <Stack.Screen name="PhoneSignIn" component={PhoneSignIn} />
        <Stack.Screen name="EmailSignIn" component={EmailSignIn} />
        <Stack.Screen name="Wander" component={Wander} />
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({

  back: {
    marginLeft:22,
    padding:14
  }
});

export default SignedOutStack;
