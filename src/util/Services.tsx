import {BASE_URL, API_VERSION,PLATFORM} from './constants';
import {AsyncStorage} from 'react-native';

export default {

    async Signup(data) {
      try {
        let response = await fetch(BASE_URL + '/auth/Signup', {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(data),
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
        });
        console.log(response);
        let responseJson = await response.json();
        return responseJson;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * 
     * @param data Login API Calling.
     * @returns 
     */
    async SignIn(data) {
      try {
        let response = await fetch(BASE_URL + '/auth/LoginWithEmail', {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(data),
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
        });
        console.log(response);
        let responseJson = await response.json();
        return responseJson;
      } catch (error) {
        console.log(error);
      }
    },

    //Update profile API
    async UpdateProfile(data) {
      try {
        let response = await fetch(BASE_URL + '/user/UpdateProfile', {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(data),
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
        });
        console.log(response);
        let responseJson = await response.json();
        return responseJson;
      } catch (error) {
        console.log(error);
      }
    },


}