import { Component, Host, h, Element, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import Authentication from '../../models/Authentication';
import delay from 'async-delay';
import AuthenticationTunnel from '../../tunnels/authentication';

@Component({
  tag: 'barcamp-auth-choice-guest',
  styleUrl: 'barcamp-auth-choice-guest.css'
})
export class BarcampAuthChoiceGuest {
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

  async onSubmit() {
    try {
      await this.auth.signInAsGuest();

      this.success = true;
      await delay(100);

      await this.card.flip_card();
    } catch (e) {
      this.error = e.message;
    }
  }
  render() {
    return <Host>
      <stellar-card id="guest" flippable={this.success}>
        <section>
          <stellar-form ajax onSubmitted={this.onSubmit.bind(this)}>
            <stellar-grid cols="1" noresponsive>
              <h5 class="tc lh-copy">Don't want to deal with this right now? <br />I got you fam.</h5>
              <stellar-button tag="submit" block>Sign in as a Guest</stellar-button>
            </stellar-grid>
          </stellar-form>
        </section>
        {this.user && <section slot="back">
          <h3 class="tc lh-copy">Welcome to BarCamp Events!</h3>
        </section>}
      </stellar-card>
    </Host>;
  }
}

AuthenticationTunnel.injectProps(BarcampAuthChoiceGuest, ['user']);
