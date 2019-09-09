import { Component, Host, h, Prop, Element } from '@stencil/core';
import Conference from '../../models/Conference';

@Component({
  tag: 'barcamp-event-card',
  styleUrl: 'barcamp-event-card.css'
})
export class BarcampEventCard {
  @Element() element: HTMLElement;
  @Prop() conference: Conference;

  componentDidLoad() {
    console.log(this.conference)
    this.conference.onChange(() => {
      // @ts-ignore
      this.element.forceUpdate();
    })
  }

  render() {
    return (
      <Host>
        <stellar-card>
          <header class="hero flex items-center justify-between">
            <h5 class="parco">{this.conference.name || "BarCamp Undefined"}<small class="db fs7">At {this.conference.venue.address}</small></h5>
            <div class="bg-white dm-bg-black flex flex-column tc br3 overflow-hidden shadow-1">
              <h6 class="pa2">9</h6>
              <h6 class="fs7 bg-theme-complement5 ma0 ph3 pv2 parco fw6 theme-complement0">Nov</h6>
            </div>
          </header>
          <section>
            <copy-wrap>
              <h5>Words</h5>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis quasi facere, quod nostrum voluptate animi, molestiae eum perferendis placeat magnam voluptatem praesentium voluptatum in iure inventore repellendus ad ipsa quos.</p>
            </copy-wrap>
          </section>
          <footer class="flex items-end justify-between">
            <stellar-button>Buy Tickets</stellar-button>
            <p class="fs8">123 miles away</p>
          </footer>
        </stellar-card>
      </Host>
    );
  }

}
