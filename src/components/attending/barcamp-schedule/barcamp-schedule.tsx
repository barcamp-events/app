import { Component, Host, h, Prop, State, Method, Element } from '@stencil/core';
import Conference from '../../../models/Conference';
import AuthenticationTunnel from '../../../tunnels/authentication';
import ConferenceTunnel from '../../../tunnels/conference';
import WritableTunnel from '../../../tunnels/writable';
import Track from "../../../models/Track";
import delay from "async-delay";
import Dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
Dayjs.extend(isBetween);
import KonamiCode from "konami-code";

@Component({
  tag: "barcamp-schedule",
})
export class BarcampSchedule {
  @Element() element: HTMLElement;

  @Prop() user: User;

  @Prop() slug: string;
  @Prop() year: string;

  @State() writable: boolean = false;

  @State() conference: Conference;
  @State() tracks: Track[] = [];
  @State() talks: { time?: number; talks?: Talk[] }[];

  @State() activeColor: string;
  @State() activeTab: string = "all";

  interval!: any;
  konami: KonamiCode = new KonamiCode();

  async componentDidLoad() {
    await this.loadConference();

    if (!this.isHappening) {
      this.interval = setInterval(() => {
        // @ts-ignore
        this.element.forceUpdate();
      }, 30 * 1000);
    }

    if (!this.isAfter) {
      this.konami.listen(() => {
        this.writable = true;
      });
    }
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

    console.log(["slug", "==", this.slug], ["year", "==", Number(this.year)]);

    this.tracks = await this.conference.theTracks();
    this.talks = await this.conference.getTalksInOrder();

    this.conference.onChange(async (conference) => {
      this.conference.populate(conference);
      this.tracks = await this.conference.theTracks();
      this.talks = await this.conference.getTalksInOrder();
    });
  }

  @Method()
  async getConference() {
    return this.conference;
  }

  async displayTrack(e, color = "") {
    this.activeTab = undefined;
    this.activeColor = color;
    await delay(100);
    this.activeTab = e.detail.name;
  }

  get isHappening() {
    return (
      this.conference &&
      Dayjs().isBetween(this.conference.start, this.conference.end, "minute")
    );
  }

  get isBefore() {
    return (
      this.conference &&
      Dayjs().isBefore(this.conference.start.subtract(1, "minute"))
    );
  }

  get isAfter() {
    return (
      this.conference && Dayjs().isAfter(this.conference.end.add(1, "minute"))
    );
  }

  get isDone() {
    return (
      this.conference && Dayjs().isAfter(this.conference.end.add(1, "day"))
    );
  }

  render() {
    if (this.conference && !this.user && !this.isDone) {
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

    const conferenceState = {
      conference: this.conference,
    };

    const writableState = {
      writable: this.writable,
    };

    return (
      this.conference && (
        <Host>
          <WritableTunnel.Provider state={writableState}>
            <ConferenceTunnel.Provider state={conferenceState}>
              <stencil-route-title title="Schedule" />
              <midwest-layout class="hero z-1">
                <h3 class="b tc parco black dm:white">
                  <midwest-animate-text>
                    {this.conference.stylizedName}
                  </midwest-animate-text>
                </h3>
              </midwest-layout>

              {!this.isHappening && !this.isDone && (
                <midwest-layout padding="large">
                  <copy-wrap align="center">
                    <h1 class="b i mb-4 ttu parco base9 dm:base0 fs-massive">
                      Whoops!
                    </h1>
                    {this.isBefore && (
                      <h3>
                        The schedule for {this.conference.stylizedName} is not
                        available until the conference starts.
                      </h3>
                    )}
                    {this.isAfter && (
                      <h3>
                        Looks like this event is over! The schedule will be
                        published within the week.
                      </h3>
                    )}
                    {this.isBefore && (
                      <h2 class="parco i b mt-4">
                        Starts in about{" "}
                        <count-down
                          time={this.conference.start}
                          onReady={() => {
                            // @ts-ignore
                            this.element.forceUpdate();
                          }}
                        ></count-down>
                      </h2>
                    )}
                  </copy-wrap>
                </midwest-layout>
              )}

              {(this.isHappening || this.isDone) && (
                <midwest-layout
                  size="flush"
                  padding="none"
                  class="sticky top-0 z-1"
                >
                  <midwest-tabs
                    block
                    blockIndicator
                    size="large"
                    class={`w-100 bn relative ${this.activeColor}`}
                    style={{ "--max-width": "100%" }}
                  >
                    <midwest-tab
                      name="all"
                      dark
                      class="w-100"
                      open
                      onContentOpen={this.displayTrack.bind(this)}
                    >
                      All Tracks
                    </midwest-tab>
                    {this.tracks.map((track) => (
                      <midwest-tab
                        name={track.name}
                        class={`w-100 theme-${track.color}`}
                        onContentOpen={(e) => this.displayTrack(e, track.color)}
                      >
                        {track.name}
                      </midwest-tab>
                    ))}
                  </midwest-tabs>
                </midwest-layout>
              )}
              {this.isHappening && (
                <midwest-layout
                  size={this.activeTab === "all" ? "full" : "small"}
                >
                  {this.talks &&
                    Object.entries(this.talks).map((entry) => (
                      <barcamp-schedule-talk-group
                        entry={entry[1]}
                        active={this.activeTab}
                      />
                    ))}
                </midwest-layout>
              )}
              {this.isDone && (
                <midwest-layout
                  size={this.activeTab === "all" ? "full" : "small"}
                >
                  {this.talks &&
                    Object.entries(this.talks).map((entry) => (
                      <barcamp-schedule-published
                        entry={entry[1]}
                        active={this.activeTab}
                      />
                    ))}
                </midwest-layout>
              )}
            </ConferenceTunnel.Provider>
          </WritableTunnel.Provider>
        </Host>
      )
    );
  }
}

AuthenticationTunnel.injectProps(BarcampSchedule, ['user']);
