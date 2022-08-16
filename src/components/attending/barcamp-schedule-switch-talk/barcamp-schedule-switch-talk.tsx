import { Component, Host, h, Element, Prop, State } from '@stencil/core';
import BarcampAppState from "../../../stores/barcamp-app-state";
import Conference from "../../../models/Conference";
import Track from "../../../models/Track";
import Talk from "../../../models/Talk";
import delay from "async-delay";

@Component({
  tag: "barcamp-schedule-switch-talk",
})
export class BarcampScheduleSwitchTalk {
  @Element() element: HTMLElement;

  @Prop() user: User = BarcampAppState.state.user;
  @Prop() slug: string;
  @Prop() conference: Conference;
  @Prop() year: string;

  @State() tracks: Track[];

  @State() toTrackTalks: Talk[];
  @State() fromTrackTalks: Talk[];

  @State() fromTrack: string;
  @State() toTrack: string;

  @State() fromTalk: Talk;
  @State() toTalk: Talk;

  componentWillLoad() {
    this.loadConference();
  }

  async loadConference() {
    if (!this.year) {
      this.conference = await Conference.where(
        ["slug", "==", this.slug],
        "one"
      );
    } else {
      this.conference = await Conference.where(
        [
          ["slug", "==", this.slug],
          ["year", "==", Number(this.year)],
        ],
        "one"
      );
    }

    this.tracks = await this.conference.theTracks();

    // @ts-ignore
    this.element.forceUpdate();
  }

  async updateFromTalks(e) {
    if (e.detail !== this.fromTrack) {
      this.fromTrackTalks = undefined;
      await delay(500);
      this.fromTrack = e.detail;
      this.fromTrackTalks = await Talk.where(
        ["trackKey", "==", e.detail],
        "many"
      );
    }
  }

  async updateToTalks(e) {
    if (e.detail !== this.toTrack) {
      this.toTrackTalks = undefined;
      await delay(500);
      this.toTrack = e.detail;
      this.toTrackTalks = await Talk.where(
        ["trackKey", "==", e.detail],
        "many"
      );
    }
  }

  async pullFromTalk(e) {
    this.fromTalk = undefined;
    this.fromTalk = await Talk.get(e.detail);
  }

  async pullToTalk(e) {
    this.toTalk = undefined;
    this.toTalk = await Talk.get(e.detail);
  }

  async changeTalks() {
    await Talk.switch(this.fromTalk, this.toTalk);
  }

  render() {
    if (!this.user) {
      return (
        <Host>
          <midwest-layout class="hero">
            <h3 class="b">Sign up, Sign in, or Continue as a Guest.</h3>
          </midwest-layout>
          <midwest-layout>
            <barcamp-auth-choices />
          </midwest-layout>
        </Host>
      );
    }

    return (
      this.conference &&
      this.tracks && (
        <Host class="mb-7">
          <stencil-route-title title="Schedule" />
          <midwest-layout class="hero z-1">
            <h3 class="b tc parco black dm:white">
              <midwest-animate-text>
                {this.conference.stylizedName} Switch A Talk
              </midwest-animate-text>
            </h3>
          </midwest-layout>
          <midwest-layout size="full">
            <midwest-grid class="items-center justify-between w-100 center mb-5">
              <midwest-card class="w-100">
                <header class="hero">
                  <h5>From</h5>
                </header>
                <section>
                  <midwest-grid>
                    <midwest-select
                      label="Track"
                      placeholder="Choose a Track"
                      onUpdate={this.updateFromTalks.bind(this)}
                    >
                      {this.tracks.map((track) => (
                        <midwest-item value={track.key}>
                          {track.name}
                        </midwest-item>
                      ))}
                    </midwest-select>
                    {this.fromTrackTalks && (
                      <midwest-select
                        label="Talk"
                        onUpdate={this.pullFromTalk.bind(this)}
                      >
                        {this.fromTrackTalks.map((talk) => (
                          <midwest-item value={talk.key}>
                            {talk.friendlyLength}
                            <br />
                            {talk.title || "No title"}
                            <br />
                          </midwest-item>
                        ))}
                      </midwest-select>
                    )}
                  </midwest-grid>
                </section>
              </midwest-card>
              <midwest-card class="w-100">
                <header class="hero">
                  <h5>To</h5>
                </header>
                <section>
                  <midwest-grid>
                    {this.tracks && (
                      <midwest-select
                        label="Track"
                        placeholder="Choose a Track"
                        onUpdate={this.updateToTalks.bind(this)}
                      >
                        {this.tracks.map((track) => (
                          <midwest-item value={track.key}>
                            {track.name}
                          </midwest-item>
                        ))}
                      </midwest-select>
                    )}
                    {this.toTrackTalks && (
                      <midwest-select
                        label="Talk"
                        onUpdate={this.pullToTalk.bind(this)}
                      >
                        {this.toTrackTalks.map((talk) => (
                          <midwest-item value={talk.key}>
                            {talk.friendlyLength}
                            <br />
                            {talk.title || "No title"}
                            <br />
                          </midwest-item>
                        ))}
                      </midwest-select>
                    )}
                  </midwest-grid>
                </section>
              </midwest-card>
            </midwest-grid>
          </midwest-layout>
          <midwest-layout size="full" class="sticky bottom-0 ">
            <midwest-grid class="bg-black items-center justify-between center pv4 w-100">
              <div>
                {this.fromTalk && (
                  <barcamp-schedule-talk talk={this.fromTalk} />
                )}
              </div>
              <midwest-grid
                style={{ "--grid-width": "auto" }}
                class="items-center justify-center"
              >
                <midwest-asset
                  name="swap"
                  class="fs-massive tc center self-center"
                />
                <div class="self-center center">
                  <midwest-button
                    onClick={this.changeTalks.bind(this)}
                    title="Switch"
                  >
                    Switch
                  </midwest-button>
                </div>
              </midwest-grid>
              <div>
                {this.toTalk && <barcamp-schedule-talk talk={this.toTalk} />}
              </div>
            </midwest-grid>
          </midwest-layout>
        </Host>
      )
    );
  }
}