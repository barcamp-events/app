import { Component, Host, h, Prop, Element } from '@stencil/core';
import Talk from '../../../models/Talk';
import User from '../../../models/User';
import BarcampAppState from "../../../stores/barcamp-app-state";

@Component({
  tag: "barcamp-schedule-talk-available",
})
export class BarcampScheduleTalkAvailable {
  @Element() element: HTMLElement;

  @Prop() talk: Talk;
  @Prop() user: User = BarcampAppState.state.user;
  @Prop() writable: boolean = BarcampAppState.state.writable;
  @Prop() readonly: boolean = false;

  async flipped(e) {
    if (e.target.flipped) {
      this.talk.signingUpKey = this.user.key;
    } else {
      this.talk.signingUpKey = null;
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
          flippable={this.writable}
          onFlip={this.flipped.bind(this)}
          flip-icon={"false"}
        >
          <section class="flush hero">
            <copy-wrap align="center" class="ma3">
              <h6 class="ttu fs8 b tracked">{this.talk.trackTitle}</h6>
              <h6>No one</h6>
              <p>Looks like this time slot is empty.</p>
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
              <h6 class="fs7 ttu b mv3">
                {this.talk.friendlyLength} in {this.talk.trackTitle}
              </h6>
            </header>
          )}
          {this.writable && (
            <section slot="back">
              <midwest-form ajax onSubmitted={this.addTalk.bind(this)}>
                <midwest-grid cols="1" responsive={false}>
                  {this.user.anonymous && this.user.displayName === "Guest" && (
                    <midwest-input
                      name="user[displayName]"
                      placeholder="Betty White"
                      label="Your name"
                    />
                  )}
                  {this.user.anonymous && !this.user.email && (
                    <midwest-input
                      name="user[email]"
                      placeholder="bettywhite@gmail.com"
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
