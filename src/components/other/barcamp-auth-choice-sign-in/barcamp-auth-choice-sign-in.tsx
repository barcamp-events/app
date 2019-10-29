import { Component, Host, h, State, Element, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import Authentication from '../../../models/Authentication';
import delay from 'async-delay';
import AuthenticationTunnel from '../../../tunnels/authentication';

@Component({
  tag: 'barcamp-auth-choice-sign-in',
})
export class BarcampAuthChoiceSignIn {
  @Element() element: HTMLElement;

  @Prop() history: RouterHistory;
  @Prop() user: User;
  @State() auth: Authentication = window["Authentication"] as Authentication;

  @State() card: HTMLStellarCardElement;

  @State() success: boolean = false;
  @State() error: string;
  @State() step: number = 0;

  @State() redirectURL: string;

  componentWillLoad() {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get('redirect')) {
      this.redirectURL = urlParams.get('redirect') ? decodeURI(urlParams.get('redirect')) : '/';
    }

    Authentication.onAuthStateChanged(async (user) => {
      if (user) {
        this.success = true;
        await delay(100);
        await this.card.flip_card();
      }
    });
  }

  componentDidLoad() {
    this.card = this.element.querySelector('stellar-card');
  }

  redirect () {
    this.history.push(this.redirectURL, {});
  }

  async onSubmit(e) {
    const email = e.detail.json.email;
    const password = e.detail.json.password;

    try {
      await this.auth.signIn(email, password);
      this.success = true;
    } catch (e) {
      this.error = e.message;
      console.log(e);
    }
  }

  render() {
    return (
      <Host>
        <stellar-card id="sign-in" flippable={this.success} flip-icon={"false"}>
          <section>
            <stellar-form ajax onSubmitted={this.onSubmit.bind(this)}>
              <stellar-grid cols="1" noresponsive>
                <stellar-input type="email" name="email" placeholder="example@barcamp.events" label="Email Address" />
                <stellar-input type="password" name="password" placeholder="password" label="Password" />
                <stellar-button tag="submit" block>Sign in</stellar-button>
              </stellar-grid>
            </stellar-form>
          </section>
          {this.user && <section slot="back">
            <copy-wrap align="center" class="mt5">
              <stellar-avatar name={this.user.displayName} size="large" class="s-bevel" />
              <h4 class="parco mb5">Welcome back {this.user.displayName}!</h4>
              <stellar-grid class="mw6 w-80" style={{"--grid-width" : "100px", "--grid-gap": "1rem"}}>
                <stellar-button tag="route-link" href={this.redirectURL} class="mr4" block>Continue to Redirect</stellar-button>
                <stellar-button tag="route-link" href={this.redirectURL} ghost block>Dashboard</stellar-button>
              </stellar-grid>
            </copy-wrap>
          </section>}
        </stellar-card>
      </Host>
    );
  }
}

AuthenticationTunnel.injectProps(BarcampAuthChoiceSignIn, ['user']);
