import {
  Component,
  Host,
  h,
  Element,
  Prop,
  State,
  forceUpdate,
} from "@stencil/core";
import { MatchResults, RouterHistory } from "@stencil/router";
import AuthenticationTunnel from "../../../tunnels/authentication";
import Conference from "../../../models/Conference";
import Track from "../../../models/Track";
import Talk from "../../../models/Talk";
import delay from "async-delay";
import { Hero } from "../../../helpers";
import User from "../../../models/User";

@Component({
  tag: "barcamp-schedule-reassign-talk",
})
export class BarcampScheduleReassignTalk {
  @Element() element: HTMLElement;

  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;

  @Prop() user: User;

  @State() conference: Conference;
  @State() slug: string;
  @State() year: string;
  @State() tracks: Track[];

  @State() trackTalks: Talk[];
  @State() availableUsers: User[];
  @State() track: string;
  @State() talk: Talk;
  @State() targetUser: User;

  componentWillLoad() {
    this.slug = this.match.params.slug;
    this.year = this.match.params.year;
    this.loadConference();
  }

  get previewOfUpdatedTalk() {
    return this.talk.populate({
      speakerKey: this.targetUser.key,
      signingUpKey: this.targetUser.key,
    });
  }

  async loadRecentGuest() {
    User.where(["name", "==", "Guest"]);
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
    this.availableUsers = await User.where(
      ["displayName", "!=", "Guest"],
      "many"
    );

    forceUpdate(this.element);
  }

  async updateTalks(e) {
    if (e.detail !== this.track) {
      this.trackTalks = undefined;
      await delay(500);
      this.track = e.detail;
      this.trackTalks = await Talk.where(["trackKey", "==", e.detail], "many");
    }
  }

  async updateUsers(e) {
    if (e.detail !== this.talk) {
      this.availableUsers = undefined;
      await delay(500);
      this.track = e.detail;
      this.availableUsers = await User.where(
        ["displayName", "!=", "Guest"],
        "many"
      );
    }
  }

  async pullTalk(e) {
    this.talk = undefined;
    this.talk = await Talk.get(e.detail);
  }

  async pullTargetUser(e) {
    this.targetUser = undefined;
    this.targetUser = await User.get(e.detail);
  }

  async reassignUser() {
    await Talk.reassign(this.talk, this.targetUser);
  }

  render() {
    if (!this.user) {
      return (
        <Host>
          {Hero(`Sign up, Sign in, or Continue as a Guest.`)}
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
          {Hero(`${this.conference.stylizedName} Reassign a User to a Talk`)}

          <midwest-layout size="full">
            <midwest-grid class="items-center justify-between w-100 center mb-5">
              <midwest-card class="w-100">
                <header class="hero">
                  <h5>Track</h5>
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
              </midwest-card>
              <midwest-card class="w-100">
                <header class="hero">
                  <h5>User</h5>
                </header>
                <section class="flush p-0">
                  <midwest-tabs block name="user_type">
                    <midwest-tab open name="registered">
                      Registered User
                    </midwest-tab>
                    <midwest-tab name="guest">Update a guest</midwest-tab>
                  </midwest-tabs>
                  <midwest-content
                    for="user_type"
                    id="registered"
                    open
                    class="p-4"
                  >
                    {this.availableUsers && (
                      <midwest-select
                        label="Target User"
                        onUpdate={this.pullTargetUser.bind(this)}
                      >
                        {this.availableUsers.map((user) => (
                          <midwest-item value={user.key}>
                            {user.displayName}
                            <br />
                            {user.email || "No email"}
                            <br />
                          </midwest-item>
                        ))}
                      </midwest-select>
                    )}
                  </midwest-content>
                  <midwest-content for="user_type" id="guest" class="p-4">
                    {}
                  </midwest-content>
                </section>
              </midwest-card>
            </midwest-grid>
          </midwest-layout>
          {this.talk && this.targetUser && (
            <midwest-layout size="full" class="sticky bottom-0 ">
              <midwest-grid
                cols="1"
                class="items-center justify-between center pv4 w-100"
              >
                <div>
                  {this.talk ? (
                    <barcamp-schedule-talk talk={this.talk} />
                  ) : (
                    <skeleton-img
                      width="600"
                      height="400"
                      icon="info"
                      class="m-0"
                    />
                  )}
                </div>
                <midwest-grid
                  style={{ "--grid-width": "auto" }}
                  class="items-center justify-center text-center"
                >
                  <ion-icon
                    name="swap"
                    class="fs-massive tc center self-center"
                  />
                  <div class="self-center center">
                    <midwest-button
                      onClick={this.reassignUser.bind(this)}
                      title="Switch"
                    >
                      Reassign to User
                    </midwest-button>
                  </div>
                </midwest-grid>
                <div class="flex width-2">
                  <midwest-avatar
                    name={this.targetUser && this.targetUser.displayName}
                    class="mr-3"
                  />
                  <p>{this.targetUser && this.targetUser.displayName}</p>
                </div>
              </midwest-grid>
            </midwest-layout>
          )}
        </Host>
      )
    );
  }
}

AuthenticationTunnel.injectProps(BarcampScheduleReassignTalk, ["user"]);
