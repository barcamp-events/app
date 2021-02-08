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
    this.getUpcomingConferences()

    Conference.onNew((conferences) => {
      this.conferences = conferences;
    })
  }

  async getCity() {
    this.city = await Location.getCurrentCity();
  }

  async getUpcomingConferences() {
    this.conferences = await Conference.upcoming();
  }

  render() {
    return <Host>
        <stencil-route-title title="Your Dashboard" />
        <midwest-layout class="hero" padding="large">
          <section>
            <h1 class="parco dm:text-base-0 m-auto text-center">BarCamp's near {this.city && this.city.name || "you"}</h1>
          </section>
        </midwest-layout>
        <midwest-layout size="full">
          <section>
            {this.conferences && <midwest-grid style={{"--grid-width": "400px"}}>
              {this.conferences.map(e => <barcamp-event-card conference={e} />)}
            </midwest-grid>}
            {!this.conferences && <p class="dm:text-white">Loading...</p>}
            {this.conferences.length === 0 && <p class="dm:text-white">Nothing!</p>}
          </section>
        </midwest-layout>
      </Host>
  }
}
