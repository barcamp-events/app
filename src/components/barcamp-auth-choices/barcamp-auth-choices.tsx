import { Component, Host, h, Prop } from '@stencil/core';
import AuthenticationTunnel from '../../tunnels/authentication';

@Component({
  tag: 'barcamp-auth-choices',
  styleUrl: 'barcamp-auth-choices.css'
})
export class BarcampAuthChoices {
  @Prop() user: User;

  render() {
    return (
      <Host>
        <stellar-layout size="small">
          <div>
            {!this.user && <stellar-tabs block name="auth">
              <stellar-tab open name="sign-in">Sign In</stellar-tab>
              <stellar-tab name="sign-up">Sign Up</stellar-tab>
              <stellar-tab name="guest">Continue as Guest</stellar-tab>
            </stellar-tabs>}

            <stellar-content for="auth" id="sign-in" open>
              <barcamp-auth-choice-sign-in />
            </stellar-content>
            <stellar-content for="auth" id="sign-up">
              <barcamp-auth-choice-sign-up />
            </stellar-content>
            <stellar-content for="auth" id="guest">
              <barcamp-auth-choice-guest />
            </stellar-content>
          </div>
        </stellar-layout>
      </Host>
    );
  }
}
AuthenticationTunnel.injectProps(BarcampAuthChoices, ['user']);
