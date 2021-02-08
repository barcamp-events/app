import { Component, Host, h, State } from '@stencil/core';
import Conference from '../../../models/Conference';
import delay from 'async-delay';

@Component({
  tag: 'upcoming-barcamps'
})
export class UpcomingBarcamps {

  @State() conferences: Conference[];

  async componentDidLoad() { 
    await delay(200)
    this.conferences = await Conference.upcoming();
  }

  render() {
    return <Host>
        <stellar-layout class="bb border-base-2 dm-border-base-7" padding="large">
          <copy-wrap align="center">
            <h2 class="parco">Upcoming BarCamp Events</h2>
        </copy-wrap>
        {this.conferences && this.conferences.map(conf => <div class="bt bb pa2 border-base-5 flex flex-column flex-row-m flex-row-l space-between items-center">
          <div class="w-100">
            <h4 class="parco i">{conf.name}</h4>
            <p>{conf.venue.address}</p>
            <p>{conf.start.format("MMMM DD, h:mma")} to {conf.end.format("h:mma")}</p>
          </div>
          <stellar-grid style={{"--grid-width": "70px", "--grid-gap": "1rem"}} class="mt3 w-100">
            <stellar-button href={conf.site_link} tag="link" block target="_blank">Site</stellar-button>
            <stellar-button href={conf.ticket_link} tag="link" block target="_blank">Tickets</stellar-button>
            <stellar-button href={conf.schedule_link} tag="link" block target="_blank">Schedule</stellar-button>
          </stellar-grid>
        </div>)}
        {!this.conferences && <copy-wrap align="center">
          <p>One moment...</p>
          <stellar-progress indeterminate />
        </copy-wrap>}
        </stellar-layout>
      </Host>
  }

}