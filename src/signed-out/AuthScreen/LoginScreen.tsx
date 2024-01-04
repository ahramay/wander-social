import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, View, Text,TextInput, Platform} from 'react-native';
import {Button,HelperText} from 'react-native-paper';
import layout from '../../signed-out/layout';
import CustomButton from '../../components/CustomButton';
import firestore from '@react-native-firebase/firestore';
import {AuthCredential, ProfileSetup} from '../../contexts/auth'
import { TouchableOpacity } from 'react-native-gesture-handler';
//@ts-ignore
import referralCodeGenerator from 'referral-code-generator'
import { ProfileService } from '../../entities/profiles/service';
import services from '../../util/Services';
import functions from '../../util/functions';
import { NavigationParams } from 'react-navigation';

interface Props {
  navigation: NavigationParams;
}

function LoginScreen({ navigation }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [authCredential,_] = AuthCredential.useData();
  const [signingUp,setSigningUp] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState<string>('');
  const [help, setHelp] = useState<string>('');
  useEffect(() => {
    if (error) {
      Alert.alert('Sign In - Error', error);
    }
  }, [error]);

  async function attemptSignIn() {

    // navigation.navigate('EmailCreate');
    setLoading(true);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  
    if(email == "" || password == ""){
      Alert.alert("Info","Please Fill the form");
    } else if(reg.test(email) === false){
      // validation for Valid Email
      Alert.alert("Valid Email","Please enter your valid Email.");
    } else {

      try {
        let data = {
          'email': email,
          'password' : password,
          'deviceId': "okay",
          'os': Platform.OS
        };
        console.log("Log,, data " , data);
  
        let response = await services.SignIn(data);
        const statusCode = response.statusCode;
        console.log("Log,, Response " , statusCode);
  
        if(statusCode == "200") {
  
          //Alert.alert("You are signedin Successfully. Thanks");
          navigation.navigate('Info1');
        } else {
          Alert.alert("Wrong Credentials");
        }
  
      } catch (e) {
        console.log("Log error in Signin ", e);
      }

    } // end else block

    
    setLoading(false);
     
    }

  async function createUserProfile(cred:FirebaseAuthTypes.UserCredential) {
    
    await ProfileService.createUserProfile(cred,email)
  }

  async function handleCreate() {
    
    setLoading(true);

    try {
      
      let data = {
        'email': email,
        'password' : password,
        'phoneNumber' : '+099228999487',
        'deviceId': "okay",
        'os': Platform.OS
      };

      console.log("Log,, data " , data);

      let response = await services.Signup(data);
      const statusCode = response.statusCode;
      console.log("Log,, Response Signup " , statusCode);
      
      if(statusCode == "200"){
        
        Alert.alert("You are Created Successfully. Thanks");

      }else {
        Alert.alert("Wrong Credentials");
      
      }

    } catch (e) {
      console.log("Log error in Signin ", e);
    }

    setLoading(false);
    
  }

  function openCreateAccountScreen(){
    navigation.navigate('EmailCreate');
  }

   return  <View style={[layout.container,{justifyContent: 'center', marginBottom: functions.getHeight(10)}]}>
   <View style={[layout.main, {alignItems: 'center'}]}>
   <View style={[{justifyContent:'center', width: functions.getWidth(80)}]}>
   <View style={[layout.row, layout.header, {justifyContent: 'center'}]}>
     <View style={[layout.column,  {justifyContent: 'center'}]}>
       <Text style={[layout.heading, {justifyContent: 'center',}]}>
        Login
       </Text> 
     </View>
   </View>

 <>
 
 <View style={[layout.full,]}>
   <TextInput
     style={styles.input}
     // mode="outlined"
     // label="Email Address"
     placeholder={"Email address"}
     value={email}
     onChangeText={setEmail}
     // theme={inputTheme}
     keyboardType="email-address"
     autoCapitalize="none"
     autoCorrect={false}
   />
   <TextInput
     secureTextEntry
     style={styles.input}
     // mode="outlined"
     // label="Password"
     placeholder={"Password"}
     value={password}
     onChangeText={setPassword}
   // theme={inputTheme}
   />
 </View>
 
 <HelperText type="error" visible={!!help}>
   {help}
 </HelperText>
 <View style={{}}>
   
   <CustomButton
     textColor={'#fff'}
     color={'#0B0E3D'}
     solid={true}
     loading={loading}
     onPress={() => (loading ? null : attemptSignIn())}
     //disabled={!email || !password || !!help}
   >
     {loading ? 'Sign In' : 'Sign In'}
   </CustomButton>
   {/* <TouchableOpacity onPress={() => navigation.navigate('EmailCreate')} >
<Text style={[layout.heading,{fontSize:16,marginTop:5}]}>
        Need to create an account?
       </Text>
</TouchableOpacity> */}
 </View>
 </>
 
 </View>
 </View>
 
 </View>
}


const styles = StyleSheet.create({
  contentArea: {
    
    // overflow: 'hidden',
    // marginBottom: 0,
    // position:'relative',
    flex: 1,
    // alignContent:'center',
    // alignItems:'center',
    // justifyContent: 'center'
    // justifySelf
    // flexDirection:'column',
    // alignSelf:'center',

  },
  input: {
    //borderTopColor: 'transparent',
    borderWidth: 2,
    borderRadius: 85,
    marginVertical: 20,
    fontSize: 14,
    padding: 10,
    paddingHorizontal: 5,
    fontFamily: 'Open Sans',
    // backgroundColor:'white',
    textAlign: 'center',

    // overflow:'hidden'
  },
});

export default LoginScreen;
