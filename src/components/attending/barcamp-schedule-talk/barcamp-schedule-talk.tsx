import { Component, Host, h, Prop, State, Element } from '@stencil/core';
import Talk from '../../../models/Talk';
import User from '../../../models/User';
import Track from '../../../models/Track';
import delay from 'async-delay';

@Component({
  tag: 'barcamp-schedule-talk'
})
export class BarcampScheduleTalk {
  @Element() element: HTMLElement;

  @Prop() talk: Talk;

  @State() track: Track;
  @State() speaker: User;
  @State() signingUp: User;

  @State() visible: boolean = false;
  @State() ready: boolean = false;

  async componentWillLoad() {
    this.talk.onChange(async (talk: Talk) => {
      if (!talk.signingUpKey) { talk.signingUpKey = null; }
      if (!talk.speakerKey) { talk.speakerKey = null; }

      this.talk.populate(talk);
      await this.load();
      // @ts-ignore
      this.element.forceUpdate();
    });
  }

  async load() {
    if (this.talk.speakerKey) {
      this.speaker = await User.get(this.talk.speakerKey)
    }

    if (this.talk.trackKey) {
      this.track = await Track.get(this.talk.trackKey)
    }

    if (this.talk.signingUpKey) {
      this.signingUp = await User.get(this.talk.signingUpKey)
    }
  }

  async in() {
    this.ready = false;
    await this.load();
    await delay(100);
    this.ready = true;
  }

  out() {
    this.ready = false;
  }

  render() {
    return <Host class={`db ${this.track ? `theme-${this.track.color}` : ""}`} style={{ "min-height": "12rem", "min-width": "17.5rem" }}>
      {!this.ready && <skeleton-img width={1000} height={400} block loading icon class="w-100 db ma0" />}
      {this.ready && (this.talk.signingUpKey) && !this.talk.isTaken && <barcamp-schedule-talk-signing-up readonly talk={this.talk} signingUp={this.signingUp} />}
      {this.ready && (!this.talk.signingUpKey) && !this.talk.isTaken && <barcamp-schedule-talk-available readonly talk={this.talk} />}
      {this.ready && this.talk.isTaken && <barcamp-schedule-talk-signed-up readonly talk={this.talk} speaker={this.speaker} />}
      <midwest-intersection in={this.in.bind(this)} out={this.out.bind(this)} element={this.element} />
    </Host>
  }
}