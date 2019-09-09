import { Component, Host, h, State } from '@stencil/core';
import Conference from '../../../models/Conference';
import Location from '../../../models/Location';

@Component({
  tag: 'barcamp-dashboard'
})
export class BarcampDashboard {
  @State() conferences: Conference[];
  @State() city: Location;

  async componentWillLoad() {
    this.conferences = await Conference.list();
    this.city = await Location.getCurrentCity();

    Conference.onChange(() => {

    })
  }

  render() {
    return (
      <Host>
        <stencil-route-title title="Your Dashboard" />
        <stellar-layout class="hero" padding="large">
          <section>
            <copy-wrap>
              <h1 class="parco">BarCamp's near {this.city.name}</h1>
            </copy-wrap>
          </section>
        </stellar-layout>
        <stellar-layout>
          <section>
            <stellar-grid>
              {this.conferences.map(e => <barcamp-event-card conference={e} />)}
            </stellar-grid>
          </section>
        </stellar-layout>
      </Host>
    );
  }

}
