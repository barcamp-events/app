import { Component, Host, h, Prop, Element } from '@stencil/core';
import Dayjs from "dayjs";
import Talk from "../../../models/Talk";
import User from "../../../models/User";
import AuthenticationTunnel from "../../../tunnels/authentication";
import WritableTunnel from "../../../tunnels/writable";

@Component({
  tag: "barcamp-schedule-talk-available",
})
export class BarcampScheduleTalkAvailable {
  @Element() element: HTMLElement;

  @Prop() talk: Talk;
  @Prop() user: User;
  @Prop() writable: boolean;
  @Prop() readonly: boolean = false;

  async flipped(e) {
    if (e.target.flipped) {
      this.talk.signingUpKey = this.user.key;
      this.talk.claimedAt = Dayjs();
    } else {
      this.talk.signingUpKey = null;
      this.talk.claimedAt = null;
    }

    await this.talk.save();
  }

  flipCard() {
    this.element.querySelector("midwest-card").flip_card();
  }

  async addTalk(e) {
    if (this.user.anonymous) {
      this.user.populate(e.detail.json.user);
      await this.user.save();
    }

    this.talk.populate(e.detail.json);
    await (await document.querySelector("web-audio").source("alert")).play();
    await this.talk.save();
  }

  render() {
    return (
      <Host class="dc">
        <midwest-card
          padding="small"
          flippable={this.writable}
          onFlip={this.flipped.bind(this)}
          flip-icon={"false"}
        >
          <section class="flush hero">
            <copy-wrap align="center" class="m-3">
              <midwest-label class="uppercase" pill>
                {this.talk.trackTitle}
              </midwest-label>
              <h4 class="text-black dm:text-white">Open Slot!</h4>
              <p>Snag this slot before someone else does!</p>
            </copy-wrap>
          </section>
          {this.writable && (
            <footer class="flex items-center justify-between">
              <midwest-button
                tag="button"
                block
                onClick={this.flipCard.bind(this)}
                ghost
              >
                Sign up for this slot!
              </midwest-button>
            </footer>
          )}
          {this.writable && (
            <header slot="back" class="hero">
              <midwest-label class="uppercase">
                Signing up for {this.talk.trackTitle}
              </midwest-label>
              <midwest-label class="uppercase">
                {this.talk.friendlyLength}
              </midwest-label>
            </header>
          )}
          {this.writable && (
            <section slot="back">
              <midwest-form ajax onSubmitted={this.addTalk.bind(this)}>
                <midwest-grid cols="1" noresponsive>
                  {this.user.anonymous && this.user.displayName === "Guest" && (
                    <midwest-input
                      name="user[displayName]"
                      placeholder="Your name here!"
                      label="Your name"
                    />
                  )}
                  {this.user.anonymous && !this.user.email && (
                    <midwest-input
                      name="user[email]"
                      placeholder="example@gmail.com"
                      label="Your email"
                    />
                  )}
                  <midwest-input
                    type="hidden"
                    name="key"
                    value={this.talk.key}
                  />
                  <midwest-input
                    type="hidden"
                    name="speakerKey"
                    value={this.user.key}
                  />
                  <midwest-input
                    name="title"
                    label="Title"
                    placeholder="Food Court"
                  />
                  <midwest-input
                    type="textarea"
                    name="description"
                    label="Describe your talk"
                    placeholder="Is a hot dog a sandwich?"
                  />
                  <midwest-button tag="submit" block>
                    Add your talk
                  </midwest-button>
                  <midwest-button
                    tag="button"
                    onClick={this.flipCard.bind(this)}
                    ghost
                    block
                  >
                    Cancel
                  </midwest-button>
                </midwest-grid>
              </midwest-form>
            </section>
          )}
        </midwest-card>
      </Host>
    );
  }
}

AuthenticationTunnel.injectProps(BarcampScheduleTalkAvailable, ['user']);
WritableTunnel.injectProps(BarcampScheduleTalkAvailable, ['writable']);
