import { Component, Host, h, Prop, State, Method, Element } from '@stencil/core';
import Conference from '../../../models/Conference';
import AuthenticationTunnel from '../../../tunnels/authentication';
import { MatchResults, RouterHistory } from '@stencil/router';
import Track from '../../../models/Track';
import delay from 'async-delay';

@Component({
  tag: 'barcamp-schedule'
})
export class BarcampSchedule {
  @Element() element: HTMLElement;

  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;

  @Prop() user: User;

  @State() conference: Conference;
  @State() tracks: Track[] = [];

  @State() slug: string;
  @State() year: string;

  @State() activeTab: string = "all";

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

    this.conference.onChange(async (conference) => {
      this.conference.populate(conference);
      this.tracks = await this.conference.theTracks();
    })
  }

  @Method()
  async getConference() {
    return this.conference;
  }

  async displayTrack (e) {
    this.activeTab = undefined;
    await delay(100);
    this.activeTab = e.detail.name;
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

    return this.conference && <Host>
      <stencil-route-title title="Schedule" />
      <stellar-layout class="hero">
        <h3 class="b">{this.conference.stylizedName}</h3>
      </stellar-layout>

      <stellar-layout size="flush" padding="none" class="sticky top-0 z-1">
        <stellar-tabs block blockIndicator size="large" class="w-100 bn relative" style={{"--max-width": "100%"}}>
          <stellar-tab name="all" dark class="w-100" open onContentChange={this.displayTrack.bind(this)}>All Tracks</stellar-tab>
          {this.tracks.map(track => <stellar-tab name={track.name.toLowerCase()} class="w-100" onContentChange={this.displayTrack.bind(this)}>{track.name}</stellar-tab>)}
        </stellar-tabs>
      </stellar-layout>
      <div style={{"overflow-x": "auto", "overflow-y": "hidden"}} class={"pl4"}>
        <stellar-layout size={(this.activeTab === "all") ? "full" : "small"}>
          <stellar-grid cols={(this.activeTab === "all") ? "4" : "1"} noresponsive>
            {this.tracks.map(track => <barcamp-schedule-track track={track} class={(this.activeTab === "all" || this.activeTab === track.name.toLowerCase()) ? "dc w-100" : "dn"} />)}
          </stellar-grid>
        </stellar-layout>
      </div>
    </Host>
  }
}

AuthenticationTunnel.injectProps(BarcampSchedule, ['user']);
