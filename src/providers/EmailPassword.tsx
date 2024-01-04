import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, View, Text,TextInput} from 'react-native';
import {Button,HelperText} from 'react-native-paper';
import layout from '../signed-out/layout';
import CustomButton from '../components/CustomButton';
import firestore from '@react-native-firebase/firestore';
import {AuthCredential, ProfileSetup} from '../contexts/auth'
import { TouchableOpacity } from 'react-native-gesture-handler';
//@ts-ignore
import referralCodeGenerator from 'referral-code-generator'
import { ProfileService } from '../entities/profiles/service';
function EmailPassword() {
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
    if (!email || !password) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      switch (e.code) {
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/user-disabled':
          setError('This account has been disabled.');
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError('No user found or wrong password.');
          break;
        default:
          console.error(e);
          break;
      }
      setLoading(false);
    }
  }

  async function createUserProfile(cred:FirebaseAuthTypes.UserCredential) {
    
    await ProfileService.createUserProfile(cred,email)
  }

  async function handleCreate() {
    
    setLoading(true);

    try {
      
      // setError('');
      // let cred = await auth().createUserWithEmailAndPassword(email,password)
      // await createUserProfile(cred)
      
      // auth().currentUser?.updateEmail(email)
      // auth().currentUser?.sendEmailVerification().then(val =>{},err => {console.log("error ?",err)})
   
     
      console.log("operation complete stack value should change")
     

    } catch (e) {
      switch (e.code) {
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/user-disabled':
          setError('This account has been disabled.');
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError('No user found or wrong password.');
          break;
        default:
          console.error(e);
          break;

  }
 
    }
    setLoading(false);
  }


  function link() {
    return <View style={[ styles.contentArea,{justifyContent:'flex-start'}]}>
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
       disabled={!email || !password || !confirm || !!help}
     >
       {loading ? 'Creating Account' : 'Create Account'}
     </CustomButton>

    
   </View>
   </>
   
   
   
   </View>
   }

   function signIn() {
    return <View style={[styles.contentArea,{justifyContent:'flex-start'}]}>
     <View style={[layout.row, layout.header]}>
       <View style={layout.column}>
         <Text style={layout.heading}>
          Sign in with your email.
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
       onPress={() => (loading ? null : attemptSignIn())}
       disabled={!email || !password || !!help}
     >
       {loading ? 'Sign In' : 'Sign In'}
     </CustomButton>
     <TouchableOpacity onPress={() => setSigningUp(true)} >
<Text style={[layout.heading,{fontSize:16,marginTop:5}]}>
          Need to create an account?
         </Text>
</TouchableOpacity>
   </View>
   </>
   
   
   
   </View>
   }

  return <View style={[ { justifyContent: 'flex-start' }]}>
    {signingUp ? link() : signIn()}
  </View>
}


const styles = StyleSheet.create({
  contentArea: {
    marginTop: 30,
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

export default EmailPassword;
