import { Component, State } from "@stencil/core";
import Authentication from "../../../models/Authentication";

@Component({
  tag: "barcamp-sign-out",
})
export class BarcampSignOut {
  @State() auth: Authentication = window["Authentication"] as Authentication;

  async componentWillLoad() {
    await this.auth.signOut();
    // this.history.push(`/omaha/2019/schedule`, {});
  }

  async componentDidLoad() {
    await this.auth.signOut();
    // this.history.push(`/omaha/2019/schedule`, {});
  }
}
