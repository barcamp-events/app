import { Component, Host, h, State, Element, Prop } from '@stencil/core';
import delay from "async-delay";
import { RouterHistory } from '@stencil/router';
import Authentication from '../../models/Authentication';
import AuthenticationTunnel from '../../tunnels/authentication';

@Component({
  tag: 'barcamp-auth-choice-sign-in',
})
export class BarcampAuthChoiceSignIn {
  @Element() element: HTMLElement;

  @Prop() history: RouterHistory;
  @Prop() user: User;
  @Prop() auth: Authentication = new Authentication;

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
  }

  componentDidLoad() {
    this.card = this.element.querySelector('stellar-card')
  }

  redirect () {
    this.history.push(this.redirectURL, {});
  }

  async onSubmit(e) {
    const email = e.detail.json.email;
    const password = e.detail.json.password;

    console.log(e.detail.json);

    try {
      const result = await this.auth.signIn(email, password);
      console.log(result);
      this.success = true;
      await delay(100);
      await this.card.flip_card();
    } catch (e) {
      this.error = e.message;
      console.log(e);
    }
  }

  render() {
    return (
      <Host>
        <stellar-card id="sign-in" flippable={this.success} flip_icon={undefined}>
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
              <stellar-avatar name={this.user.displayName} size="large" shape="circle" />
              <h4 class="parco">Welcome back {this.user.displayName}!</h4>
            </copy-wrap>
          </section>}
        </stellar-card>
      </Host>
    );
  }
}

AuthenticationTunnel.injectProps(BarcampAuthChoiceSignIn, ['user']);
