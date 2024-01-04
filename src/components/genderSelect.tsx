import React, { Fragment, useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ViewStyle, Animated } from 'react-native';
import { Image } from 'react-native-animatable';
import { TouchableOpacity, TapGestureHandler, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {
 multi:boolean;
 genderSelected:(gender:GenderType) => void;
 gendersSelected:(genders:GenderType[]) => void;
}
export enum GenderType {
    'M',
    'F',
    'A'
}

function GenderSelect ({multi = false,genderSelected,gendersSelected}:Props) {
    const [currentGender,setCurrentGender] = useState(GenderType.M)
    const [currentlySelectedGenders,setCurrentlySelectedGenders] = useState([GenderType.M]) as any

    const selectGender = (gender:GenderType) => {
        if(currentlySelectedGenders.includes(gender)) {
            if(currentlySelectedGenders.length != 1) {
                setCurrentlySelectedGenders([...currentlySelectedGenders.filter((g:GenderType) => g !== gender )]);
            }
            
        } else {
            setCurrentlySelectedGenders([...new Set([...currentlySelectedGenders,gender])]);
        }
        genderSelected(currentlySelectedGenders)
    }

    return <View style={styles.row}>
        {multi ? <>
            <TouchableWithoutFeedback style={[styles.button_1, currentlySelectedGenders.includes(GenderType.M) ? {borderColor:'black',borderWidth:2} : null]} onPress={() => { selectGender(GenderType.M)   }} >
        {/* <Icon size={42} name={'mars'} color={'blue'} solid={true} ></Icon> */}
        <Image
          style={{width: 30, height : 30, resizeMode: 'contain'}}
          source={require('../../assets/images/Path_739.png')}
          
        />

        </TouchableWithoutFeedback >
        <TouchableWithoutFeedback style={[styles.button_2, currentlySelectedGenders.includes(GenderType.F) ? {borderColor:'black',borderWidth:2} : null]} onPress={() => {  selectGender(GenderType.F) }} >
        {/* <Icon size={42} name={'venus'} color={'blue'} solid={true} ></Icon> */}
        <Image
          style={{width: 30, height : 30, resizeMode: 'contain'}}
          source={require('../../assets/images/Path_738.png')}
          
        />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback style={[styles.button, currentlySelectedGenders.includes(GenderType.A) ? {borderColor:'black',borderWidth:2} : null]}  onPress={() => { selectGender(GenderType.A) }} >
        {/* <Icon size={42} name={'circle'} color={'blue'} solid={false} ></Icon> */}
        <Image
          style={{width: 30, height : 30, resizeMode: 'contain'}}
          source={require('../../assets/images/Path_740.png')}
          
        />
        </TouchableWithoutFeedback>
        
        </>
        
    : <>
     <TouchableWithoutFeedback style={[styles.button_1, currentGender == GenderType.M ? {borderColor:'black',borderWidth:2} : null]} onPress={() => { genderSelected(GenderType.M); setCurrentGender(GenderType.M) }} >
        {/* <Icon size={42} name={'mars'} color={'blue'} solid={currentGender == GenderType.M} ></Icon> */}
        <Image
          style={{width: 30, height : 30, resizeMode: 'contain'}}
          source={require('../../assets/images/Path_739.png')}
          
        />
        </TouchableWithoutFeedback >
        <TouchableWithoutFeedback style={[styles.button_2, currentGender == GenderType.F ? {borderColor:'black',borderWidth:2} : null]} onPress={() => { genderSelected(GenderType.F); setCurrentGender(GenderType.F) }} >
        {/* <Icon size={42} name={'venus'} color={'blue'} solid={currentGender == GenderType.F} ></Icon> */}
        <Image
          style={{width: 30, height : 30, resizeMode: 'contain'}}
          source={require('../../assets/images/Path_738.png')}
          
        />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback style={[styles.button, currentGender == GenderType.A ? {borderColor:'black',borderWidth:2} : null]} onPress={() => { genderSelected(GenderType.A); setCurrentGender(GenderType.A) }} >
        {/* <Icon size={42} name={'circle'} color={'blue'} solid={false} ></Icon> */}
        <Image
          style={{width: 30, height : 30, resizeMode: 'contain'}}
          source={require('../../assets/images/Path_740.png')}
          
        />
        </TouchableWithoutFeedback>
    </>}
       
       
       
    </View>
}

const styles = StyleSheet.create({
row: {
    marginVertical:20,
    flexDirection:'row',
    justifyContent:'center'
},
button: {
    // position: "absolute",
    width: 60,
    height: 60,
    marginHorizontal:20,
    backgroundColor:'grey',
    borderRadius: 60 / 2,
    alignItems: "center",
    justifyContent: "center",
},

button_1: {
    // position: "absolute",
    width: 60,
    height: 60,
    marginHorizontal: 20,
    backgroundColor: '#1230AC',
    borderRadius: 60 / 2,
    alignItems: "center",
    justifyContent: "center",
},

button_2: {
    width: 60,
    height: 60,
    marginHorizontal: 20,
    backgroundColor: '#633ABC',
    borderRadius: 60 / 2,
    alignItems: "center",
    justifyContent: "center",


}

}) 
export default GenderSelect