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

function SignIn({ navigation }: Props) {
  return (
    <View style={layout.container}>
       <Video
          source={require("../../assets/images/bg.mp4")}
          style={styles.backgroundVideo}
          muted={true}
          repeat={true}
          resizeMode={"cover"}
          rate={1.0}
          ignoreSilentSwitch={"obey"}
        />
      {/* <Image source={require('../../assets/images/login.gif')} style={{flex:1,resizeMode:'cover',width:Dimensions.get('screen').width,height:Dimensions.get('screen').height}}></Image> */}
      <View style={[layout.main,{position:'absolute',left:0,right:0,bottom:0,marginHorizontal:0,paddingTop:10,paddingBottom:50,borderTopLeftRadius:60,borderTopRightRadius:60}]}>
        {/* HEADING */}
        <View style={[layout.row, {marginTop: 20}]}>
          <View style={[layout.column,]}>
            <Text style={layout.heading}>

              Meet friends you would
            </Text>
            <Text style={layout.heading}>

              have never known
            </Text>
          </View>
        </View>
      
        {/*  Warning */}
        <View style={[layout.row,layout.warningBox]}>
          <View style={layout.column}>
            {/* <Text style={layout.warning}>

              By tapping any button below, you agree to our Terms.
            </Text>
            <Text style={layout.warning}>

              Learn more about how we process your data in our Privacy Policy.
            </Text> */}
          </View>

        </View>
        {/* ACTION BUTTONS */}

        <View style={[layout.column, layout.cta,{width:'70%'}]}>
          <Facebook {...navigation}/>
          <ProviderButton
            style={{backgroundColor: '#0B0E3D'}}
            type="email_new_other"
            onPress={() => navigation.navigate('EmailCreate', { email: "" })}>
            Sign up with email
        </ProviderButton>
        <ProviderButton
            type="email"
            onPress={() => navigation.navigate('PhoneSignIn')}>
            Sign up with mobile number
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
  }

});

export default SignIn;
