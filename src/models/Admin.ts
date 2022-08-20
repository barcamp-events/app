import { prop } from "@midwest-design/common";
import FirebaseModel from "./FirebaseModel";

export default class Admin extends FirebaseModel {
  static bucket = "admins/";
  static get model() {
    return Admin;
  }
  static instantiate(args?) {
    return new Admin(args);
  }

  @prop()
  key: string;
}
