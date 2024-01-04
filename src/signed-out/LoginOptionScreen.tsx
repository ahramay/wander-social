import React, { Fragment } from 'react';
import { StyleSheet, View, Dimensions, Text, Image } from 'react-native';
import { Button, Theme, withTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationParams } from 'react-navigation';
import Hero from '../components/Hero';
import ProviderButton from '../components/ProviderButton';
import EmailPassword from '../providers/EmailPassword';
import Facebook from '../providers/Facebook';
import theme from '../theme'
// @ts-ignore
import Video from "react-native-video";
import layout from './layout';
interface Props {
  navigation: NavigationParams;
}

function LoginOptionScreen({ navigation }: Props) {
    return (
      <View style={[layout.container, {justifyContent: 'center'}]}>
        <View style={[{justifyContent: 'center'},layout.main,]}>
          {/* HEADING */}
          <View style={[layout.row, {justifyContent: 'center', marginBottom: 40}]}>
            <View style={layout.column}>
            <Text style={layout.heading}>
               Login
              </Text>
            </View>
          </View>
        
         
          {/* ACTION BUTTONS */}
  
          <View style={[layout.column, layout.cta,{width:'100%', justifyContent:'center'}]}>
          <Facebook {...navigation}/>
          <ProviderButton

            type="phone"
            onPress={() => navigation.navigate('PhoneSignIn')}>
            Sign in with phone number
        </ProviderButton>
        <ProviderButton
            type="email"
            onPress={() => navigation.navigate('LoginScreen')}>
            Sign in with Email
        </ProviderButton>
        </View>


  
        </View>
      </View>
  
  
  
    );
  }
  let deviceHeight = Dimensions.get('window').height
  const { width, height } = Dimensions.get("window");
  const styles = StyleSheet.create({
  
    carousel: {
      // alignItems:'center'
      marginVertical: 30
    },
    backgroundVideo: {
      height: height,
      position: "absolute",
      top: 0,
      left: 0,
      alignItems: "stretch",
      bottom: 0,
      right: 0
    },
    image: {
      // width:300
      height: deviceHeight * .32,
      marginRight: 30
    },
     view_layout:{
    },
    
  
  });
  
  export default LoginOptionScreen;
  