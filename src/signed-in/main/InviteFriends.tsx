import auth from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View, Text, TouchableOpacity, TextInput, Clipboard } from 'react-native';
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

interface Props {
    navigation: any
}

function InviteFriends({ navigation }: Props) {
    const [referrals, setReferrals] = useState([])
    const profile = useProfile()


    useEffect(() => {
        if (!referrals.length) {
            if (profile?.referrals) {
                setReferrals([...profile!.referrals] as any)
            }

        }
    }, [profile])

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
                        Invite a Friend
    </Text>
                    <View style={[layout.full, { width: 300, justifyContent: 'center', flex: 1, alignContent: 'center', alignSelf: 'center', marginTop: 25 }]}>
                        <View>
                            <CustomButton
                                textColor={'#fff'}
                                color={'#0A0F3D'}
                                solid={true}
                                loading={false}
                                onPress={() => profile && Clipboard.setString(profile.referralCode)}
                                disabled={false}
                            >
                                {profile ? profile.referralCode : ''}
                            </CustomButton>
                            <Text style={[styles.text, { fontSize: 12, color: 'grey', textAlign: 'center' }]}>
                                Your referral code
                        </Text>
                        </View>
                    </View>
                </View>


            </View>

            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, marginTop: 10 }}>
                <Text style={[styles.text, { fontSize: 14, color: 'black', textAlign: 'center' }]}>
                    Referrals
                        </Text>
                <Text style={[styles.text, { fontSize: 14, color: 'grey', textAlign: 'center' }]}>
                    0
                        </Text>
            </View>

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

export default InviteFriends