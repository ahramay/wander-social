import React, { Fragment, useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ViewStyle, Animated ,Alert, ScrollView, TextInput, Image} from 'react-native';
import { TouchableOpacity, TapGestureHandler, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useCountRenders } from '../../util/performance';
import layout from '../../signed-out/layout';
import { NavigationParams } from 'react-navigation';

// @ts-ignore
import PlacesInput from 'react-native-places-input'
import GlobalTheme from '../../theme'
import { Profile as ProfileType, Image as ProfileImageType, Location } from '../../entities/profiles/model'
import CustomButton from '../../components/CustomButton';
import {sample} from 'lodash'
import LinearGradient from 'react-native-linear-gradient';
import { useProfile } from '../../util/firebase';
import functions from '../../util/functions';

interface Props {
    finished:(dataObject:any) => void;
    navigation: NavigationParams;
}

const INTERESTS = [
    {title:"cooking",image: require("../../../assets/images/ic_cook.png"), color: '#633ABC'},
    {title:"movies",image: require("../../../assets/images/ic_movies.png"), color: '#A7A7A7'},
    {title:"sports",image: require("../../../assets/images/ic_space.png"), color: '#2C31AD'},
    {title:"gambling",image: require("../../../assets/images/ic_cook.png"), color: '#2C31AD'},
    {title:"Music",image: require("../../../assets/images/ic_music.png"), color: '#0F2385'},
    {title:"Fitness",image: require("../../../assets/images/ic_fitness.png"), color: '#0C1962'},
    {title:"History",image: require("../../../assets/images/ic_history.png"), color: '#A7A7A7'},
    {title:"Video Games",image: require("../../../assets/images/ic_video_games.png"), color: '#633ABC'},
    {title:"Star Wars",image: require("../../../assets/images/ic_start_wars.png"), color: '#A7A7A7'},
    {title:"Reading",image: require("../../../assets/images/ic_reading.png"), color: '#A7A7A7'},
    {title:"Fishing",image: require("../../../assets/images/ic_fishing.png"), color: '#2C31AD'},
    {title:"Cars",image: require("../../../assets/images/ic_cars.png"), color: '#0F2385'},
    {title:"Gardnening",image: require("../../../assets/images/ic_garnening.png"), color: '#0C1962'},
    {title:"Arts",image: require("../../../assets/images/ic_arts.png"), color: '#0B0E3D'},
    {title:"Animals",image: require("../../../assets/images/ic_animals.png"), color: '#633ABC'}
]


function AddInterestScreen ({finished, navigation}:Props) {
    const [spinnerloading, setLoading] = useState<boolean>(false);
    const [selectedInterests,setSelectedInterests] = useState([]) as any
    const [currentProfile, updateCurrentProfile] = useState<ProfileType | null>(null)
    //const {profile,loading,error} = useProfile()
    //let colors  = ['#007551','#00BE80','#6026BC','#ABABAB','#A51B5E']
    let colors  = ['#633ABC','#A7A7A7','#2C31AD','#0C1962','#A51B5E']

    
    // useEffect(()=>{
    //     if(profile) {
    //         updateCurrentProfile(profile)
    //         setSelectedInterests(profile.interests)
    //     }
    //  },[loading])
     const submit =() =>{
        //  setLoading(true)
        //  finished({interests:selectedInterests})
        
     }
    const Tiles = () => {
        return <View style={styles.sectionContainer}>
            {INTERESTS.map(interest => {
              let selected = !!(selectedInterests.length && selectedInterests.find((x:any) => x.title == interest.title))
              console.log('selected', selected,selectedInterests)
                return <TouchableWithoutFeedback onPress={()=> {
                  if(!selected) setSelectedInterests([...new Set([...selectedInterests,interest])])
                  if(selected) setSelectedInterests(selectedInterests.filter((x:any) => x.title !== interest.title))
                } }  key={interest.title} style={[{width:100,height:150,backgroundColor : interest.color ,marginVertical:4,marginHorizontal:4,borderRadius:4,display:'flex',justifyContent:'center',alignContent:'center',alignItems:'center'}]}>
                    <View style={[layout.column,{alignItems: 'flex-end', marginTop: 10}]}>  
                    {selected ? <Icon name="check" color={"green"} size={20}></Icon> : null}
                    <View style={{flexDirection: 'column', alignItems: 'center',}}>
                    
                    <Image
                     style={{width: 40, height : 40, resizeMode: 'contain',}}
                     source={interest.image}
                      />
                    <Text style={{fontFamily:'Montserrat',fontSize:14,color:'white', alignSelf: 'flex-end', marginTop: 30}}>{interest.title}</Text>

                    </View>

                    </View>
                    </TouchableWithoutFeedback>
            })}
        </View>
    }
    return <View style={[ styles.contentArea,{justifyContent:'center'}]}>
    <View style={[layout.row, layout.header,{justifyContent: 'center'}]}>
<View style={[layout.column, ]}>
 <Text style={[layout.heading, { textAlign: 'center', marginTop: functions.getHeight(8)}]}>
   Select your interest
 </Text>
</View>
</View>
<View style={[layout.wordBox,{marginVertical:20}]}>


<View style={layout.column}>
  <Text style={layout.info}>

    Select as many as you like. We'll use these to match with others who share your interests.

  </Text>
</View>
</View>
<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{overflow:'visible'}} keyboardShouldPersistTaps="always" style={[styles.main]}>
    {Tiles()}
    </ScrollView>
    <LinearGradient colors={['rgba(255,255,255,1)', 'rgba(255,255,255,.55)', 'rgba(255,255,255,0.7189250700280112)']} style={styles.info}>
    <View style={[layout.full]}>
    <CustomButton
      textColor={'#fff'}
      color={'#0A0F3D'}
      solid={true}
      loading={false}
      onPress={submit}
      disabled={selectedInterests.length < 3}
    >
      {selectedInterests.length < 3 ?  'Please select some interests' : 'Finish Adding'}
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
        flex: 1,
        position: 'relative',
        marginBottom: 125,

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
      sectionContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
      },
})

export default AddInterestScreen