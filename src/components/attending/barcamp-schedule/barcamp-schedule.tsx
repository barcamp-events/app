import { Component, Host, h, Prop, State } from '@stencil/core';
import Conference from '../../../models/Conference';
import AuthenticationTunnel from '../../../tunnels/authentication';
import { MatchResults, RouterHistory } from '@stencil/router';
import Track from '../../../models/Track';

@Component({
  tag: 'barcamp-schedule'
})
export class BarcampSchedule {

  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;

  @State() conference: Conference;
  @State() tracks: Track[] = [];

  @State() slug: string;
  @State() year: string;

  @State() current_track: string;

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

  render() {
    return this.conference && <Host>
      <stencil-route-title title="Schedule" />
      <stellar-layout class="hero">
        <h3 class="b">{this.conference.stylizedName}</h3>
      </stellar-layout>

      <stellar-layout size="flush" padding="none" class="sticky top-0 z-1">
        <stellar-tabs block blockIndicator size="large" class="w-100 bn" style={{"--max-width": "100%"}}>
          {this.tracks.map(track => <stellar-tab id={track.name} class="w-100">{track.name}</stellar-tab>)}
        </stellar-tabs>
      </stellar-layout>
      <div style={{"overflow-x": "auto", "overflow-y": "hidden"}} class="pl4">
        <stellar-layout size="full">
          <stellar-grid cols="4" noresponsive>
            {this.tracks.map(track => <barcamp-schedule-track track={track} />)}
          </stellar-grid>
        </stellar-layout>
      </div>
    </Host>
  }
}

AuthenticationTunnel.injectProps(BarcampSchedule, ['user']);
