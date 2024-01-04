import auth from '@react-native-firebase/auth';
import React, {useContext, useState, useEffect} from 'react';
import {Alert,StyleSheet,StyleSheetProperties, ViewStyle} from 'react-native';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {UserContext} from '../App';
import ProviderButton from '../components/ProviderButton';
import {getProviderButtonTitle} from '../util/helpers';
import { NavigationParams } from 'react-navigation';

const PROVIDER_ID = 'facebook.com';
interface Props {
  style?: ViewStyle;
}

function Facebook(navigation) {
  const [loading, setLoading] = useState(false);
  const user = useContext(UserContext);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (email.length) {
      //console.log("Log email ", email);
      // verifcation filled in
      // handleVerification({ navigation }: Props)
      navigation.navigate('EmailCreate', { email: email });
    } 
  }, [email]);

  const {isOnlyProvider, title, variant} = getProviderButtonTitle(
    user,
    PROVIDER_ID,
  );

  async function handleFacebook() {
    if (!loading) {
      setLoading(true);
      //navigation.navigate('EmailCreate');
      try {
        if (variant === 'UNLINK' && user) {
          await user.unlink(PROVIDER_ID);
        } else {
          const {isCancelled} = await LoginManager.logInWithPermissions([
            'public_profile',
            'email'
          ]);

          if (isCancelled) {
            Alert.alert('Facebook Auth Canceled');
          } else {
            const result = await AccessToken.getCurrentAccessToken();
            if (!result) {
              throw new Error(
                'No Access Token was returned from Facebook SDK.',
              );
            }
          
            
            const {accessToken} = result;

            const credential = auth.FacebookAuthProvider.credential(
              accessToken,
            );
            initUser(accessToken);
            // .navigation.navigate('phone');
            //navigation.navigate('EmailCreate');
            
            // navigation.navigate("phone");
            // if (variant === 'LINK' && user) {
            //   await user.linkWithCredential(credential);
            // } else if (variant === 'SIGN_IN') {
            //   await auth().signInWithCredential(credential);
            // }

          }
        }
      } catch (error) {
        Alert.alert('Facebook Auth Error', error.message);
        console.log("Log fb Error ", error.message);

      } finally {
        setLoading(false);
      }
    }
  }

  async function initUser(token) {
    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
    .then((response) => response.json())
    .then((json) => {
      // Some user object has been set up somewhere, build that user here
      //Alert.alert("FB Info ", json.name + " " + json.email + " oay ");

      setEmail(json.email);
      
      // navigation.navigate('EmailCreate');

      // user.name = json.name
      // user.id = json.id
      // user.user_friends = json.friends
      // user.email = json.email
      // user.username = json.name
      // user.loading = false
      // user.loggedIn = true
      // user.avatar = setAvatar(json.id)      
    })
    .catch(() => {
      reject('ERROR GETTING DATA FROM FACEBOOK')
    })
  }

  if (isOnlyProvider) {
    return null;
  }

  // return null;
  return (
     <ProviderButton  loading={loading} type="facebook" onPress={handleFacebook}>
       {title}
     </ProviderButton>
  );
}

export default Facebook;
