import { Component, Host, h, Prop } from '@stencil/core';
import AuthenticationTunnel from '../../../tunnels/authentication';

@Component({
  tag: 'barcamp-auth-choices',
  styleUrl: 'barcamp-auth-choices.css'
})
export class BarcampAuthChoices {
  @Prop() user: User;

  render() {
    return <Host>
      <midwest-layout size="tiny">
        <midwest-card>
          <header class="flush p-0">
            {!this.user && <midwest-tabs block name="auth">
              <midwest-tab open name="sign-in">Sign In</midwest-tab>
              <midwest-tab name="sign-up">Sign Up</midwest-tab>
              <midwest-tab name="guest">Guest</midwest-tab>
            </midwest-tabs>}
          </header>

          <section>
            <midwest-content for="auth" id="sign-in" open>
              <barcamp-auth-choice-sign-in />
            </midwest-content>
            <midwest-content for="auth" id="sign-up">
              <barcamp-auth-choice-sign-up />
            </midwest-content>
            <midwest-content for="auth" id="guest">
              <barcamp-auth-choice-guest />
            </midwest-content>
          </section>
        </midwest-card>
      </midwest-layout>
    </Host>
  }
}
AuthenticationTunnel.injectProps(BarcampAuthChoices, ['user']);
