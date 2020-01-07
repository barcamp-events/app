import { Component, Host, h, Prop, Element } from '@stencil/core';
import Talk from '../../../models/Talk';
import User from '../../../models/User';

@Component({
  tag: 'barcamp-schedule-talk-signing-up'
})
export class BarcampScheduleTalkSigningUp {
  @Element() element: HTMLElement;

  @Prop() talk: Talk;
  @Prop() user: User;
  @Prop() readonly: boolean = false;

  @Prop() signingUp: User;

  render() {
    return <Host class="dc">
      <stellar-card style={{ "opacity": "0.75", "filter": "grayscale(1)" }}>
        <header class="hero">
          <h5>Incoming...</h5>
        </header>
        <section>
          <copy-wrap align="center">
            <p>Someone is signing up for this talk right now!</p>
          </copy-wrap>
        </section>
        <footer class="flex items-center justify-between">
          <p>{this.signingUp && this.signingUp.displayName}</p>
          <stellar-avatar name={this.signingUp && this.signingUp.displayName} />
        </footer>
      </stellar-card>
    </Host>
  }

}
