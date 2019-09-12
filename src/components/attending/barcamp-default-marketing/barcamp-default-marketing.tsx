import { Component, Host, h, State, Prop } from '@stencil/core';
import { RouterHistory, MatchResults } from '@stencil/router';
import Conference from '../../../models/Conference'

@Component({
  tag: 'barcamp-default-marketing'
})
export class BarcampDefaultMarketing {

  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;

  @State() conference: Conference;
  @State() slug: string;
  @State() year: string;

  componentWillLoad() {
    this.slug = this.match.params.slug;
    this.year = this.match.params.year;

    console.log(this.slug, this.year)

    this.loadConference();
  }

  async loadConference() {
    if (!this.year) {
      this.conference = await Conference.where(["slug", "==", this.slug], "one")
    } else {
      this.conference = await Conference.where([["slug", "==", this.slug], ["year", "==", Number(this.year)]], "one")
    }

    console.log(this.conference)
  }

  render() {
    return (
      <Host>
        <stencil-route-title title="Your Dashboard" />
        <stellar-layout>
          Hero
        </stellar-layout>
        <stellar-layout>
          About
        </stellar-layout>
        <stellar-layout>
          {this.conference && this.conference.venue.address}
        </stellar-layout>
        <stellar-layout>
          Tracks
        </stellar-layout>
        <stellar-layout>
          Agenda
        </stellar-layout>
        <stellar-layout>
          FAQ's
        </stellar-layout>
        <stellar-layout>
          Sponsors
        </stellar-layout>
        <stellar-layout>
          Get a reminder/CTA
        </stellar-layout>
      </Host>
    );
  }

}
