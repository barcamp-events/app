import { Component, Host, h, Prop, Element } from '@stencil/core';
import Talk from '../../models/Talk';
import User from '../../models/User';
import AuthenticationTunnel from '../../tunnels/authentication';

@Component({
  tag: 'barcamp-schedule-talk-available'
})
export class BarcampScheduleTalkAvailable {
  @Element() element: HTMLElement;

  @Prop() talk: Talk;
  @Prop() user: User;

  async flipped(e) {
    if (e.target.flipped) {
      this.talk.signingUpKey = this.user.key;
    } else {
      this.talk.signingUpKey = null;
    }

    await this.talk.save();
  }

  flipCard() {
    this.element.querySelector('stellar-card').flip_card();
  }

  addTalk(e) {
    this.talk.populate(e.detail.json);
    this.talk.save()
  }

  render() {
    return <Host class="dc">
      <stellar-card flippable onFlip={this.flipped.bind(this)} flip_icon={""}>
        <section class="flush hero">
          <copy-wrap align="center" class="ma3">
            <h6>No one</h6>
            <p>Looks like this time slot is empty.</p>
          </copy-wrap>
        </section>
        <footer class="flex items-center justify-between">
          <stellar-button block onClick={this.flipCard.bind(this)} ghost>Sign up for this slot!</stellar-button>
        </footer>
        <section slot="back">
          <stellar-form ajax onSubmitted={this.addTalk.bind(this)}>
            <h5>{this.talk.time}</h5>
            <stellar-grid >
              <stellar-input type="hidden" name="key" value={this.talk.key} />
              <stellar-input type="hidden" name="speakerKey" value={this.user.key} />
              <stellar-input name="title" label="Title" placeholder="Food Court" />
              <stellar-input type="textarea" name="description" label="Describe your talk" placeholder="Is a hot dog a sandwich?" />
              <stellar-button tag="submit">Add your talk</stellar-button>
            </stellar-grid>
          </stellar-form>
        </section>
      </stellar-card>
    </Host>
  }

}

AuthenticationTunnel.injectProps(BarcampScheduleTalkAvailable, ['user']);
