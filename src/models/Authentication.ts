import firebase from '@firebase/app';
import '@firebase/analytics';
import '@firebase/performance';
import '@firebase/auth';
import '@firebase/firestore';
import '@firebase/messaging';
import '@stencil/router';
import { User as FirebaseUser } from 'firebase'
import User from './User';

window["ENVIRONMENT"] = "<@ENVIRONMENT@>";

const firebaseConfig = {
  "projectId": "<@FIREBASE_PROJECT_ID@>",
  "appId": "<@FIREBASE_APP_ID@>",
  "databaseURL": "<@FIREBASE_DATABASE_URL@>",
  "storageBucket": "<@FIREBASE_STORAGE_BUCKET@>",
  "apiKey": "<@FIREBASE_API_KEY@>",
  "authDomain": "<@FIREBASE_AUTH_DOMAIN@>",
  "messagingSenderId": "<@FIREBASE_SENDER_ID@>",
  "measurementId": "<@FIREBASE_MEASUREMENT_ID@>"
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
  firebase.performance()
  firebase.analytics();
  navigator.serviceWorker.register('/sw.js').then( (registration) => {
    firebase.messaging().useServiceWorker(registration);
  });
}

export default class Authentication {
  firebaseUser: FirebaseUser = undefined;
  user: User = undefined;

  constructor () {
    firebase.auth().onAuthStateChanged(async (firebaseUser) => {
      console.log("Something changed!")
      if (firebaseUser) {
        this.firebaseUser = firebaseUser;
        this.user = await User.get(this.firebaseUser.uid);

        if (!this.user.is_usable) {
          return;
        }

        this.user.key = this.firebaseUser.uid;
      } else {
        this.firebaseUser = undefined;
        this.user = undefined;
      }
      
      console.log("hello")

      this.fireEvent()
    });
  }

  fireErrorEvent(message) {
    var event = new CustomEvent('auth_error', {
      detail: {
        message
      }
    });

    window.dispatchEvent(event);
  }

  fireEvent() {
    var event = new CustomEvent('auth', {
      detail: {
        user: this.user,
        firebaseUser: this.firebaseUser,
      }
    });

    window.dispatchEvent(event);
  }

  static onAuthStateChanged(fn) {
    window.addEventListener('auth', (e: CustomEvent) => {
      fn(e.detail)
    })
  }

  authenticated(): boolean {
    return typeof this.firebaseUser !== "undefined"
  }

  current(): User {
    return this.user;
  }

  async createNewUser(email, password, profile: {displayName: string}) {
    let response = await firebase.auth().createUserWithEmailAndPassword(email, password);
    await this.signOut();
    await response.user.sendEmailVerification({
      url: `${window.location.origin}/profile`,
    });
    await response.user.updateProfile(profile);
    this.user = await User.create({email, key: response.user.uid, ...profile}) as User;
    await this.signIn(email, password);
    return this.user;
  }

  async signInAsGuest() {
    let response = await firebase.auth().signInAnonymously();

    this.user = await User.create({key: response.user.uid, displayName: "Guest", anonymous: response.user.isAnonymous}) as User;

    return this.user;
  }

  async signIn(email: string, password: string) {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    const user = await firebase.auth().signInWithEmailAndPassword(email, password)

    return user;
  }

  signOut() {
    firebase.auth().signOut()
  }
}


window["Authentication"] = new Authentication;
