import auth from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';
import RangeSlider from 'rn-range-slider'
import {
    Banner,
    Button,
    Divider,
    Paragraph,
    Title,
} from 'react-native-paper';
import Icon from "react-native-vector-icons/FontAwesome5";
import layout from '../../signed-out/layout';
import Hero from '../../components/Hero';
import GlobalTheme from '../../theme'
import CustomButton from '../../components/CustomButton';
import { useProfile } from '../../util/helpers';
import { Profile as ProfileType, Image as ProfileImageType, Location } from '../../entities/profiles/model'
import { updateProfile } from '../../util/firebase';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
// @ts-ignore
import PlacesInput from 'react-native-places-input'
import moment from 'moment'

interface Props {
    navigation: any
}
function AccountDetails({ navigation }: Props) {
    const [editing, setEditing] = useState(false);
    const profile = useProfile()
    const [currentProfile, updateCurrentProfile] = useState<ProfileType | null>(null)

    const saveProfile = async () => {
        setEditing(false)
        await updateProfile(currentProfile!)
    }
    //initialize inputs
    useEffect(() => {
        if (profile) {

            updateCurrentProfile({ ...profile })
        }

    }, [profile])
    // get nearby cities 
    async function getNearbyCitiesFromApiAsync(latitude: any, longitude: any) {
        let $responseStyle = 'short', // the length of the response
            $citySize = 'cities15000', // the minimal number of citizens a city must have
            $radius = 30, // the radius in KM
            $maxRows = 30, // the maximum number of rows to retrieve
            $username = 'venndii'; // the username of your GeoNames account
        try {
            let response = await fetch(
                `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${latitude}&lng=${longitude}&style=${$responseStyle}&cities=${$citySize}&radius=${$radius}&maxRows=${$maxRows}&username=${$username}`
            );
            let json = (await response.json()).geonames.map((city: any) => city.name);
            return json
        } catch (error) {
            console.error(error);
        }
    }

    const onChangeHomeLocation = async (place: Location, top1: any) => {
        //create more top1's nearby.
        let result = await getNearbyCitiesFromApiAsync(place.location.lat, place.location.lng)
        console.log("should be more places here.", top1, result)
        let newTop1Index = [...new Set([...currentProfile!.top1, top1.long_name, ...result])]
        let newProfile: ProfileType = { ...currentProfile!, homeLocation: place, top1: newTop1Index }
        updateCurrentProfile(newProfile)
    }


    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
            <Hero colors={['#15212B', '#15212B']} >
                <TouchableOpacity style={{ position: 'absolute', left: 30 }} onPress={() => { navigation.goBack() }}>
                    <Icon name="chevron-left" color={'grey'} solid size={24} />
                </TouchableOpacity>


            </Hero>
            <View style={[layout.row, layout.header, { marginBottom: 30, alignItems: 'center', justifyContent: 'center', alignContent: 'center', marginTop: 20 }]}>
                <View style={[layout.column, layout.full]}>
                    <Text style={[layout.heading]}>
                        Account Details
    </Text>
                    <View style={[layout.full, { width: 300, justifyContent: 'center', flex: 1, alignContent: 'center', alignSelf: 'center', marginTop: 25 }]}>
                        {editing ? <CustomButton
                            textColor={'#fff'}
                            color={'#0A0F3D'}
                            solid={true}
                            loading={false}
                            onPress={saveProfile}
                            disabled={false}
                        >
                            Save
  </CustomButton>
                            : <CustomButton
                                textColor={'#fff'}
                                color={'#0A0F3D'}
                                solid={true}
                                loading={false}
                                onPress={() => setEditing(true)}
                                disabled={false}
                            >
                                Edit
  </CustomButton>
                        }
                    </View>
                </View>


            </View>

            <View style={[layout.row, layout.firstItemSection, { justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center', paddingHorizontal: 50 }]}>

                <View style={[layout.column]}>
                    <View style={[layout.row, { justifyContent: 'space-between' }]}>
                        <Text style={[styles.text, { color: '#0C1862', fontSize: 16 }]}>
                            First Name
                        </Text>
                    </View>


                    <Text style={[styles.text, { color: "grey", fontSize: 14, marginRight: 10, marginTop: 10, }]}>{'Usama Daood'}</Text>



                </View>

            </View>
            <View style={[layout.row, layout.itemSection, { justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center', paddingHorizontal: 50 }]}>

                <View style={[layout.column]}>
                    <View style={[layout.row, { justifyContent: 'space-between' }]}>
                        <Text style={[styles.text, { color: '#0C1862', fontSize: 16 }]}>
                           Last Name
        </Text>
                    </View>


                    <Text style={[styles.text, { color: "grey", fontSize: 14, marginRight: 10, marginTop: 10, }]}>{'Daood'}</Text>



                </View>

            </View>

            <View style={[layout.row, layout.itemSection, { justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center', paddingHorizontal: 50 }]}>

                <View style={[layout.column]}>
                    <View style={[layout.row, { justifyContent: 'space-between' }]}>
                        <Text style={[styles.text, { color: '#0C1862', fontSize: 16 }]}>
                            Preferred Name
                        </Text>
                    </View>
                    {editing ?
                        <TextInput
                            //  onFocus={handleFocus}
                            //  onBlur={handleBlur}
                            style={[styles.input, { borderBottomColor: '#888888' }]}
                            // mode="outlined"
                            // label="Email Address"
                            placeholder={"Johnny Cash"}
                            //value={currentProfile ? currentProfile!.preferredName : ''}

                            //onChangeText={(txt: string) => updateCurrentProfile({ ...currentProfile!, preferredName: txt })}
                            // theme={inputTheme}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        /> :

                        <Text style={[styles.text, { color: "black", fontSize: 14, marginRight: 10, marginTop: 10, }]}>{currentProfile && currentProfile!.preferredName}</Text>
                    }


                </View>

            </View>


            <View style={[layout.row, layout.itemSection, { justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center', paddingHorizontal: 50 }]}>

                <View style={[layout.column]}>
                    <View style={[layout.row, { justifyContent: 'space-between' }]}>
                        <Text style={[styles.text, { color: '#0C1862', fontSize: 16 }]}>
                            Email
        </Text>
                    </View>

                    <Text style={[styles.text, { color: "grey", fontSize: 14, marginRight: 10, marginTop: 10, }]}>{'Email@gmail.com'}</Text>



                </View>

            </View>
            <View style={[layout.row, layout.itemSection, { justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center', paddingHorizontal: 50 }]}>

                <View style={[layout.column]}>
                    <View style={[layout.row, { justifyContent: 'space-between' }]}>
                        <Text style={[styles.text, { color: '#0C1862', fontSize: 16 }]}>
                            Date of Birth
</Text>
                    </View>

                    <Text style={[styles.text, { color: "grey", fontSize: 14, marginRight: 10, marginTop: 10, }]}>{'30-04-1994'}</Text>



                </View>

            </View>
            <View style={[layout.row, layout.itemSection, { justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center', paddingHorizontal: 50 }]}>

                <View style={[layout.column]}>
                    <View style={[layout.row, { justifyContent: 'space-between' }]}>
                        <Text style={[styles.text, { color: '#0C1862', fontSize: 16 }]}>
                            Phone Number
</Text>
                    </View>

                    <Text style={[styles.text, { color: "grey", fontSize: 14, marginRight: 10, marginTop: 10, }]}>{'+1 2329 99003'}</Text>



                </View>

            </View>
            <View style={[layout.row, layout.itemSection, { justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center', paddingHorizontal: 50 }]}>

                <View style={[layout.column]}>
                    <View style={[layout.row, { justifyContent: 'space-between' }]}>
                        <Text style={[styles.text, { color: '#0C1862', fontSize: 16 }]}>
                            Home Location
                        </Text>
                    </View>
                    {editing ? <>

                        <PlacesInput
                            //placeHolder={currentProfile?.homeLocation.formatted_address}
                            stylesInput={{
                                // backgroundColor:'grey'
                            }}
                            stylesContainer={{
                                position: 'relative',
                                flex: 1,
                                alignSelf: 'stretch',
                                //    width:'90%',
                                //     margin: 0,
                                top: 0,
                                //     left: 0,
                                //     right: 0,
                                //     bottom: 0,

                                marginTop: 0,
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
                                borderColor: '#dedede',
                                borderLeftWidth: 1,
                                borderRightWidth: 1,
                                borderBottomWidth: 1,
                                left: -1,
                                right: -1
                            }}
                            queryFields={`formatted_address,geometry,name,address_components`}
                            googleApiKey={'AIzaSyDcRpn_oyQUNlR4Wy370jCbJ0S0uy3hxqk'}

                            onSelect={(place: any) => {
                                onChangeHomeLocation({ formatted_address: place.result.name, location: place.result.geometry.location },
                                    place['result']['address_components'] ? place['result']['address_components'].find((comp: any) => comp['types'].includes('administrative_area_level_1')) : place['result']['name'])
                            }
                            }

                        />
                    </>
                        :
                        <Text style={[styles.text, { color: "black", fontSize: 14, marginRight: 10, marginTop: 10, }]}>{'Address is in Erth here.'}</Text>
                    }




                </View>

            </View>
            <TouchableWithoutFeedback onPress={() => { navigation.navigate('InviteFriends') }} style={[layout.row, layout.itemSection, { justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', paddingHorizontal: 50 }]}>

                <Text style={[styles.text, { color: '#0C1862', fontSize: 16 }]}>
                    Invite a Friend
</Text>
                <Icon name="arrow-right" color={"#52575D"} solid size={18} />
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    messageIconWrapper: {
        backgroundColor: '#6026BC',
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
    maxWidth: {
        width: '100%',
    },
    content: {
        padding: 16,
    },
    banner: {
        backgroundColor: '#ffebee',
    },
    input: {
        marginTop: 20,
    },
    text: {
        fontFamily: "Open Sans",
        color: "#52575D"
    },
    button: {
        alignSelf: 'center',
        marginVertical: 20,
    },
    actions: {
        backgroundColor: '#F6F7F8',
    },
});

export default AccountDetails