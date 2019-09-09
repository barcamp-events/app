import { Component, Host, h, State, Prop, Element } from '@stencil/core';
import Authentication from '../../../models/Authentication';
import { RouterHistory } from '@stencil/router';
import delay from "async-delay";
import AuthenticationTunnel from '../../../tunnels/authentication';

@Component({
  tag: 'barcamp-auth'
})
export class BarcampAuth {
  @Element() element: HTMLElement;
  @Prop() history: RouterHistory;

  @State() auth = new Authentication;
  @State() user: User;

  @State() signUpSuccess: boolean = false;
  @State() signInSuccess: boolean = false;
  @State() error: string;
  @State() step: number = 0;
  @State() redirectURL: string;

  @State() signInCard: HTMLStellarCardElement;
  @State() signUpCard: HTMLStellarCardElement;

  componentWillLoad() {
    const urlParams = new URLSearchParams(window.location.search);
    this.redirectURL = urlParams.get('redirect') ? decodeURI(urlParams.get('redirect')) : '/';

    Authentication.onAuthStateChanged(({user}) => {
      if (user) {
        this.redirect();
      }
    });

    window.addEventListener('auth_error', (e: CustomEvent) => {
      this.error = e.detail.message;
      this.step = 1;
    });
  }

  redirect () {
    this.history.push(this.redirectURL, {});
  }

  componentDidLoad() {
    this.signInCard = this.element.querySelector('stellar-card#sign-in')
    this.signUpCard = this.element.querySelector('stellar-card#sign-up')
  }

  async onSignIn(e) {
    const email = e.detail.json.email;
    const password = e.detail.json.password;

    await this.auth.signIn(email, password);

    this.signInSuccess = true;
    await delay(100);
    await this.signInCard.flip_card();
  }

  async onSignUp(e) {
    const email = e.detail.json.email;
    const password = e.detail.json.password;
    const displayName = e.detail.json.name;

    await this.auth.createNewUser(email, password, { displayName });

    this.signUpSuccess = true;
    await delay(100);

    await this.signUpCard.flip_card();
  }

  render() {
    return <Host>
      <stencil-route-title title="Sign up or Sign in" />
      <stellar-layout class="hero" size="flush" padding="large">
        <stellar-layout>
          <copy-wrap align="center">
            <h1 class="parco i">BarCamp Events</h1>
          </copy-wrap>
        </stellar-layout>
        <stellar-layout type="half">
          <stellar-card id="sign-in" flippable={this.signInSuccess} flip_icon={undefined}>
            <header>
              <copy-wrap align="center">
                <h5 class="parco i">Sign in</h5>
              </copy-wrap>
            </header>
            <section>
              <stellar-form ajax onSubmitted={this.onSignIn.bind(this)}>
                <stellar-grid>
                  <stellar-input type="email" name="email" placeholder="example@barcamp.events" label="Email Address" />
                  <stellar-input type="password" name="password" placeholder="password" label="Password" />
                  <stellar-button tag="submit" block>Sign in</stellar-button>
                </stellar-grid>
              </stellar-form>
            </section>
            {this.user && <section slot="back">
              <copy-wrap align="center" class="mt5">
                <stellar-avatar name={this.user.displayName} size="large" shape="circle" />
                <h4 class="parco">Welcome back {this.user.displayName}!</h4>
              </copy-wrap>
            </section>}
          </stellar-card>

          <stellar-card id="sign-up" flippable={this.signUpSuccess}>
            <header>
              <copy-wrap align="center">
                <h5 class="parco i">Sign up</h5>
              </copy-wrap>
            </header>
            <section>
              <stellar-form ajax onSubmitted={this.onSignUp.bind(this)}>
                <stellar-grid>
                  <stellar-input name="name" placeholder="BarCamp Events" label="Your Name" />
                  <stellar-input type="email" name="email" placeholder="example@barcamp.events" label="Your Email Address" />
                  <stellar-input type="password" name="password" placeholder="password" label="Your Password" />
                  <stellar-button tag="submit" block>Sign Up</stellar-button>
                </stellar-grid>
              </stellar-form>
            </section>
            {this.user && <section slot="back">
              <h2>Welcome to BarCamp Events!</h2>
            </section>}
          </stellar-card>
        </stellar-layout>
      </stellar-layout>
    </Host>
  }
}

AuthenticationTunnel.injectProps(BarcampAuth, ['user']);
