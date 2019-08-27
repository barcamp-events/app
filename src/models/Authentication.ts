import firebase from 'firebase/app';
import 'firebase/auth';
import { User as FirebaseUser } from 'firebase'
import User from './User';

export const firebaseConfig = {
    apiKey: "<@FIREBASE_API_KEY@>",
    authDomain: "<@FIREBASE_AUTH_DOMAIN@>",
    projectId: "<@FIREBASE_PROJECT_ID@>",
};

firebase.initializeApp(firebaseConfig)

export default class Authentication {
  firebaseUser: FirebaseUser = undefined;
  user: User = undefined;

  constructor () {
    firebase.auth().onAuthStateChanged(async (firebaseUser: FirebaseUser) => {
      if (firebaseUser) {
        this.firebaseUser = firebaseUser;

        if (!this.firebaseUser.emailVerified) {
          this.signOut();
          return;
        }

        this.user = await User.getByEmail(this.firebaseUser.email);

        if (!this.user) {
          this.signOut();
          return;
        }

        this.user.firebaseUID = this.firebaseUser.uid;
        this.user.loggedIn();
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

  async createNewUser(user, password) {
    let response = await firebase.auth().createUserWithEmailAndPassword(user.email, password);

    await firebase.auth().currentUser.sendEmailVerification({
      url: `${window.location.origin}`,
    });

    return response.user.uid;
  }

  async signIn(username: string, password: string) {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    const user = await firebase.auth().signInWithEmailAndPassword(username, password)
    return user;
  }

  signOut() {
    sessionStorage.clear()
    firebase.auth().signOut()
  }
}
