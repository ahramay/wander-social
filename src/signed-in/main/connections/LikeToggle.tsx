import React, { Fragment, useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ViewStyle, Animated } from 'react-native';
import { TouchableOpacity, TapGestureHandler} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {
    onLike:() => void;
    onDislike:() => void;
    like:boolean;
    dislike:boolean;
}

function LikeToggle ({onLike,onDislike,like=false,dislike=false}:Props) {
    return <View style={styles.row}>
        <TouchableOpacity onPress={onLike} style={{marginRight:70}}>
        <Icon size={42} name={'thumbs-up'} color={'blue'} solid={like} ></Icon>
        </TouchableOpacity>
       <TouchableOpacity onPress={onDislike}>
       <Icon size={42} name={'thumbs-down'} color={'blue'} solid={dislike} ></Icon>
       </TouchableOpacity>
       
    </View>
}

const styles = StyleSheet.create({
row: {
    flexDirection:'row',
    justifyContent:'center'
}
}) 
export default LikeToggle