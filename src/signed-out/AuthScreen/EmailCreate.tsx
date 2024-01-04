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
import { NavigationParams } from 'react-navigation';
import services from '../../util/Services';
import functions from '../../util/functions';

interface Props {
    navigation: NavigationParams;
  }

function EmailCreate({ navigation, route }: Props) {
    //let itemId  = route.params.email;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [authCredential,_] = AuthCredential.useData();
    const [signingUp,setSigningUp] = useState(false)
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState<string>('');
    const [help, setHelp] = useState<string>('');
    
     /* 2. Get the param */
  
    // useEffect(() => {
    //   // if (email.length) {
    //     setEmail(itemId);  
    //     console.log("log  email okaok", itemId);
    //   // } 
    // }, [email]);

     async function handleCreate() {

      setLoading(true);

      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  
    if(email == ""){
      Alert.alert("Info","Email is required.");
    } else if(reg.test(email) === false){
      // validation for Valid Email
      Alert.alert("Valid Email","Please enter your valid Email.");
    } else if(password == ""){
      Alert.alert("Info","Password is required.");
    }   
    else if(confirm == ""){
      Alert.alert("Password","Please enter the confirm password.");    
    }
    else if(password.length < 6){
      Alert.alert("Password","Password should be atleast 6 characters.");    
    }
    else if(password != confirm){
      Alert.alert("Info","Password did not matched.");    
    }
   
    else {
        try {
      
          let data = {
            'email': email,
            'password' : password,
            'phoneNumber' : '+9898 ' + Math.floor(Math.random() * 10000000) + 1,
            'deviceId': "okay",
            'os': Platform.OS
          };
    
          console.log("Log,, data " , ('+92340' ) ,Math.floor(Math.random() * 10000000) + 1);
    
          let response = await services.Signup(data);
          const statusCode = response.statusCode;
          console.log("Log,, Response Signup " , response);
          
          if(statusCode == "200"){
            
            //Alert.alert("You are Created Successfully. Thanks");
            navigation.navigate('Info1');

          }else {
            
            const msg = response.message;
            Alert.alert('', msg);
          }
    
        } catch (e) {
          console.log("Log error in Signin ", e);
        }


        setLoading(false);
      
     }
    }

    // useEffect(() => {
       
    //   }, [error]);

    
        return <View style={[ styles.contentArea,{justifyContent: 'center', marginLeft: 15, marginRight: 15}]}>
         <View style={[layout.row, layout.header]}>
           <View style={layout.column}>
             <Text style={layout.heading}>
              Let's create your account.
             </Text>
           </View>
         </View>
     
       <>
       
       <View style={[layout.full]}>
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
         <TextInput
           secureTextEntry
           style={styles.input}
           // mode="outlined"
           placeholder={"Confirm Password"}
           // label="Confirm Password"
           value={confirm}
           onChangeText={setConfirm}
         // theme={inputTheme}
         />
       </View>
       
       <HelperText type="error" visible={!!help}>
         {help}
       </HelperText>
       <View style={[layout.full, layout.cta]}>
         
         <CustomButton
           textColor={'#fff'}
           color={'#1B1464'}
           solid={true}
           //loading={loading}
           onPress={() => ( handleCreate())}
          // disabled={!email || !password || !confirm}
         >
           {loading ? 'Creating Account' : 'Create Account'}
         </CustomButton>
    
        
       </View>
       </>
       
       
       
       </View>
       

       

}

const styles = StyleSheet.create({
    contentArea: {
      marginTop: 10,
      // overflow: 'hidden',
      // marginBottom: 0,
      // position:'relative',
      flex: 1,
      
      // alignContent:'center',
      alignItems:'center',
      // justifyContent: 'center'
      // justifySelf
      // flexDirection:'column',
      // alignSelf:'center',
  
    },
    input: {
      borderTopColor: 'transparent',
      borderLeftWidth: 0,
      borderRightWidth: 0,
      marginVertical: 20,
      fontSize: 14,
      padding: 10,
      paddingHorizontal: 5,
      fontFamily: 'Open Sans',
      // backgroundColor:'white',
      borderBottomColor: '#888888',
      borderBottomWidth: .3
      // overflow:'hidden'
    },
  });
  
  export default EmailCreate;
  