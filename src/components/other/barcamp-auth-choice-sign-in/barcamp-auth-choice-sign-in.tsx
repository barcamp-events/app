import { Component, Host, h, State, Element, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import Authentication from '../../../models/Authentication';
import delay from 'async-delay';
import AuthenticationTunnel from '../../../tunnels/authentication';

@Component({
  tag: "barcamp-auth-choice-sign-in",
})
export class BarcampAuthChoiceSignIn {
  @Element() element: HTMLElement;

  @Prop() history: RouterHistory;
  @Prop() user: User;
  @State() auth: Authentication = window["Authentication"] as Authentication;

  @State() success: boolean = false;
  @State() error: string;
  @State() step: number = 0;

  @State() redirectURL: string;

  card!: HTMLMidwestCardElement;

  componentWillLoad() {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get("redirect")) {
      this.redirectURL = urlParams.get("redirect")
        ? decodeURI(urlParams.get("redirect"))
        : "/";
    }

    Authentication.onAuthStateChanged(async (user) => {
      if (!!user.firebaseUser && !!user.user) {
        this.success = true;
        await delay(100);
        await this.card.flip_card();
      }
    });
  }

  redirect() {
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
    }
  }

  render() {
    return (
      <Host>
        <midwest-card
          ref={(el) => (this.card = el)}
          id="sign-in"
          flippable={this.success}
          flip-icon={"false"}
          style={{ "--border": "none" }}
        >
          <section>
            <midwest-form ajax onSubmitted={this.onSubmit.bind(this)}>
              <midwest-grid cols="1" noresponsive>
                <midwest-input
                  type="email"
                  name="email"
                  placeholder="example@barcamp.events"
                  label="Email Address"
                />
                <midwest-input
                  type="password"
                  name="password"
                  placeholder="password"
                  label="Password"
                />
                <midwest-button tag="submit" block>
                  Sign in
                </midwest-button>
              </midwest-grid>
            </midwest-form>
          </section>
          {this.user && (
            <section slot="back">
              <copy-wrap align="center" class="mt-5">
                <midwest-avatar
                  name={this.user.displayName}
                  size="large"
                  class="s-bevel"
                />
                <h4 class="parco text-black dm:text-white mb-5">
                  Welcome back {this.user.displayName}!
                </h4>
                <midwest-grid
                  class="mw6 w-80"
                  style={{ "--grid-width": "100px", "--grid-gap": "1rem" }}
                >
                  <midwest-button
                    tag="stencil-route"
                    href={this.redirectURL}
                    class="mr-4"
                    block
                  >
                    Continue to Redirect
                  </midwest-button>
                  <midwest-button
                    tag="stencil-route"
                    href={this.redirectURL}
                    ghost
                    block
                  >
                    Dashboard
                  </midwest-button>
                </midwest-grid>
              </copy-wrap>
            </section>
          )}
        </midwest-card>
      </Host>
    );
  }
}

AuthenticationTunnel.injectProps(BarcampAuthChoiceSignIn, ['user']);
