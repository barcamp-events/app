import { Component, Host, h, Prop } from '@stencil/core';
import Authentication from '../../models/Authentication';

@Component({
  tag: 'barcamp-auth-choices',
  styleUrl: 'barcamp-auth-choices.css'
})
export class BarcampAuthChoices {
  @Prop() auth: Authentication = new Authentication;

  render() {
    return (
      <Host>
        <stellar-layout size="small">
          <div>
            <stellar-tabs block name="auth">
              <stellar-tab open name="sign-in">Sign In</stellar-tab>
              <stellar-tab name="sign-up">Sign Up</stellar-tab>
              <stellar-tab name="guest">Continue as Guest</stellar-tab>
            </stellar-tabs>

            <stellar-content for="auth" id="sign-in" open>
              <barcamp-auth-choice-sign-in auth={this.auth} />
            </stellar-content>
            <stellar-content for="auth" id="sign-up">
              <barcamp-auth-choice-sign-up auth={this.auth} />
            </stellar-content>
            <stellar-content for="auth" id="guest">
              <barcamp-auth-choice-guest auth={this.auth} />
            </stellar-content>
          </div>
        </stellar-layout>
      </Host>
    );
  }

}
