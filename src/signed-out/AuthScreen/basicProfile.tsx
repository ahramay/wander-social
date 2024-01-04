import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, View, Text,TextInput} from 'react-native';
import {Button,HelperText} from 'react-native-paper';
import layout from '../../signed-out/layout';
import CustomButton from '../../components/CustomButton';
import firestore from '@react-native-firebase/firestore';
import {AuthCredential, ProfileSetup} from '../../contexts/auth'
import { TouchableOpacity } from 'react-native-gesture-handler';
//@ts-ignore
import referralCodeGenerator from 'referral-code-generator'
import { ProfileService } from '../../entities/profiles/service';

function EmailCreate() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [authCredential,_] = AuthCredential.useData();
    const [signingUp,setSigningUp] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState<string>('');
    const [help, setHelp] = useState<string>('');
    
     async function handleCreate() {
        
     }

    useEffect(() => {
        if (error) {
          Alert.alert('Sign In - Error', error);
        }
      }, [error]);

    
        return <View style={[ styles.contentArea,{justifyContent: 'center', marginLeft: 15, marginRight: 15}]}>
         <View style={[layout.row, layout.header]}>
           <View style={layout.column}>
             <Text style={layout.heading}>
              Let's create your account
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
           loading={loading}
           onPress={() => (loading ? null : handleCreate())}
           disabled={!email || !password || !confirm}
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
  