import React, { Fragment, useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ViewStyle, Animated ,Alert, Platform,ScrollView, TextInput, Image} from 'react-native';
import { TouchableOpacity, TapGestureHandler} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useCountRenders } from '../../util/performance';
import layout from '../../signed-out/layout';
import { NavigationParams } from 'react-navigation';

import AnimatedToggle, { selectedOptions } from '../../components/AnimatedToggle';
import GlobalTheme from '../../theme'
import { Profile as ProfileType, Image as ProfileImageType, Location } from '../../entities/profiles/model'
import CustomButton from '../../components/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import { useProfile } from '../../util/firebase';
import { searchPhoneNumbersInText } from 'libphonenumber-js';
// @ts-ignore
import PlacesInput from 'react-native-places-input'
import { TextInputMask } from 'react-native-masked-text'
import GenderSelect, { GenderType } from '../../components/genderSelect';
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import { ProfileService } from '../../entities/profiles/service';
import moment from 'moment';
import services from '../../util/Services';


interface Props {
    finished:(dataObject:any) => void;
    navigation: NavigationParams;
}
function Info1 ({finished, navigation}:Props) {
    const BirthdayField = useRef(null) as any
    const [spinnerloading, setLoading] = useState<boolean>(false);
    const [lastName,setLastName] = useState('')
    const [firstName,setFirstName] = useState('')
    const [preferredName,setPreferredName] = useState('')
    const [dob,setDob] = useState('19951220') 
    const [referralCode, setReferralCode] = useState('')
    const [gender,setGender] = useState('')
    //const {profile,loading,error} = useProfile()
    const [locationSet,updateLocationSet] = useState(false)
    const [currentProfile, updateCurrentProfile] = useState<ProfileType | null>(null)
    const [preferredSexes,setPreferredSexes] = useState([GenderType.F])
    const genderSelected = (selectedOption:GenderType) => {
        console.log(selectedOption,"boom!")
        if(selectedOption == GenderType.M) {
          setGender('M')
        } else if (selectedOption == GenderType.F)  {
          setGender('F')
        } else {
          setGender('A')
        }
      
      }

    //  useEffect(()=>{
        
    //  },[loading])
 
    const submit = async () => {
        //save info to user profile.
        // nextStep
        console.log("Log. pressing in info other ?");
        //navigation.navigate("AddIntrestScreen");
        // if(referralCode.length > 1) {
        //   await ProfileService.addReferral(referralCode)
        // }
        // finished({...currentProfile,firstName,lastName,dob:moment(dob).toDate(),gender,preferredName,desiredSex:preferredSexes.map(s => GenderType[s])});


        let data = {
          'defaultLanguage': "English",
          'dob' : dob,
          'firstName' : firstName,
          'lastName': lastName,
          "gender" : gender,
          "height" : "",
          "showProfile" : "showProfile",
          "prefferedName" : preferredName,
          "hosting" : "",
          "maximumDistance" : "",
          'os': Platform.OS
        };


        let response = await services.UpdateProfile(data);
          const statusCode = response.statusCode;
          console.log("Log,, Response Signup " , response);



      }

//     async function getNearbyCitiesFromApiAsync(latitude: any, longitude: any) {
//       let $responseStyle = 'short', // the length of the response
//           $citySize = 'cities15000', // the minimal number of citizens a city must have
//           $radius = 30, // the radius in KM
//           $maxRows = 30, // the maximum number of rows to retrieve
//           $username = 'venndii'; // the username of your GeoNames account
//       try {
//           let response = await fetch(
//               `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${latitude}&lng=${longitude}&style=${$responseStyle}&cities=${$citySize}&radius=${$radius}&maxRows=${$maxRows}&username=${$username}`
//           );
//           let json = (await response.json()).geonames.map((city: any) => city.name);
//           return json
//       } catch (error) {
//           console.error(error);
//       }
//   }

//   const onChangeHomeLocation = async (place: Location, top1: any) => {
//     //create more top1's nearby.
//     let result = await getNearbyCitiesFromApiAsync(place.location.lat, place.location.lng)
//     console.log("should be more places here.", top1, result)
//     let newTop1Index = [...new Set([top1.long_name, ...result])]
//     let newProfile: ProfileType = { ...currentProfile!, homeLocation: place, top1: newTop1Index }
//     updateCurrentProfile(newProfile)
//     updateLocationSet(true);
// }

return <View style={[{marginTop: 100,justifyContent:'center',flex:1,margin:0,padding:0}]}>

  <ScrollView showsVerticalScrollIndicator={false}  keyboardShouldPersistTaps="always" style={[styles.main]}>

    <View style={[layout.row, layout.header,{marginBottom:30,alignItems:'center',justifyContent:'center',alignContent:'center'}]}>
    <View style={[layout.column]}>
      <Text style={[layout.heading]}>
        Tell us about yourself
      </Text>
    </View>
  </View>

    <View style={[layout.column,{marginVertical:20}]}>
    <Text style={[styles.hFour, { paddingLeft: 50}]}>
      First Name
    </Text>
    <TextInput
    //  onFocus={handleFocus}
    //  onBlur={handleBlur}
      style={[styles.input,{borderBottomColor :'#888888', paddingLeft: 50}]}
      // mode="outlined"
      // label="Email Address"
      placeholder={"Johnny Cash"}
      value={firstName}

      onChangeText={setFirstName}
      // theme={inputTheme}
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
    />
    </View>
    <View style={[layout.column,{marginVertical:20, }]}>
    <Text style={[styles.hFour, {paddingLeft: 50}]}>
      Last Name
    </Text>
    <TextInput
    //  onFocus={handleFocus}
    //  onBlur={handleBlur}
      style={[styles.input,{borderBottomColor :'#888888', paddingLeft: 50 }]}
      // mode="outlined"
      // label="Email Address"
      placeholder={"Johnny Cash"}
      value={lastName}

      onChangeText={setLastName}
      // theme={inputTheme}
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
    />
    </View>

    <View style={[layout.column,{marginVertical:20}]}>
    <Text style={[styles.hFour, {paddingLeft: 50}]}>
      Preferred Name
    </Text>
    <TextInput
    //  onFocus={handleFocus}
    //  onBlur={handleBlur}
      style={[styles.input,{borderBottomColor :'#888888', paddingLeft: 50 }]}
      // mode="outlined"
      // label="Email Address"
      placeholder={"Johnny Cash"}
      value={preferredName}

      onChangeText={setPreferredName}
      // theme={inputTheme}
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
    />
    </View>

    <View style={[layout.column,{marginVertical:20}]}>
    <Text style={[styles.hFour,{marginBottom:10, paddingLeft: 50}]}>
      When were you born? (YYYY/MM/DD)
    </Text>

    {/* <TextInput
      // onFocus={handleFocus}
      // onBlur={handleBlur}
      value={age.toString()}
      style={[styles.input,{borderBottomColor : '#888888' }]}
      keyboardType="numeric"
      onChangeText={(val) => setAge(Number(val))}
    />
     */}
   <TextInputMask
   style={{paddingLeft: 50}}
  type={'datetime'}
  options={{
    format: 'YYYY/MM/DD'
  }}
  value={dob}
  onChangeText={text => {
   setDob(text)
  }}
  ref={(ref) => BirthdayField.current = ref}
/>
    </View>
   
    <View style={[layout.column,{marginVertical:20}]}>
    <Text style={[styles.hFour, {paddingLeft: 50}]}>
      What do you identify as?
    </Text>
      <GenderSelect multi={false} genderSelected={genderSelected} gendersSelected={()=>{}} />
      </View>

      <View style={[layout.column,{marginVertical:20}]}>
    <Text style={[styles.hFour,{paddingLeft: 50}]}>
      Connect With
    </Text>
      <GenderSelect multi={true} genderSelected={genderSelected} gendersSelected={(sexes:GenderType[])=>{ setPreferredSexes(sexes)}} />
      </View>

      <View style={[layout.column,{marginVertical:20}]}>
    <Text style={[styles.hFour, {paddingLeft: 50}]}>
      Home Location
    </Text>

      </View>

      <PlacesInput
                                    placeHolder={currentProfile?.homeLocation && currentProfile?.homeLocation.formatted_address || 'Toronto,On'}
                                    stylesInput={{
                                        // backgroundColor:'grey'
                                        paddingRight:70,
                                        paddingLeft: 50
                                    }}
                                    stylesContainer={{
                                        position: 'relative',
                                        flex: 1,
                                        // zIndex:9999,
                                        paddingRight:10,
                                        alignSelf: 'stretch',
                                        //    width:'90%',
                                        //     margin: 0,
                                        top: 0,
                                        //     left: 0,
                                        //     right: 0,
                                        //     bottom: 0,
                                        marginLeft:-9,
                                        marginTop: 0,
                                        paddingLeft:0,
                                        shadowOpacity: 0,
                                        elevation: 0,
                                        borderBottomWidth: 1,
                                        borderBottomColor: '#dedede',
                                        //     borderColor: '#dedede',
                                        //     borderWidth: 1,
                                        //     marginBottom: 10
                                    }}
                                    stylesList={{
                                        top: 50,
                                        // zIndex:999,
                                        borderColor: '#dedede',
                                        backgroundColor:'white',
                                        borderLeftWidth: 1,
                                        borderRightWidth: 1,
                                        borderBottomWidth: 1,
                                        color:'black',
                                        left: -1,
                                        right: -1
                                    }}
                                    queryFields={`formatted_address,geometry,name,address_components`}
                                    googleApiKey={'AIzaSyDcRpn_oyQUNlR4Wy370jCbJ0S0uy3hxqk'}

                                    // onSelect={(place: any) => { 
                                    //     onChangeHomeLocation({ formatted_address: place.result.name, location: place.result.geometry.location }, 
                                    //         place['result']['address_components'] ? place['result']['address_components'].find((comp: any) => comp['types'].includes('administrative_area_level_1')): place['result']['name']) }
                                    //     }
                                    
                                />

<View style={[layout.column,{marginVertical:20}]}>
    <Text style={[styles.hFour,{paddingLeft: 50}]}>
      Do you have a referral code?
    </Text>
    <TextInput
    //  onFocus={handleFocus}
    //  onBlur={handleBlur}
      style={[styles.input,{borderBottomColor :'#888888', paddingLeft: 50 }]}
      // mode="outlined"
      // label="Email Address"
      placeholder={"Johnny Cash"}
      value={referralCode}

      onChangeText={setReferralCode}
      // theme={inputTheme}
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
    />
    </View>
      {/* sdas */}
     
  
    
    
</ScrollView>
<LinearGradient colors={['rgba(255,255,255,1)', 'rgba(255,255,255,.55)', 'rgba(255,255,255,0.7189250700280112)']} style={styles.info}>
    <View style={[layout.full]}>
    <CustomButton
      textColor={'#fff'}
      color={'#0A0F3D'}
      solid={true}
      loading={false}
      onPress={submit}
      //disabled={!firstName || !lastName || !gender || !locationSet || !preferredName}
    >
      {/* {!firstName || !lastName || !gender || !locationSet || !preferredName ? 'Fill out your information' : 'Continue'} */}
      { 'Continue'}
    
    </CustomButton>
    </View>
    </LinearGradient>
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
  main: {
    paddingTop: 0,
    padding:0,
    flex: 1,
    position: 'relative',
    marginBottom: 125,
    width:'100%'
}, 
  hFour: {
    fontSize: 14,
    // marginHorizontal:28,
    fontFamily: 'Montserrat',
    color: 'grey'
  },
  actionText: {
      textAlign:'center',
    fontSize: 12,
    fontFamily: 'Montserrat',
    color: 'blue',
    textDecorationLine: 'underline'
  },
  info: {
    flex: 1,
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    height: 125,
    width: '100%',
    paddingTop: 30,
    paddingHorizontal: 20,
    // borderRadius: 8,




    // marginTop
},
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    marginBottom:10
},
image: {
    flex: 1,
    height: undefined,
    width: undefined
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
  inputBox : {
    // borderTopColor: 'transparent',
    // borderLeftWidth: 0,
    // borderRightWidth: 0,
    minHeight:100,
    marginVertical: 20,
    fontSize: 14,
    padding: 10,
    paddingHorizontal: 5,
    fontFamily: 'Open Sans',
    // backgroundColor:'white',
    borderColor: '#888888',
    borderWidth: .3,
    borderRadius:8,
    // overflow:'hidden'
  },
})

export default Info1

