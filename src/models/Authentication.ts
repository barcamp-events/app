import { getApp, initializeApp, getApps } from "firebase/app";
import { initializeAnalytics } from "@firebase/analytics";
import { initializePerformance } from "@firebase/performance";
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  updateProfile,
  browserLocalPersistence,
  sendEmailVerification,
  signOut,
} from "@firebase/auth";
import User from "./User";
import type { FirebaseApp } from "firebase/app";
import type {
  User as FirebaseUser,
  Auth as FirebaseAuth,
} from "@firebase/auth";
import BarCampStore from "../stores/barcamp-app-state";

window["ENVIRONMENT"] = "<@ENVIRONMENT@>";

const firebaseConfig = {
  projectId: "<@FIREBASE_PROJECT_ID@>",
  appId: "<@FIREBASE_APP_ID@>",
  databaseURL: "<@FIREBASE_DATABASE_URL@>",
  storageBucket: "<@FIREBASE_STORAGE_BUCKET@>",
  apiKey: "<@FIREBASE_API_KEY@>",
  authDomain: "<@FIREBASE_AUTH_DOMAIN@>",
  messagingSenderId: "<@FIREBASE_SENDER_ID@>",
  measurementId: "<@FIREBASE_MEASUREMENT_ID@>",
};

if (getApps().length === 0) {
  const firebaseApplication = initializeApp(firebaseConfig);
  initializePerformance(firebaseApplication);
  initializeAnalytics(firebaseApplication);
}

export default class Authentication {
  firebaseUser: FirebaseUser = undefined;
  user: User = undefined;
  auth: FirebaseAuth = undefined;
  app: FirebaseApp = undefined;

  constructor() {
    this.app = getApp();
    this.auth = getAuth(this.app);

    onAuthStateChanged(this.auth, async (firebaseUser) => {
      if (firebaseUser) {
        this.firebaseUser = firebaseUser;
        this.user = await User.get(this.firebaseUser.uid);

        if (!this.user.is_usable) {
          return;
        }

        this.user.key = this.firebaseUser.uid;
        BarCampStore.set("user", this.user);
      } else {
        this.firebaseUser = undefined;
        this.user = undefined;
        BarCampStore.set("user", this.user);
      }

      debugger;

      this.fireEvent();
    });
  }

  fireErrorEvent(message) {
    var event = new CustomEvent("auth_error", {
      detail: {
        message,
      },
    });

    window.dispatchEvent(event);
  }

  fireEvent() {
    var event = new CustomEvent("auth", {
      detail: {
        user: this.user,
        firebaseUser: this.firebaseUser,
      },
    });

    window.dispatchEvent(event);
  }

  static onAuthStateChanged(fn) {
    window.addEventListener("auth", (e: CustomEvent) => {
      fn(e.detail);
    });
  }

  authenticated(): boolean {
    return typeof this.firebaseUser !== "undefined";
  }

  current(): User {
    return this.user;
  }

  async createNewUser(email, password, profile: { displayName: string }) {
    let response = await createUserWithEmailAndPassword(
      getAuth(),
      email,
      password
    );
    await this.signOut();
    await sendEmailVerification(response.user, {
      url: `${window.location.origin}/profile`,
    });
    await updateProfile(response.user, profile);
    this.user = (await User.create({
      email,
      key: response.user.uid,
      ...profile,
    })) as User;
    await this.signIn(email, password);
    return this.user;
  }

  async signInAsGuest() {
    let response = await signInAnonymously(getAuth());

    this.user = await User.create({
      key: response.user.uid,
      displayName: "Guest",
      anonymous: response.user.isAnonymous,
    });

    return this.user;
  }

  async signIn(email: string, password: string) {
    await setPersistence(getAuth(), browserLocalPersistence);
    const user = await signInWithEmailAndPassword(this.auth, email, password);

    return user;
  }

  signOut() {
    signOut(getAuth());
  }
}

window["Authentication"] = new Authentication();
