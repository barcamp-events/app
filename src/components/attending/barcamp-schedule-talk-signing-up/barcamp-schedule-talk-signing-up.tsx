import { Component, Host, h, Prop, Element } from "@stencil/core";
import Talk from "../../../models/Talk";
import User from "../../../models/User";

@Component({
  tag: "barcamp-schedule-talk-signing-up",
})
export class BarcampScheduleTalkSigningUp {
  @Element() element: HTMLElement;

  @Prop() talk: Talk;
  @Prop() user: User;
  @Prop() readonly: boolean = false;

  @Prop() signingUp: User;

  refreshable;
  timeEl;

  componentWillLoad() {
    this.refreshable = setInterval(() => {
      this.timeEl.value = undefined;
      this.timeEl.value = this.talk.claimedAt;
      this.timeEl.forceUpdate();
    }, 2000);
  }

  disconnectedCallback() {
    clearInterval(this.refreshable);
  }

  render() {
    return (
      <Host class="dc">
        <midwest-card
          padding="small"
          style={{ opacity: "0.75", filter: "grayscale(1)" }}
        >
          <header class="hero">
            <h5 class="text-black dm:text-white">Incoming...</h5>
            <h5 class="text-black dm:text-white">
              <midwest-time
                ref={(el) => (this.timeEl = el)}
                value={this.talk.claimedAt}
                relative
              />
            </h5>
          </header>
          <section>
            <copy-wrap align="center">
              <p>Someone is signing up for this talk right now!</p>
            </copy-wrap>
          </section>
          <footer class="flex items-center justify-between">
            <p>{this.signingUp && this.signingUp.displayName}</p>
            <midwest-avatar
              name={this.signingUp && this.signingUp.displayName}
            />
          </footer>
        </midwest-card>
      </Host>
    );
  }
}
