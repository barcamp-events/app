import { Component, Host, Prop, h, Element, forceUpdate } from "@stencil/core";
import Dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
Dayjs.extend(isBetween);

@Component({
  tag: "barcamp-schedule-talk-group",
})
export class BarcampScheduleTalkGroup {
  @Element() element: HTMLElement;
  @Prop() entry: any;
  @Prop() active: string;

  timeout!: any;
  interval!: any;

  attachInterval() {
    this.interval = setInterval(() => {
      forceUpdate(this.element);
    }, 60 * 1000);
  }

  get isAfter() {
    return Dayjs().isAfter(
      this.entry.dayjs.add(this.entry.talks[0].talkLength, "minute")
    );
  }

  get isFarAfter() {
    return Dayjs().isAfter(
      this.entry.dayjs.add(this.entry.talks[0].talkLength * 2, "minute")
    );
  }

  get isBetween() {
    return Dayjs().isBetween(
      this.entry.dayjs,
      this.entry.dayjs.add(this.entry.talks[0].talkLength, "minute")
    );
  }

  get timeClasses() {
    return `text-${this.isBetween ? "black" : "gray-11"} dm:text-${
      this.isBetween ? "white" : "gray-3"
    }`;
  }

  render() {
    if (this.isFarAfter) {
      return <Host class="hidden" />;
    }

    return (
      !this.isFarAfter && (
        <Host class={`block ${this.isAfter ? "o-50 grayscale noclick" : ""}`}>
          <p class={`mb-2 ${this.timeClasses}`}>
            {this.entry.dayjs.format("h:mma")}
            {this.isBetween && " • Happening now!"}
          </p>
          <midwest-grid style={{ "--grid-width": "17.5rem" }}>
            {this.entry.talks.map((talk) => (
              <barcamp-schedule-talk
                talk={talk}
                class={
                  this.active === "all" || this.active === talk.trackTitle
                    ? "block"
                    : "hidden"
                }
              />
            ))}
          </midwest-grid>
        </Host>
      )
    );
  }
}
