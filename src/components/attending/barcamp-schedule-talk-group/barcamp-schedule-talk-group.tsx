import { Component, Host, Prop, h, Element, Listen } from '@stencil/core';
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

  componentDidLoad () {
    if (this.isBetween) {
      this.scroll()
    }

    this.attachInterval();
  }

  async scroll () {
    const top = this.element.offsetTop + (this.element.offsetHeight / 2);

    if (window.scrollY !== top) {
      await (await document.querySelector("web-audio").source("chime")).play()
      window.scrollTo({ behavior: "smooth", top })
    }
  }

  @Listen("mousemove", {target: "window"})
  @Listen("keypress", {target: "window"})
  handleActivity() {
    // @ts-ignore
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      if (this.isBetween) {
        this.scroll()
      }
    }, 15 * 1000);
  }

  attachInterval() {
    this.interval = setInterval(() => {
      if (this.isBetween) {
        this.scroll()
      }

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
      <stellar-grid style={{"--grid-width": "17.5rem"}}>
        {this.entry.talks.map(talk => <barcamp-schedule-talk talk={talk} class={(this.active === "all" || this.active === talk.trackTitle) ? "db" : "dn"} />)}
      </stellar-grid>
    </Host>
  }

}
