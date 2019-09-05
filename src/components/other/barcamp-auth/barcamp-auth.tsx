import { Component, Host, h, State, Prop } from '@stencil/core';
import Authentication from '../../../models/Authentication';
import { RouterHistory } from '@stencil/router';

@Component({
  tag: 'barcamp-auth'
})
export class BarcampAuth {
  @Prop() history: RouterHistory;

  @State() auth = new Authentication;

  @State() signUpSuccess: boolean = false;
  @State() signInSuccess: boolean = false;
  @State() error: string;
  @State() step: number = 0;

  componentWillLoad() {
    Authentication.onAuthStateChanged(({user}) => {
      console.log('come on', user);

      if (user) {
        const urlParams = new URLSearchParams(window.location.search);
        const redirect = urlParams.get('then') ? decodeURI(urlParams.get('then')) : '/'
        this.history.push(redirect, {});
      }
    })

    window.addEventListener('auth_error', (e: CustomEvent) => {
      this.error = e.detail.message;
      this.step = 1;
    });
  }

  async onSignIn(e) {
    const email = e.detail.json.email;
    const password = e.detail.json.password;

    await this.auth.signIn(email, password);

    this.signInSuccess = true;
  }

  async onSignUp(e) {
    const email = e.detail.json.email;
    const password = e.detail.json.password;
    const displayName = e.detail.json.name;

    await this.auth.createNewUser(email, password, {displayName});

    this.signUpSuccess = true;
  }

  render() {
    return (
      <Host>
        <stencil-route-title title="Sign up or Sign in" />
        <stellar-layout class="hero" size="flush" padding="large">
          <stellar-layout>
            <copy-wrap align="center">
              <h1 class="parco i">BarCamp Events</h1>
            </copy-wrap>
          </stellar-layout>
          <stellar-layout type="half">
            <stellar-card>
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
            </stellar-card>

            <stellar-card>
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
            </stellar-card>
          </stellar-layout>
        </stellar-layout>
      </Host>
    );
  }
}
