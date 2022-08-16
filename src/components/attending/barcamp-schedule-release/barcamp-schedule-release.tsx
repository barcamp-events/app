import { Component, Host, h, Element, Prop, State } from "@stencil/core";
import { MatchResults, RouterHistory } from "@stencil/router";
import AuthenticationTunnel from "../../../tunnels/authentication";
import Conference from "../../../models/Conference";
import Track from "../../../models/Track";
import Talk from "../../../models/Talk";
import { Hero } from "../../../helpers";

@Component({
  tag: "barcamp-schedule-release",
})
export class BarcampScheduleRelease {
  @Element() element: HTMLElement;

  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;

  @Prop() user: User;

  @State() conference: Conference;
  @State() slug: string;
  @State() year: string;
  @State() tracks: Track[];

  @State() trackTalks: Talk[];

  @State() track: string;

  @State() talk: Talk;

  componentWillLoad() {
    this.slug = this.match.params.slug;
    this.year = this.match.params.year;
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

  async updateTalks(e) {
    if (e.detail !== this.track) {
      this.trackTalks = undefined;
      this.track = e.detail;
      this.trackTalks = await Talk.where(["trackKey", "==", e.detail], "many");
    }
  }

  async pullTalk(e) {
    this.talk = undefined;
    this.talk = await Talk.get(e.detail);
    // @ts-ignore
    this.element.forceUpdate();
  }

  async releaseTalk() {
    await Talk.release(this.talk);
  }

  async resetTalk() {
    await Talk.reset(this.talk);
  }

  render() {
    if (!this.user) {
      return (
        <Host>
          {Hero("Sign up, Sign in, or Continue as a Guest")}

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
          {Hero(`${this.conference.stylizedName} Release A Talk`)}

          <midwest-layout size="full">
            <midwest-grid class="items-center justify-between w-100 center mb-5">
              <midwest-card class="w-100">
                <header class="hero">
                  <h5>Target Talk</h5>
                </header>
                <section>
                  <midwest-grid>
                    <midwest-select
                      label="Track"
                      placeholder="Choose a Track"
                      onUpdate={this.updateTalks.bind(this)}
                    >
                      {this.tracks.map((track) => (
                        <midwest-item value={track.key}>
                          {track.name}
                        </midwest-item>
                      ))}
                    </midwest-select>
                    {this.trackTalks && (
                      <midwest-select
                        label="Talk"
                        onUpdate={this.pullTalk.bind(this)}
                      >
                        {this.trackTalks.map((talk) => (
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
                <footer class="flex gap-4">
                  {!this.talk?.title && (
                    <midwest-button
                      onClick={this.releaseTalk.bind(this)}
                      title="Switch"
                    >
                      Release
                    </midwest-button>
                  )}

                  {this.talk?.title && (
                    <midwest-button
                      onClick={this.resetTalk.bind(this)}
                      title="Reset"
                    >
                      !!! Clear Talk !!!
                    </midwest-button>
                  )}
                </footer>
              </midwest-card>
            </midwest-grid>
          </midwest-layout>
          <midwest-layout size="full" class="sticky bottom-0 ">
            <midwest-grid class="items-center justify-between center pv4 w-100">
              <div>
                {this.talk && <barcamp-schedule-talk talk={this.talk} />}
              </div>
            </midwest-grid>
          </midwest-layout>
        </Host>
      )
    );
  }
}

AuthenticationTunnel.injectProps(BarcampScheduleRelease, ["user"]);
