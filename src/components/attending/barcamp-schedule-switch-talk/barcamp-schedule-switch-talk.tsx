import { Component, Host, h, Element, Prop, State } from '@stencil/core';
import { MatchResults, RouterHistory } from '@stencil/router';
import AuthenticationTunnel from '../../../tunnels/authentication';
import Conference from '../../../models/Conference';
import Track from '../../../models/Track';
import Talk from '../../../models/Talk';
import delay from 'async-delay';

@Component({
  tag: 'barcamp-schedule-switch-talk'
})
export class BarcampScheduleSwitchTalk {
  @Element() element: HTMLElement;

  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;

  @Prop() user: User;

  @State() conference: Conference;
  @State() slug: string;
  @State() year: string;
  @State() tracks: Track[];

  @State() toTrackTalks: Talk[];
  @State() fromTrackTalks: Talk[];

  @State() fromTrack: string;
  @State() toTrack: string;

  @State() fromTalk: Talk;
  @State() toTalk: Talk;

  componentWillLoad() {
    this.slug = this.match.params.slug;
    this.year = this.match.params.year;
    this.loadConference();
  }

  async loadConference() {
    if (!this.year) {
      this.conference = await Conference.where(["slug", "==", this.slug], "one")
    } else {
      this.conference = await Conference.where([["slug", "==", this.slug], ["year", "==", Number(this.year)]], "one")
    }

    this.tracks = await this.conference.theTracks();

    // @ts-ignore
    this.element.forceUpdate()
  }

  async updateFromTalks (e) {
    if (e.detail !== this.fromTrack) {
      this.fromTrackTalks = undefined;
      await delay(500);
      this.fromTrack = e.detail;
      this.fromTrackTalks = await Talk.where(["trackKey", "==", e.detail], "many");
    }
  }

  async updateToTalks (e) {
    if (e.detail !== this.toTrack) {
      this.toTrackTalks = undefined;
      await delay(500);
      this.toTrack = e.detail;
      this.toTrackTalks = await Talk.where(["trackKey", "==", e.detail], "many");
    }
  }

  async pullFromTalk (e) {
    this.fromTalk = undefined;
    this.fromTalk = await Talk.get(e.detail);
  }

  async pullToTalk (e) {
    this.toTalk = undefined;
    this.toTalk = await Talk.get(e.detail);
  }

  async changeTalks() {
    await Talk.switch(this.fromTalk, this.toTalk);
  }

  render() {
    if (!this.user) {
      return <Host>
        <stellar-layout class="hero">
          <h3 class="b">Sign up, Sign in, or Continue as a Guest.</h3>
        </stellar-layout>
        <stellar-layout>
          <barcamp-auth-choices />
        </stellar-layout>
      </Host>;
    }

    return this.conference && this.tracks && <Host class="mb7">
      <stencil-route-title title="Schedule" />
      <stellar-layout class="hero z-1">
        <h3 class="b tc parco black dm-white"><stellar-animate-text>{this.conference.stylizedName} Switch A Talk</stellar-animate-text></h3>
      </stellar-layout>
      <stellar-layout size="full">
        <stellar-grid class="items-center justify-between w-100 center mb5">
          <stellar-card class="w-100">
            <header class="hero"><h5>From</h5></header>
            <section>
              <stellar-grid>
                <stellar-select overlay label="Track" autoSelectFirst placeholder="Choose a Track" onUpdate={this.updateFromTalks.bind(this)}>
                  {this.tracks.map((track) => <stellar-item value={track.key}>{track.name}</stellar-item>)}
                </stellar-select>
                {this.fromTrackTalks && <stellar-select overlay label="Talk" wrap onUpdate={this.pullFromTalk.bind(this)}>
                  {this.fromTrackTalks.map((talk) => <stellar-item value={talk.key}>
                    {talk.friendlyLength}<br />
                    {talk.title || "No title"}<br />
                  </stellar-item>)}
                </stellar-select>}
              </stellar-grid>
            </section>
          </stellar-card>
          <stellar-card class="w-100">
            <header class="hero"><h5>To</h5></header>
            <section>
              <stellar-grid>
                {this.tracks && <stellar-select overlay label="Track" autoSelectFirst placeholder="Choose a Track" onUpdate={this.updateToTalks.bind(this)}>
                  {this.tracks.map((track) => <stellar-item value={track.key}>{track.name}</stellar-item>)}
                </stellar-select>}
                {this.toTrackTalks && <stellar-select overlay label="Talk" wrap onUpdate={this.pullToTalk.bind(this)}>
                  {this.toTrackTalks.map((talk) => <stellar-item value={talk.key}>
                    {talk.friendlyLength}<br />
                    {talk.title || "No title"}<br />
                  </stellar-item>)}
                </stellar-select>}
              </stellar-grid>
            </section>
          </stellar-card>
        </stellar-grid>
      </stellar-layout>
      <stellar-layout size="full" class="sticky bottom-0 ">
        <stellar-grid class="bg-black items-center justify-between center pv4 w-100">
          <div>{this.fromTalk && <barcamp-schedule-talk talk={this.fromTalk} />}</div>
          <stellar-grid style={{"--grid-width": "auto"}} class="items-center justify-center">
            <stellar-asset name="swap" class="fs-massive tc center self-center" />
            <div class="self-center center"><stellar-button onClick={this.changeTalks.bind(this)} title="Switch">Switch</stellar-button></div>
          </stellar-grid>
          <div>{this.toTalk && <barcamp-schedule-talk talk={this.toTalk} />}</div>
        </stellar-grid>
      </stellar-layout>
    </Host>
  }

}

AuthenticationTunnel.injectProps(BarcampScheduleSwitchTalk, ['user']);
