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

  async componentWillLoad() {
    if (this.talk.speakerKey) {
      this.speaker = await User.get(this.talk.speakerKey)
    }

    if (this.talk.signingUpKey) {
      this.signingUp = await User.get(this.talk.signingUpKey)
      this.startCountdown();
    }

    this.talk.onChange(async (talk: Talk) => {
      this.talk.populate(talk);

      if (this.talk.speakerKey) {
        this.speaker = await User.get(this.talk.speakerKey);
      }

      if (this.talk.signingUpKey) {
        this.signingUp = await User.get(this.talk.signingUpKey)
      }

      // @ts-ignore
      this.element.forceUpdate();
    });
  }

  startCountdown() {
    setTimeout(async () => {
      this.talk.signingUpKey = null;
      await this.talk.save();
    }, 300000)
  }

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

  renderTalk() {
    return <stellar-card>
      <header class="hero">
        <h5>{this.talk.title}</h5>
      </header>
      <section>
        <copy-wrap>
          <h5>{this.talk.title}</h5>
          <p>{this.talk.description}</p>
        </copy-wrap>
      </section>
      <footer class="flex items-center justify-between">
        <p>{this.signingUp && this.signingUp.displayName}</p>
        <stellar-avatar name={this.signingUp && this.signingUp.displayName} />
      </footer>
    </stellar-card>
  }

  renderSigningUp() {
    return <stellar-card>
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
  }

  renderAvailableTalk() {
    return <stellar-card flippable onFlip={this.flipped.bind(this)} flip_icon={""}>
      <section class="flush hero">
        <copy-wrap align="center" class="ma3">
          <h6>No one</h6>
          <p>Looks like this time slot is empty.</p>
        </copy-wrap>
      </section>
      <footer>
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
  }

  render() {
    return <Host>
      {(this.talk.is_signing_up && this.talk.signingUpKey !== this.user.key) && !this.talk.is_taken && this.renderSigningUp()}
      {(!this.talk.is_signing_up || this.talk.signingUpKey === this.user.key) && !this.talk.is_taken && this.renderAvailableTalk()}
      {this.talk.is_taken && this.renderTalk()}
    </Host>
  }
}

AuthenticationTunnel.injectProps(BarcampScheduleTalk, ['user']);
