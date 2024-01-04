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
import LinearGradient from 'react-native-linear-gradient';
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
interface Props {
    navigation: any;
    route: any;

}
interface Report {
    at:any;
    reporter:string;
    description:string;
    complaints:string[]
}
interface UserReport {
    reports:Report[]
}

function ReportUser({ route, navigation }: Props) {
    // !ProfileType
    const { otherProfile } = route.params
    const profile = useProfile()
    const connections = useConnections()
    const [complaint, setComplaint] = useState('')
    const [selectedComplaints, setSelectedComplaints] = useState([]) as any;
    const [submitting,setSubmitting] = useState(false);
    const [showThankYou,setShowThankYou] = useState(false);
    useEffect(() => {

    }, [otherProfile])

    const addComplaintType = (complaintType: string) => {
        if (selectedComplaints.includes(complaintType)) {
            setSelectedComplaints([...(selectedComplaints.filter((comp: string) => comp !== complaintType))])
        } else {
            setSelectedComplaints([...selectedComplaints, complaintType])
        }

    }
    const uploadReport = async () => {
        setSubmitting(true)
        try {
            await firestore().collection('user-reports').doc(otherProfile.uid).update({reports : firestore.FieldValue.arrayUnion({
                at:new Date(),
                reporter:auth().currentUser!.uid,
                description:complaint,
                complaints:selectedComplaints
            })})
        } catch (e) { 
            console.log("error uploading report",e)
        }
        setShowThankYou(true)
        setSubmitting(false)
        
      
    }

    return <>
        <Hero colors={['#15212B', '#15212B']} >
            <TouchableOpacity style={{ position: 'absolute', left: 30 }} onPress={() => { navigation.goBack() }}>
                <Icon name="chevron-left" color={'grey'} solid size={24} />
            </TouchableOpacity>


        </Hero>

        <View style={[layout.row, layout.header, { marginBottom: 30, alignItems: 'center', justifyContent: 'center', alignContent: 'center', marginTop: 50 }]}>
            <View style={[layout.column, layout.full]}>
                <Text style={[layout.heading, { fontSize: 20, color: '#ad1457' }]}>
                    Report User
                </Text>
                <View style={[layout.full, { justifyContent: 'center', alignContent: 'center', alignSelf: 'center', marginTop: 15 }]}>
                    <View>
                        <Text style={[styles.text, { fontSize: 12, color: 'grey', textAlign: 'center' }]}>
                            Is this person bothering you? Tell us what they did.
                        </Text>
                    </View>

                    {/* ... like user.. */}
                </View>

            </View>


        </View>
        <TouchableWithoutFeedback onPress={() => addComplaintType('innapropriatemessages')} style={[layout.row, layout.itemSection, { justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', paddingHorizontal: 50 }]}>

            <Text style={[layout.heading, { fontSize: 14 }]}>
                    Innapropriate Messages
            </Text>
            {selectedComplaints.includes('innapropriatemessages') ?
                <Icon name="check" color={"green"} size={20}></Icon>
                : null}

        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => addComplaintType('innapropriatepictures')} style={[layout.row, layout.itemSection, { justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', paddingHorizontal: 50 }]}>

            <Text style={[layout.heading, { fontSize: 14 }]}>
            Innapropriate Pictures
</Text>
            {selectedComplaints.includes('innapropriatepictures') ?
                <Icon name="check" color={"green"} size={20}></Icon>
                : null}

        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => addComplaintType('spam')} style={[layout.row, layout.itemSection, { justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', paddingHorizontal: 50 }]}>

            <Text style={[layout.heading, { fontSize: 14 }]}>
                Spam
            </Text>
            {selectedComplaints.includes('spam') ?
                <Icon name="check" color={"green"} size={20}></Icon>
                : null}

        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => addComplaintType('other')} style={[layout.row, layout.itemSection, { justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', paddingHorizontal: 50 }]}>

            <Text style={[layout.heading, { fontSize: 14 }]}>
                Other
            </Text>
            {selectedComplaints.includes('other') ?
                <Icon name="check" color={"green"} size={20}></Icon>
                : null}

        </TouchableWithoutFeedback>


       
        {showThankYou ? 
        <>
        
          <View style={[layout.full, { justifyContent: 'center', alignContent: 'center', alignSelf: 'center', marginTop: 65 }]}>
          <View>
              <Text style={[styles.text, { fontSize: 12, color: 'grey', textAlign: 'center' }]}>
                  Thanks, your feedback has been submitted!
                      </Text>
          </View>

          {/* ... like user.. */}
      </View> 
      
      </>
      :
    <>
     <View style={[layout.full, { justifyContent: 'center', alignContent: 'center', alignSelf: 'center', marginTop: 65 }]}>
            <View>
                <Text style={[styles.text, { fontSize: 12, color: 'grey', textAlign: 'center' }]}>
                    Want to add more?
                        </Text>
            </View>

            {/* ... like user.. */}
        </View>
      <TextInput
            multiline
            // numberOfLines={4}
            value={complaint}
            maxLength={256}
            onChangeText={(t) => setComplaint(t)}
            style={[styles.text, { fontSize: 14, color: "#52575D", borderBottomColor: 'grey', borderBottomWidth: 1, marginHorizontal: 50 }, styles.inputBox]}>

        </TextInput>
        <CustomButton
        customStyles={{marginHorizontal:50}}
                                textColor={'#fff'}
                                color={'#ad1457'}
                                solid={true}
                                loading={false}
                                onPress={uploadReport}
                                disabled={false}
                            >
                                Submit
                            </CustomButton>
    </>
    }
      


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
    inputBox: {
        // borderTopColor: 'transparent',
        // borderLeftWidth: 0,
        // borderRightWidth: 0,
        minHeight: 100,
        marginVertical: 20,
        fontSize: 14,
        padding: 10,
        paddingHorizontal: 5,
        fontFamily: 'Open Sans',
        // backgroundColor:'white',
        // borderColor: '#888888',
        borderWidth: .3,
        borderRadius: 8,
        // overflow:'hidden'
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

export default ReportUser