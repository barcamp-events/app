import {
  Component,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
  Element,
  State,
  forceUpdate,
} from "@stencil/core";
import Dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

Dayjs.extend(relativeTime);

@Component({
  tag: "count-down",
  shadow: true,
})
export class CountDown {
  @Element() el: HTMLElement;
  @Prop() time: DayjsType;
  @State() timing: string;

  @Event() ready: EventEmitter;

  interval!: any;

  componentWillLoad() {
    this.timing = this.time.fromNow(true);
    this.interval = setInterval(() => {
      this.timing = this.time.fromNow(true);

      if (this.time.isAfter) {
        this.ready.emit();
        clearInterval(this.interval);
      } else {
        forceUpdate(this.el);
      }
    }, 1000);
  }

  render() {
    return this.time && <Host>{this.timing}</Host>;
  }
}
