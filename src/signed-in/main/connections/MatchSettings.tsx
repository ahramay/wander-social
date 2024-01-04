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
import layout from '../../../signed-out/layout';
import Hero from '../../../components/Hero';
import GlobalTheme from '../../../theme'
import CustomButton from '../../../components/CustomButton';
import { useProfile, useConnections } from '../../../util/helpers';
import { Profile as ProfileType, Image as ProfileImageType, Location } from '../../../entities/profiles/model'
import { updateProfile } from '../../../util/firebase';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ConnectionService } from '../../../entities/connections/service';
import moment from 'moment';
import LikeToggle from './LikeToggle'
import LinearGradient from 'react-native-linear-gradient';
//import { NavigationEvents } from 'react-navigation';
import {myRatings,userRatings} from '../../../util/firebase'
import { userRating } from '../../../entities/connections/model';
import firestore from '@react-native-firebase/firestore'
interface Props {
    navigation: any;
    route: any;

}

function MatchSettings({ route, navigation }: Props) {
    // !ProfileType
    const { otherProfile } = route.params as {otherProfile:ProfileType}
    const profile = useProfile()
    const connections = useConnections()
    const {myratings} = myRatings()
    const {userratings} = userRatings(otherProfile)
    const [userRating,setUserRating] = useState(null) as any
    const [profileRating,setProfileRating] = useState()

    //retrive my rating for this user
    useEffect(() => {
        if(myratings){
            // console.log(myratings,"my ratings??")
            let ratingOfUser = myratings.find(rating => rating.user == otherProfile.uid)
           
            if(ratingOfUser && ratingOfUser.rating !== (userRating && userRating.rating)){
                 console.log('rating of user',ratingOfUser)
               setUserRating(ratingOfUser)
            }
        }
    
    }, [myratings])
//get all ratings for this user.

    const unmatch = async () => {
        if (connections && profile) {
            let connector = new ConnectionService(connections, profile)
            await connector.unmatchUser((otherProfile as ProfileType).uid!)
            navigation.navigate('Dashboard')
        }

    }
    const onLike = () => {
        // can't like them again
        if(userRating && userRating == 1) return

       if(userRating ){
            firestore().collection('ratings').doc(userRating.id).update({rating:1})
       } else {
           //doesn't exist
           firestore().collection('ratings').add({user:otherProfile.uid,rater:auth().currentUser!.uid,rating:1})
       }

       
       
    }

    const onDislike = () => {
        if(userRating && userRating == -1) return

        if(userRating ){
             firestore().collection('ratings').doc(userRating.id).update({rating:-1})
        } else {
            //doesn't exist
            firestore().collection('ratings').add({user:otherProfile.uid,rater:auth().currentUser!.uid,rating:-1})
        }
    }
   
    const getMatchedDate = () => {
        if (connections && profile) {
            let connector = new ConnectionService(connections, profile)
            let connection = connector.connections.connections.find(conn => {
                return conn.user == otherProfile.uid!
            })
            console.log("conn", connection)
            return moment(new Date(connection!.at.toDate())).format('DD/MM/yy')
        }
        return ''
    }
    return <>
        <Hero colors={['#15212B', '#15212B']} >
            <TouchableOpacity style={{ position: 'absolute', left: 30 }} onPress={() => { navigation.goBack() }}>
                <Icon name="chevron-left" color={'grey'} solid size={24} />
            </TouchableOpacity>


        </Hero>

        <View style={[layout.row, layout.header, { marginBottom: 30, alignItems: 'center', justifyContent: 'center', alignContent: 'center', marginTop: 50 }]}>
            <View style={[layout.column, layout.full]}>
            <Text style={[styles.text, { fontSize: 12, color: 'grey', textAlign: 'center' }]}>
                            50% of users like this user
                        </Text>
                <Text style={[layout.heading, { fontSize: 20 }]}>
                    {otherProfile && otherProfile.firstName}
                </Text>
                <View style={[layout.full, { justifyContent: 'center', alignContent: 'center', alignSelf: 'center', marginTop: 15 }]}>
                    <View style={{marginBottom:50}}>
                        <Text style={[styles.text, { fontSize: 12, color: 'grey', textAlign: 'center' }]}>
                            Matched on {getMatchedDate()}
                        </Text>
                    </View>

                 <LikeToggle onLike={onLike} onDislike={onDislike} like={userRating && userRating.rating == 1} dislike={userRating && userRating.rating == -1}></LikeToggle>
                </View>

            </View>


        </View>

        <View style={[styles.info, { paddingHorizontal: 0 }]}>
            {/*  LONG ROW BUTTONS */}
            <TouchableOpacity activeOpacity={.8} style={[layout.row, layout.firstItemSection, { justifyContent: 'center', alignContent: 'center', alignItems: 'center' }, layout.full,{borderTopColor:'#ad1457'}]}>

                <View style={[layout.row, { justifyContent: 'center', alignItems: 'center' }]}>
                    <Text style={[styles.text, { textAlign: 'center', color: '#ad1457', fontSize: 16 }]}>
                        Unmatch
                        </Text>
                </View>

            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.8} onPress={()=> navigation.navigate('ReportUser',{otherProfile:otherProfile})} style={[layout.row, layout.itemSection, { justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor:'#ad1457' }, layout.full]}>

                <View style={[layout.row, { justifyContent: 'center', alignItems: 'center' }]}>
                    <Text style={[styles.text, { textAlign: 'center', color: 'white', fontSize: 16 }]}>
                        Report User
        </Text>
                </View>

            </TouchableOpacity>
        </View>
    </>

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
    info: {
        flex: 1,
        zIndex: 1,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'column',

        width: '100%',
        paddingVertical: 30,
        paddingHorizontal: 20,
        // borderRadius: 8,




        // marginTop
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

export default MatchSettings