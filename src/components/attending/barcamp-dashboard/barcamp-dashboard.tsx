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
