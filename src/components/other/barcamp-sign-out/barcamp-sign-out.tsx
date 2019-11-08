import { Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import Authentication from '../../../models/Authentication'

@Component({
  tag: 'barcamp-sign-out'
})
export class BarcampSignOut {
  @Prop() history: RouterHistory;
  @State() auth: Authentication = window["Authentication"] as Authentication;

  async componentWillLoad() {
    await this.auth.signOut();
    this.history.push(`/omaha/2019/schedule`, {});
  }

  async componentDidLoad() {
    await this.auth.signOut();
    this.history.push(`/omaha/2019/schedule`, {});
  }
}
