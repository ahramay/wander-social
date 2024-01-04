import AsyncStorage from '@react-native-community/async-storage';
import {
  Platform,
  PixelRatio,
  Dimensions,
  StatusBar
} from 'react-native';
const {height, width} = Dimensions.get('window');

export default {

    isIphoneX() {
    //   return (
    //       //Platform.OS === 'ios' && DeviceInfo.hasNotch()
    //   );
    },
    
    getDateString(date) {
      console.log('kulsoom date:', date)
      let day = '' ;
      let year= date.getFullYear() ;
      let month = '';
      if((date.getMonth() + 1 ) < 10){
        month = '0'+(date.getMonth() + 1 );
      }else{
        month = date.getMonth();
      }
      if(date.getDate() < 10 ){
        day = '0'+ date.getDate();
      }else{
        day =  date.getDate();
      }
    
      let dateStr= day + '/' + month + '/' + year;
      return dateStr;
    },

    getHeight(h){
        const elemHeight = parseFloat(h);
        return PixelRatio.roundToNearestPixel(height * elemHeight / 100);
      },
    
    getWidth(w){
      const elemWidth = parseFloat(w);
      return PixelRatio.roundToNearestPixel(width * elemWidth / 100);
    },
    
}