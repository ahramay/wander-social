import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import Phone from '../providers/Phone';
import layout from './layout';
import { NavigationParams } from 'react-navigation';

interface Props {
  navigation: NavigationParams;
}
function PhoneSignIn({ navigation }: Props) {
  return (

    <View style={layout.container}>
      <View style={layout.main}>
      <Phone {...navigation} />
      </View>
      
    </View>
  );
}
let deviceHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
    // justifyContent:'flex-start'

  },
  main: {
    overflow: 'visible',
    // backgroundColor: 'blue',
    alignItems: 'center',
    marginTop: deviceHeight * .09,
    marginHorizontal: deviceHeight * .05,
  }
});

export default PhoneSignIn;
