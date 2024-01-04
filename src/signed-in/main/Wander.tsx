import dayjs from 'dayjs';
import React, { useContext, Fragment, useEffect, useState, useRef } from 'react';
import { StyleSheet, View, SafeAreaView,Text, Modal, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
//import LottieView from 'lottie-react-native';
import {
  Avatar,
  Caption,
  FAB,
  Headline,
  Subheading,
  Theme,
  Title,
  withTheme,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { NavigationParams } from 'react-navigation';
import { UserContext } from '../../App';
import Hero from '../../components/Hero';
import Provider from '../../components/Provider';
import Facebook from '../../providers/Facebook';
import { getProviders, useProfile, useConnections } from '../../util/helpers';
import GlobalTheme from '../../theme'
import { TouchableOpacity } from 'react-native-gesture-handler';
import SwipeableCard from '../../components/SwipeableCard'
import Match from '../../components/Match'
import { useCountRenders } from '../../util/performance';
import { useProfilePagination } from '../../util/firebase';
import { Profile } from '../../entities/profiles/model';
import { ConnectionService } from '../../entities/connections/service';
import DestinationWizard from './DestinationWizard';
import layout from '../../signed-out/layout';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../../components/CustomButton';

interface Props {
  theme: Theme;
  navigation: NavigationParams;
}

function Wander({ theme, navigation }: Props) {
  const [wanderers, setWanderers] = useState([] as any)
  const profile = useProfile()
  const connections = useConnections()
  const [matched,setMatched] = useState(false);
  const [noWander,setNoWander] = useState(false);
  const [loadingWanderers,setLoadingWanderers] = useState(false);
  const {next, ready} = useProfilePagination(50)
  const [addingDestination,setAddingDestination] = useState(false);
  const user = useContext(UserContext);
  
  // if (!user) {
  //   return null;
  // }

  // useEffect(()=> {
  //   navigation.navigate('PremiumModal')
  // },[])


// !profile changes
  useEffect(() => {
    console.log("Log. am i ever ready??")
    // * refresh wanderer request due to profile changes.
    // * load more wanderes with transactions NOT being cached.
    //if(ready && profile) 
    loadWanderers(true)
    // * --- setting properties on profiles that affect results caching
  })



  const loadWanderers = async (reset = false) => {
    console.log("Log okay");
      //setLoadingWanderers(true)
        //let x = await  next(reset)
        // let profiles = x.map( doc => { return {uid:doc.id,...doc.data()} as Profile })
       
        // let connector = new ConnectionService(connections!,profile!)
        //let validConnections = profiles.filter(profile => connector!.shouldDisplay(profile.uid!))
        let validConnections = ["Hello", "okay", "Pro Name"]
        setWanderers(validConnections);
        setNoWander(false);
        console.log("Log okay ", wanderers);
        // console.log("Log. the connections", validConnections);
        // // * no more valid connections!
        // if(validConnections.length == 0) { 
        //   // * clear existing connections which are now invalid.
        //   setNoWander(true)
        //   setWanderers([])
        // } else{
        //   setNoWander(false)
        //   setWanderers(validConnections)
        // }
         //setLoadingWanderers(false)
    }

    // * card stack is asking for more people.
  const noMorePeople = () => {
  
    // * load more wanderes with transactions being cached.
    loadWanderers(false)
  }
  const showProfile = (user: Profile) => {
    navigation.navigate('PublicProfile', { user })
  }
  const onRejected = (user: Profile) => {
    //add user to disliked property  of connection manager
    console.log("disliked?",user.uid)
  }
  const onAccepted = async (user: Profile) => {
    // mark likedBy field on other user.
    // if current user likedBy contains this user =>
    // => add user to connections property of connection manager
    // => display match ui!
    // let connector = new ConnectionService(connections!,profile!)
    // try {
    //   let results = await connector!.likeUser(user.uid!)
    //   if(results.matched){
    //     // setMatched(true)
    //     // setTimeout(x => {
    //     //   setMatched(false)
    //     // },3000)
    //   }
    // } catch(e) {
    //   console.log(e)
    // }
    

  }
  // Array of providers the the user is linked with
 // const providers = getProviders(user);

  return (
    <View style={styles.container}>
     
      <Hero colors={['#15212B', '#15212B']} >
        <TouchableOpacity onPress={() =>  
        requestAnimationFrame(() => {
          navigation.navigate('Profile')
        })
        }>
          <Icon name="user" color={GlobalTheme.colors.light.text.warning} solid size={24} />
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() =>  
          requestAnimationFrame(() => {
            navigation.navigate('Dashboard')
          })
          }
        >
          <Icon name="comment-alt" color={GlobalTheme.colors.light.text.warning} solid size={24} />
        </TouchableOpacity>

      </Hero>
      { noWander ? <LinearGradient colors={['rgba(255,255,255,1)', 'rgba(255,255,255,.55)', 'rgba(255,255,255,0.7189250700280112)']} style={styles.info}>
                <View style={[layout.full]}>
                    <CustomButton
                        textColor={'#fff'}
                        color={'#0A0F3D'}
                        solid={true}
                        loading={false}
                        onPress={() => setAddingDestination(true)}
                        disabled={false}
                    >
                        { 'schedule a trip' }
                    </CustomButton>
                </View>
            </LinearGradient>
            : null
}
      <Modal
                animationType="slide"
                transparent={true}
                visible={matched}
                
            >
                <Match></Match>
            </Modal>
            <Modal
                animationType="slide"
                transparent={false}
                visible={addingDestination}
                
            >
                <DestinationWizard onClose={() => setAddingDestination(false)}></DestinationWizard>
            </Modal>
            {/*  NO WANDERS */}
            { noWander ?  <View style={[layout.main, styles.contentArea,{justifyContent:'flex-start'}]}>

           
            <View style={[layout.full]}>
          <View style={[layout.row, layout.header,{marginBottom:30,justifyContent:'center'}]}>
            <View style={layout.column}>
             <Text style={layout.heading}>
               Hey! You're all alone...
             </Text>
            </View>
            </View>
            <View style={[layout.wordBox,{marginVertical:20}]}>
            
            
            <View style={layout.column}>
              <Text style={layout.info}>
            
                Let's get you out there to see the world. Schedule a trip now, 
                and start making those connections.
            
              </Text>
            </View>
            </View>
            <View style={[layout.row,{marginTop:20}]}>
              <Image style={{height:400,width:'100%'}}source={require('../../../assets/images/map.png')}/>
              </View>
            </View>

       
          </View>
          
          : null
}

      { wanderers.length ?
        <SafeAreaView style={styles.content}>
 
          <SwipeableCard onComplete={noMorePeople} onSwipeUp={showProfile} onSwipeLeft={onRejected} onSwipeRight={onAccepted} items={wanderers} />

        </SafeAreaView>

        :

        <SafeAreaView style={styles.loadingContent}>
          
          {/* { !loadingWanderers ? <></>
          
        :  
        <LottieView
           autoPlay 
           loop
           
           style={{aspectRatio:undefined,justifyContent:'center',alignItems:'center'}}
            source={require('../../animations/ripple_flat.json')}
          />
        } */}
        
        </SafeAreaView>

      }
      {/* <View style={[styles.content, styles.profile]}>
        {user.photoURL ? (
          <Avatar.Image size={80} source={{uri: user.photoURL}} />
        ) : (
          <Avatar.Text
            size={80}
            label={user.email ? user.email.substring(0, 2).toUpperCase() : 'A'}
            style={styles.avatar}
          />
        )}
      </View> */}
      {/* <View style={styles.content}>
        <Headline>
          {user.displayName ? user.displayName : user.email}{' '}
          {user.emailVerified && (
            <Icon name="check-decagram" color="#2196f3" size={26} />
          )}
        </Headline>
        {!!user.displayName && <Title>{user.email}</Title>}
        {!!user.phoneNumber && <Subheading>{user.phoneNumber}</Subheading>}
        {!!user.metadata.lastSignInTime && (
          <Caption>
            {`Last sign-in: ${dayjs(user.metadata.lastSignInTime).format(
              'DD/MM/YYYY HH:mm',
            )}`}
          </Caption>
        )}
      </View> */}
      {/* <View style={styles.providers}>
        <Provider type="password" active={providers.includes('password')} />
        <Provider type="facebook" active={providers.includes('facebook.com')} />
        <Provider type="phone" active={providers.includes('phone')} />
      </View>
      <FAB
        color="#fff"
        style={[styles.fab, {backgroundColor: theme.colors.primary}]}
        icon="settings"
        onPress={() => navigation.navigate('Settings')}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // position: 'relative',
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  loadingContent: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    marginTop: 10,
    paddingTop:30,
    marginHorizontal:10,
    position: 'relative',
    flex: 1,
    // overflow: 'hidden', paddingBottom: 30 
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
  avatar: {
    borderColor: '#fff',
    borderWidth: 5,
    elevation: 4,
  },
  providers: {
    // backgroundColor: '#F6F7F8',
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 30,
    padding: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  center: {
    width: '100%',
    alignItems: 'center',
  },
});

export default Wander
