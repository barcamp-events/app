import { Component, Host, h, State } from '@stencil/core';
import ConferenceTunnel from '../../../tunnels/conference';

@Component({
  tag: 'barcamp-host-find-venue'
})
export class BarcampHostFindVenue {

  @State() conference: Conference;
  @State() type: string = "online";

  handleChange(e) {
    if (e.detail) {
      this.type = e.detail
    }
  }

  render() {
    return <Host>
      <midwest-layout type="supporting-content" class="align-start" size="large">
        <section>
          <midwest-card>
            <header>
              <h3 class="parco italic dm:text-white">Find your Venue</h3>
            </header>
            <section>
              <midwest-form ajax>
                <midwest-toggle block stacked type="radio" onUpdate={this.handleChange.bind(this)}>
                  <midwest-item class="dm:bg-black" value="online" checked={this.conference.type === "online"}>
                    <copy-wrap class="p-4">
                      <h1 class="parco italic dm:text-base-1">Online</h1>
                      <p class="dm:text-base-3">You'll exclusively have your talks hosted online. This option will have you use Konf.co to attach your live stream feeds to this app. </p>
                    </copy-wrap>
                  </midwest-item>
                  <midwest-item class="dm:bg-black" value="in-person" checked={this.conference.type === "in-person"}>
                    <copy-wrap class="p-4">
                      <h1 class="parco italic dm:text-base-1">In-Person</h1>
                      <p class="dm:text-base-3">You won't have any online streaming. We'll help you find a good physical venue. </p>
                    </copy-wrap>
                  </midwest-item>
                  <midwest-item class="dm:bg-black" value="hybrid" checked={this.conference.type === "hybrid"}>
                    <copy-wrap class="p-4">
                      <h1 class="parco italic dm:text-base-1">Hybrid</h1>
                      <p class="dm:text-base-3">We'll help you serve both In-Person and Online avenues. This option will have you use Konf.co to attach your live stream feeds to this app. </p>
                    </copy-wrap>
                  </midwest-item>
                </midwest-toggle>
              </midwest-form>
            </section>
          </midwest-card>
        </section>
        <aside class="sticky top-0 bottom-0 m-auto mt-0">
          <barcamp-host-event-preview conference={this.conference} type={this.type} showVenue showBudget />
        </aside>
      </midwest-layout>
    </Host>
  }
}

ConferenceTunnel.injectProps(BarcampHostFindVenue, ["conference"])