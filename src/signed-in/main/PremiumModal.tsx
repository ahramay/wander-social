
import React, { Fragment, useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ViewStyle, Animated, Alert, ScrollView, TextInput, Image, TouchableOpacity, Dimensions, DatePickerIOS } from 'react-native';

import { useCountRenders } from '../../util/performance';
import layout from '../../signed-out/layout';
import Hero from '../../components/Hero'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Swiper from 'react-native-swiper'
import CustomButton from '../../components/CustomButton';
const perks = [
    {msg:'Message other users without directly connecting', img:require('../../../assets/images/msg.png')},
    {msg:'Get 10 priority likes every 24 hours',img:require('../../../assets/images/likes.png')},
    {msg:'Ability to go back a swipe and change your mind',img:require('../../../assets/images/rewind.png')},
    {msg:'Ability to see who viewed your profile',img:require('../../../assets/images/eye.png')},
    {msg:'See who likes you',img:require('../../../assets/images/heartgroup.png')}
]
interface Props {
    navigation:any
}


const NAVSPACETOCENTER = 35

function PremiumModal ({navigation}:Props) {
return <View style={[layout.container, { justifyContent: 'flex-start' }]}>

<Hero colors={['#15212B', '#15212B']} style={{ zIndex: 9999, marginTop: NAVSPACETOCENTER }} >
    <TouchableOpacity style={{ position: 'absolute', left: 30 }} onPress={() => {navigation.goBack()}}>
        <Icon name="chevron-left" color={'grey'} solid size={24} />
    </TouchableOpacity>




</Hero>
<Swiper style={styles.wrapper} showsButtons={false}>
        {perks.map(perk => {
            return <View key={perk.msg} style={styles.slide}>
            <View style={{marginBottom:40,marginTop:20}}>
            <Text style={[layout.heading,{marginBottom:12}]}>Get all the Perks</Text>
          <Text style={[styles.text,{fontSize:14,color:'grey',textAlign:'center', marginBottom:20}]}>
                            {perk.msg}
                        </Text>
            </View>
        
          <Image style={{ width: "60%", height: 300 }} resizeMode={'contain'} source={perk.img}/>

        </View>
        })}
        
  
      </Swiper>

      <View style={[layout.full, { width: 300, justifyContent: 'center',  alignContent: 'center', alignSelf: 'center', marginTop: 25,marginBottom:50 }]}>
                        <View>
                        <Text style={[layout.heading, { fontSize: 24, textAlign: 'center' }]}>
                                $9.99 / mo
                        </Text>
                            <CustomButton
                                textColor={'#fff'}
                                color={'#0A0F3D'}
                                solid={true}
                                loading={false}
                                onPress={() => {}}
                                disabled={false}
                            >
                                {'Go Premium'}
                            </CustomButton>
                            <Text style={[styles.text, { fontSize: 12, color: 'grey', textAlign: 'center',marginTop:10 }]}>
                                No Thanks
                        </Text>
                        </View>
                    </View>
        
</View>
}

export default PremiumModal

const styles = StyleSheet.create({
    wrapper: {},
    slide: {
    //   flex: 1,
    //   justifyContent: 'center',
    alignItems: 'center',
    //   backgroundColor: '#9DD6EB'
    },
    slide1: {
    //   flex: 1,
    //   justifyContent: 'center',
      alignItems: 'center',
    //   backgroundColor: '#9DD6EB'
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    //   backgroundColor: '#97CAE5'
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    //   backgroundColor: '#92BBD9'
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontFamily:'Montserrat',
      fontWeight: 'bold'
    }
})