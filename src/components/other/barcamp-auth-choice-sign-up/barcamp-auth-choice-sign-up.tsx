import { Component, Host, h, State, Element, Prop } from '@stencil/core';
import delay from "async-delay";
import { RouterHistory } from '@stencil/router';
import AuthenticationTunnel from '../../../tunnels/authentication';
import Authentication from '../../../models/Authentication';

@Component({
  tag: "barcamp-auth-choice-sign-up",
  styleUrl: "barcamp-auth-choice-sign-up.css",
})
export class BarcampAuthChoiceSignUp {
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
    const displayName = e.detail.json.name;

    try {
      await this.auth.createNewUser(email, password, { displayName });
      this.success = true;
      await delay(100);
      await this.card.flip_card();
    } catch (e) {
      this.error = e.message;
    }
  }

  render() {
    return (
      <Host>
        <midwest-card
          ref={(el) => (this.card = el)}
          id="sign-up"
          flippable={this.success}
          flip-icon={"false"}
          style={{ "--border": "none" }}
        >
          <section>
            <midwest-form ajax onSubmitted={this.onSubmit.bind(this)}>
              <midwest-grid cols="1" noresponsive>
                <midwest-input
                  name="name"
                  placeholder="BarCamp Events"
                  label="Your Name"
                />
                <midwest-input
                  type="email"
                  name="email"
                  placeholder="example@barcamp.events"
                  label="Your Email Address"
                />
                <midwest-input
                  type="password"
                  name="password"
                  placeholder="password"
                  label="Your Password"
                />
                <midwest-button tag="submit" block>
                  Sign Up
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
                  shape="circle"
                />
                <h4 class="parco text-black dm:text-white ">
                  Welcome to BarCamp Events, {this.user.displayName}!
                </h4>
                <midwest-button tag="stencil-route" href="/">
                  Continue
                </midwest-button>
              </copy-wrap>
            </section>
          )}
        </midwest-card>
      </Host>
    );
  }
}
AuthenticationTunnel.injectProps(BarcampAuthChoiceSignUp, ['user']);
