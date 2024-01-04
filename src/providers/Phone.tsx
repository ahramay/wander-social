import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import libPhoneNumber, {parsePhoneNumberFromString} from 'libphonenumber-js';
import React, {Fragment, useRef, useState, useEffect} from 'react';
import {Alert, StyleSheet, View, Text} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import CountryPicker, {
  Country,
  getAllCountries
} from 'react-native-country-picker-modal';
import {Button, Paragraph, TextInput } from 'react-native-paper';
import CustomButton from '../components/CustomButton';
import layout from '../signed-out/layout';
import  { AuthCredential } from '../contexts/auth'
import { NavigationParams } from 'react-navigation';

type ConfirmationRef =
  | ((verificationCode: string) => Promise<FirebaseAuthTypes.User | null>)
  | null;

const countryKeys = getAllCountries().map(country => country.cca2);

function Phone(navigation) {
  const [loading, setLoading] = useState(false);
  const [authCredential, setAuthCredential] = AuthCredential.useData()
  const pickerRef = useRef<CountryPicker>();
  const verificationId = useRef<string|null>('')
  const confirmationRef = useRef<ConfirmationRef>(null);
  const [number, setNumber] = useState('+1');
  const [verification, setVerification] = useState('');
  // 
  useEffect(() => {
    if (verification.length) {
      // verifcation filled in
      // handleVerification({ navigation }: Props)
      navigation.navigate('EmailCreate', { email: "" });
    } 
  }, [verification]);
  // @ts-ignore
  const [country, setCountry] = useState<Country>({
    cca2: 'US',
    callingCode: '1',
    name: 'United States',
  });

  async function handlePhoneAuth() {
    //console.log("Log. val " + number);
    !isValid()
    if(!isValid()){
        Alert.alert("Please Enter valid Phone Number");
    } else {
      if (!loading && confirmationRef) {
        setLoading(true);
        try {
          const result = await auth().signInWithPhoneNumber(number);
          verificationId.current = result.verificationId
          confirmationRef.current = result.confirm.bind(result);
        } catch (error) {
          confirmationRef.current = null;
          console.log("Log error ", error.message);
          Alert.alert('Phone Auth Error', error.message);
        } finally {
          setLoading(false);
        }
  
    }
      // Alert.alert('verify','Okay Verified');
    }
  }

  function handleModal() {
    if (pickerRef && pickerRef.current) {
        try{
          pickerRef.current.openModal();
        }catch(c){

        }

    
      }
  }

  function handleNumber(text: string) {
    const parsed = new libPhoneNumber.AsYouType().input(text);
    setNumber(parsed);
  }

  function isValid() {
    const phoneNumber = parsePhoneNumberFromString(number, country.cca2);
    if (phoneNumber) {
      return phoneNumber.isValid();
    }

    return false;
  }

  async function handleVerification() {
    if (!loading && confirmationRef.current) {
      setLoading(true);
      // try {

      //    // Persist Phone Auth Credential for reauthentication when completing third party linking
      //   //see error code 'auth/requires-recent-authentication' for more information on the necessity of this step
      //   const credential = auth.PhoneAuthProvider.credential(verificationId.current,verification)
      //   await confirmationRef.current(verification);
        
      //   //all gucci persist phoneAuthCredential
      //  await setAuthCredential(credential)
       
      //   confirmationRef.current = null;
      // } catch (error) {
      //   Alert.alert('Phone Verification Error', error.message);
      // } finally {
      //   setLoading(false);
      // }

      console.log("Log  Oky  vv ", confirmationRef.current);
    }
  }

  return confirmationRef.current ? (
    <Fragment>
        {/* HEADING */}
        <View style={[layout.row, layout.header]}>
          <View style={layout.column}>
            <Text style={layout.heading}>
              Verify your number
            </Text>
          </View>
        </View>
                {/* WORD BOX - GUIDE */}
                <View style={[layout.row, layout.wordBox]}>
          <View style={layout.column}>
            <Text style={layout.info}>
            If it doesn’t happen automatically, enter
            </Text>
            <Text style={layout.info}>
            the 6 digit code we just sent you to verify 
            </Text>
            <Text style={layout.info}>
            your account
            </Text>
            
          </View>
        </View>
      {/* <TextInput
        keyboardType="number-pad"
        mode="outlined"
        label="Verification Code"
        value={verification}
        onChangeText={setVerification}
      /> */}
      <View style={[styles.otpInput]}>
      <OTPInputView
    pinCount={6}
    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
    // onCodeChanged = {code =>  setVerification(code)}
    autoFocusOnLoad
    codeInputFieldStyle={styles.underlineStyleBase}
    codeInputHighlightStyle={styles.underlineStyleHighLighted}
    onCodeFilled = {(code => {
      console.log("Log okay " + code);
      setVerification(code)
    })}
/>
      </View>
    

    </Fragment>
  ) : (
    <Fragment>
       {/* HEADING */}
       <View style={[layout.row, layout.header]}>
          <View style={layout.column}>
            <Text style={layout.heading}>
              What's your number?
            </Text>
          </View>
        </View>
        {/* WORD BOX - GUIDE */}
        <View style={[layout.row, layout.wordBox]}>
          <View style={layout.column}>
            <Text style={layout.info}>
            Whether you’re creating an account or 
            </Text>
            <Text style={layout.info}>
            signing back, let’s start with your number.
            </Text>
            
          </View>
        </View>
      <View style={styles.picker}>
        <CountryPicker
          ref={pickerRef}
          filterable
          hideAlphabetFilter
          countryList={countryKeys}
          cca2={country.cca2}
          onChange={value => {
            setCountry(value);
            setNumber(`+${value.callingCode}`);
          }}
          closeable
          onClose={() => null}
        />
      </View>

      <Paragraph style={styles.paragraph}>
        Select phone number country:
      </Paragraph>
      <Button style={styles.button} mode="outlined" onPress={handleModal}>
        {`${country.name} ( +${country.callingCode} )`}
      </Button>


      <View style={[layout.full,styles.paragraphSpacing]}>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        mode="flat"
        // label="Phone Number"
        selectionColor={'#888888'}
        value={number}
        onChangeText={handleNumber}
      />

      </View>
   
      {/*  Warning */}
      <View style={[layout.row,layout.warningBox]}>
          <View style={layout.column}>
            <Text style={layout.warning}>

              By tapping any button below, you agree to our Terms.
            </Text>
            <Text style={layout.warning}>

              Learn more about how we process your data in our Privacy Policy.
            </Text>
          </View>

        </View>
      <View style={[layout.full,layout.cta]}>
          <CustomButton  
        textColor={'#fff'}
        color={'#0A0F3D'}
        solid={true}
        //disabled={!isValid()}
        loading={loading}
        onPress={() => (loading ? null : handlePhoneAuth())}>
          Submit
        </CustomButton>
      </View>

    </Fragment>
  );
}

const styles = StyleSheet.create({
  phoneCountry: {
    flexDirection: 'row',
    marginRight: 10,
    position: 'relative',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 5,
  },
  paragraphSpacing:{
    marginBottom:25
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },
otpInput: {
  height:60,
  width:'80%'
},
  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  input: {
    borderTopColor:'transparent',
    borderLeftWidth:0,
    borderRightWidth:0,
    backgroundColor:'white',
    borderBottomColor:'#888888',
    overflow:'hidden'
  },
  phoneCountryCode: {
    marginTop: 5,
    marginLeft: 5,
  },
  paragraph: {
    fontFamily: 'OpenSans',
    marginBottom: 5,
  },
  button: {
    marginBottom: 20,
  },
  picker: {
    height: 0,
    opacity: 0,
  },
  submit: {
    marginTop: 20,
  },
});

export default Phone;
