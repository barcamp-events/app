import '@firebase/performance';
import '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';
import '@firebase/functions';
import '@stencil/router';
import firebase from 'firebase/app';
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
  "messagingSenderId": "<@FIREBASE_SENDER_ID@>"
}

console.log(window["ENVIRONMENT"], firebaseConfig)

firebase.initializeApp(firebaseConfig)

export default class Authentication {
  firebaseUser: FirebaseUser = undefined;
  user: User = undefined;

  constructor () {
    firebase.auth().onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        this.firebaseUser = firebaseUser;
        this.user = await User.get(this.firebaseUser.uid);

        if (!this.user.is_usable) {
          return;
        }

        this.user.key = this.firebaseUser.uid;
        this.user.loggedIn();
        console.log("logged in", this.user);
      } else {
        this.firebaseUser = undefined;
        this.user = undefined;
      }

      this.fireEvent()
    });
  }

  fire_error_event(message) {
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

  async createNewUser(email, password, profile) {
    let response = await firebase.auth().createUserWithEmailAndPassword(email, password);
    this.signOut();

    await response.user.sendEmailVerification({
      url: `${window.location.origin}/profile`,
    });
    await response.user.updateProfile(profile);

    const user = await User.create({email, key: response.user.uid, ...profile});
    this.user = user;

    await this.signIn(email, password);

    return user;
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
