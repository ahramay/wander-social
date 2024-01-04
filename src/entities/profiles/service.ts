import { Profile } from "../profiles/model";
import { firebase } from '@react-native-firebase/functions';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
//@ts-ignore
import referralCodeGenerator from 'referral-code-generator'
export class ProfileService {
    profile: Profile | null

    constructor(profile = null) {
        this.profile = profile
    }

    //profile image getter.

    profileSetupStage() {
        let currentStage = 1;
        if (this.profile && auth().currentUser?.emailVerified) {
            if (this.profile.homeLocation) currentStage = 2
        } else {
            return 0
        }

        return currentStage

    }

    public static async addReferral(referralCode: string) {

        try {
            let result = await firebase.functions().httpsCallable('addReferral')({
                referralCode
            });
            return { result }

        } catch (e) {
            throw (e)
        }
    }
    public static async createUserProfile(userCred: FirebaseAuthTypes.UserCredential,email:string) {

        try {
          let transaction = await firestore().collection('user-profiles').doc(userCred.user.uid).set({
            email: email,
            ageRange: { end: 60, start: 18 },
            maximumDistance:20, // in km
            liked: [],
            images: [],
            interests: [],
            placesToGo: [],
            placesBeen: [],
            languages: [],
            likedBy: [],
            height: 150, // in cm
            referrals: [],
            referralCode: referralCodeGenerator.custom('lowercase', 6, 6, email.split("@")[0])
          })
          await firestore().collection('user-connections').doc(userCred.user.uid).set({
            unmatched: [],
            disliked: [],
            connections: []
          })
          await firestore().collection('user-reports').doc(userCred.user.uid).set({
    
          })
          return transaction
        } catch (e) {
          throw (e)
    
        }
      }
}
