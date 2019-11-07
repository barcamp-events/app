import { Component, Host, h, State } from '@stencil/core';
import Conference from '../../../models/Conference';
import Location from '../../../models/Location';

@Component({
  tag: 'barcamp-dashboard'
})
export class BarcampDashboard {
  @State() conferences: Conference[];
  @State() city: Location;

  async componentDidLoad() {
    this.getCity()
    this.getConferences()

    Conference.onNew((conferences) => {
      this.conferences = conferences;
    })
  }

  async getCity() {
    this.city = await Location.getCurrentCity();
  }

  async getConferences() {
    this.conferences = await Conference.list();
  }

  render() {
    return <Host>
        <stellar-message striped class="theme-blue sticky top-0 z-5 h-auto" closable={false}><stellar-grid class="justify-between items-center w-100 pv4 pv3-l"><p>Excuse the mess! For the most part, this app isn&rsquo;t ready.</p><div class="ml-auto-m ml-auto-l"><stellar-button tag="route-link" href="/omaha/2019/schedule" size="tiny" padding="tiny" contrast>Visit BarCamp Omaha&rsquo;s Schedule <stellar-asset name="arrow-round-forward" align="right" /></stellar-button></div></stellar-grid></stellar-message>
        <stencil-route-title title="Your Dashboard" />
        <stellar-layout class="hero" padding="large">
          <section>
            <copy-wrap>
              <h1 class="parco">BarCamp's near {this.city && this.city.name || "you"}</h1>
            </copy-wrap>
          </section>
        </stellar-layout>
        <stellar-layout size="full">
          <section>
            {this.conferences && <stellar-grid style={{"--grid-width": "400px"}}>
              {this.conferences.map(e => <barcamp-event-card conference={e} />)}
            </stellar-grid>}
            {!this.conferences && <p>Loading...</p>}
          </section>
        </stellar-layout>
      </Host>
  }
}
