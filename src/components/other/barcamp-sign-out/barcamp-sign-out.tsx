import { Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import Authentication from '../../../models/Authentication'

@Component({
  tag: 'barcamp-sign-out'
})
export class BarcampSignOut {
  @Prop() history: RouterHistory;
  @State() auth: Authentication = new Authentication();

  async componentWillLoad() {
    if (this.auth.authenticated()) {
      await this.auth.signOut();
      this.history.push(`/auth`, {});
    }
  }

  async componentDidLoad() {
    if (this.auth.authenticated()) {
      await this.auth.signOut();
      this.history.push(`/auth`, {});
    }
  }
}
