import { Component, Host, h, Prop, State, Element } from '@stencil/core';
import Talk from '../../models/Talk';
import User from '../../models/User';
import AuthenticationTunnel from '../../tunnels/authentication';

@Component({
  tag: 'barcamp-schedule-talk'
})
export class BarcampScheduleTalk {
  @Element() element: HTMLElement;

  @Prop() talk: Talk;
  @Prop() user: User;

  @State() speaker: User;
  @State() signingUp: User;

  @State() visible: boolean = false;

  async componentWillLoad() {
    if (this.talk.speakerKey) {
      this.speaker = await User.get(this.talk.speakerKey)
    }

    if (this.talk.signingUpKey) {
      this.signingUp = await User.get(this.talk.signingUpKey)
    }

    this.talk.onChange(async (talk: Talk) => {
      if (!talk.signingUpKey) { talk.signingUpKey = null; }
      if (!talk.speakerKey) { talk.speakerKey = null; }

      this.talk.populate(talk);

      if (this.talk.signingUpKey) {
        this.signingUp = await User.get(this.talk.signingUpKey)
      }

      if (this.talk.speakerKey) {
        this.speaker = await User.get(this.talk.speakerKey);
      }

      // @ts-ignore
      this.element.forceUpdate()
    });
  }

  in() { this.visible = true; }
  out() { this.visible = false; }

  render() {
    return <Host class="db">
      {this.visible && this.talk.isAvailable && <barcamp-schedule-talk-available talk={this.talk} />}

      {this.visible && this.talk.isSigningUp && <barcamp-schedule-talk-signing-up talk={this.talk} signingUp={this.signingUp} /> }

      {this.visible && this.talk.isTaken && <barcamp-schedule-talk-signed-up talk={this.talk} speaker={this.speaker} />}

      <stellar-intersection in={this.in.bind(this)} out={this.out.bind(this)} element={this.element} />
    </Host>
  }
}

AuthenticationTunnel.injectProps(BarcampScheduleTalk, ['user']);
