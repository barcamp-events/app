import { Component, Host, Prop, h, Element } from '@stencil/core';
import Dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
Dayjs.extend(isBetween)

@Component({
  tag: 'barcamp-schedule-talk-group'
})
export class BarcampScheduleTalkGroup {
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

  get isAfter() {
    return Dayjs().isAfter(this.entry.dayjs.add(this.entry.talks[0].talkLength, 'minute'));
  }

  get isFarAfter() {
    return Dayjs().isAfter(this.entry.dayjs.add((this.entry.talks[0].talkLength * 2), 'minute'));
  }

  get isBetween() {
    return Dayjs().isBetween(this.entry.dayjs, this.entry.dayjs.add(this.entry.talks[0].talkLength, 'minute'))
  }

  render() {
    if (this.isFarAfter) {
      return <Host class="dn" />;
    }

    return !this.isFarAfter && <Host class={`db ${this.isAfter ? "o-50 grayscale noclick" : "dn"}`}>
      <p>{this.entry.dayjs.format("h:mma")}</p>
      <midwest-grid style={{ "--grid-width": "17.5rem" }}>
        {this.entry.talks.map(talk => <barcamp-schedule-talk talk={talk} class={(this.active === "all" || this.active === talk.trackTitle) ? "db" : "dn"} />)}
      </midwest-grid>
    </Host>
  }

}
