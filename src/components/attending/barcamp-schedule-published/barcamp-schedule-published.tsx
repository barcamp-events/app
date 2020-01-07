import { Component, Host, Prop, h, Element } from '@stencil/core';
import Dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
Dayjs.extend(isBetween)

@Component({
  tag: 'barcamp-schedule-published'
})
export class BarcampSchedulePublished {
  @Element() element: HTMLElement;
  @Prop() entry: any;
  @Prop() active: string;

  timeout!: any;
  interval!: any;

  attachInterval() {
    this.interval = setInterval(() => {
      // @ts-ignore
      this.element.forceUpdate()
    }, 60 * 1000);
  }

  render() {
    return <Host class="db">
      <p>{this.entry.dayjs.format("h:mma")}</p>
      <stellar-grid style={{ "--grid-width": "17.5rem" }}>
        {this.entry.talks.map(talk => <barcamp-schedule-talk talk={talk} class={(this.active === "all" || this.active === talk.trackTitle) ? "db" : "dn"} />)}
      </stellar-grid>
    </Host>
  }
}