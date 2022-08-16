import { getAuth } from "@firebase/auth";
import { addDoc, doc } from "@firebase/firestore";
import { prop } from "@midwest-design/common";
import { MD5 } from "./utils";
import Location from "./Location";
import FirebaseModel from "./FirebaseModel";

export default class User extends FirebaseModel {
  static bucket = "users/";
  static get model() {
    return User;
  }
  static instantiate(args?) {
    return new User(args);
  }

  @prop({ serializable: ["firebase"] })
  public displayName: string;

  @prop({ serializable: ["firebase"] })
  public email: string;

  @prop({ serializable: ["firebase"] })
  public key: string;

  @prop({ serializable: ["firebase"], defaultValue: [], emptyValue: [] })
  public pushNotificationKeys: string[];

  @prop({ serializable: ["firebase"] })
  public social;

  @prop({
    defaultValue: "violet",
    emptyValue: "violet",
    serializable: ["firebase"],
  })
  public color: ThemeableColors;

  @prop({
    emptyValue: true,
    defaultValue: true,
    serializable: ["firebase"],
  })
  public dark_mode: boolean;

  @prop({
    emptyValue: false,
    serializable: ["firebase"],
  })
  public reduced_motion;

  @prop({
    serializable: ["firebase"],
    defaultValue: "I share my passion at BarCamp",
    emptyValue: "I share my passion at BarCamp",
  })
  public bio;

  @prop({ serializable: [] })
  public location;

  @prop({
    emptyValue: false,
    serializable: ["firebase"],
  })
  public anonymous;

  link(platform) {
    let url;

    if (platform === "twitter") {
      url = `https://twitter.com/${this.social.twitter}`;
    } else if (platform === "facebook") {
      url = `https://facebook.com/${this.social.facebook}`;
    } else if (platform === "instagram") {
      url = `https://instagram.com/${this.social.instagram}`;
    }

    return url;
  }

  get profile_picture() {
    return (
      "http://www.gravatar.com/avatar/" + MD5(this.email) + ".jpg?s=200&d=blank"
    );
  }

  get is_usable() {
    return this.key && this.displayName;
  }

  async currentLocation() {
    if (!this.location) {
      this.location = await Location.getCurrentCity();
    }

    return this.location;
  }

  static async current() {
    let result = getAuth().currentUser;

    if (result && result.uid) {
      return await User.get(result.uid);
    }

    return false;
  }

  static async create(data: any) {
    const key = data.key;
    const user = new User({ ...data, key });
    const docRef = doc(key);

    await addDoc(docRef, user.serialize("firebase"));
    debugger;
    return user;
  }
}
