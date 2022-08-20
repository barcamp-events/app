import {
  Component,
  Host,
  h,
  Prop,
  State,
  Method,
  Element,
  forceUpdate,
} from "@stencil/core";
import Conference from "../../../models/Conference";
import AuthenticationTunnel from "../../../tunnels/authentication";
import ConferenceTunnel from "../../../tunnels/conference";
import WritableTunnel from "../../../tunnels/writable";
import { MatchResults, RouterHistory } from "@stencil/router";
import Track from "../../../models/Track";
import Dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
Dayjs.extend(isBetween);
import KonamiCode from "konami-code";
import { Hero } from "../../../helpers";
import BarcampAppState from "../../../stores/barcamp-app-state";

@Component({
  tag: "barcamp-schedule",
})
export class BarcampSchedule {
  @Element() element: HTMLElement;

  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;

  @Prop() user: User;
  @State() writable: boolean = BarcampAppState.get("writable");

  @State() conference: Conference;
  @State() tracks: Track[] = [];
  @State() talks: { time?: number; talks?: Talk[] }[];

  @State() slug: string;
  @State() year: string;

  @State() activeColor: string;
  @State() activeTab: string = "all";

  interval!: any;
  konami: KonamiCode = new KonamiCode();

  componentWillLoad() {
    this.slug = this.match.params.slug;
    this.year = this.match.params.year;
  }

  async componentDidLoad() {
    await this.loadConference();

    if (!this.isHappening) {
      this.interval = setInterval(() => {
        forceUpdate(this.element);
      }, 30 * 1000);
    }

    if (this.isHappening) {
      this.writable = true;
      // this.konami.listen(() => {
      //   this.writable = true;
      //   BarcampAppState.set("writable", true);
      // });
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
    this.activeColor = color;
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
      (this.conference &&
        Dayjs().isBefore(this.conference.start))
    );
  }

  get isSignUpPeriod() {
    return (
      (this.conference &&
        Dayjs().isBetween(
          this.conference.start,
          this.conference.talksBegin,
          "minute"
        ))
    );
  }

  get isAfter() {
    return this.conference && Dayjs().isAfter(this.conference.end);
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
            <h3 class="text-black dm:text-white">
              Sign up, Sign in, or Continue as a Guest.
            </h3>
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
              {Hero(this.conference.stylizedName)}

              {!this.isHappening && !this.isDone && (
                <midwest-layout padding="large">
                  <copy-wrap align="center">
                    <h1 class="italic mb-4 uppercase parco text-base-5 dm:text-white fs-massive">
                      Whoops!
                    </h1>
                    {this.isBefore && (
                      <h3 class="text-base-8 dm:text-base-0">
                        The schedule for {this.conference.stylizedName} is not
                        available until the conference starts.
                      </h3>
                    )}
                    {this.isAfter && (
                      <h3 class="text-base-8 dm:text-base-0">
                        Looks like this event is over! The schedule will be
                        published within the week.
                      </h3>
                    )}
                    {this.isBefore && (
                      <div>
                        <h2 class="parco i b mt-4 text-base-11 dm:text-base-2">
                          Starts in about{" "}
                          <count-down
                            time={this.conference.start}
                            onReady={() => {
                              forceUpdate(this.element);
                            }}
                          ></count-down>
                        </h2>

                        <p class="text-center mx-auto">
                          Doors &amp; Schedule opens at{" "}
                          <midwest-time
                            value={this.conference.start}
                            format="h:mm a"
                          />
                        </p>
                        <p class="text-center mx-auto">
                          Talks begin at{" "}
                          <midwest-time
                            value={this.conference.talksBegin}
                            format="h:mm a"
                          />
                        </p>
                        <p class="text-center mx-auto">
                          Event wraps at{" "}
                          <midwest-time
                            value={this.conference.end}
                            format="h:mm a"
                          />
                        </p>
                      </div>
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
                    dark
                    size="large"
                    class={`w-100 bn relative theme-${this.activeColor}`}
                    style={{ "--max-width": "100%" }}
                  >
                    <midwest-tab
                      name="all"
                      dark
                      class="w-100"
                      open
                      onContentChange={this.displayTrack.bind(this)}
                    >
                      All Tracks
                    </midwest-tab>
                    {this.tracks.map((track) => (
                      <midwest-tab
                        name={track.name}
                        class={`w-100 theme-${track.color}`}
                        onContentChange={(e) =>
                          this.displayTrack(e, track.color)
                        }
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
                  {this.isSignUpPeriod && (
                    <midwest-card>
                      <header class="hero">
                        <h4 class="text-center m-auto text-black dm:text-white">
                          Welcome to BarCamp {this.conference.stylizedName}!
                        </h4>
                      </header>
                      <section>
                        <p class="text-center mx-auto">
                          Please sign up for your talks at the front desk!
                        </p>
                        <p class="text-center mx-auto">
                          30 minutes before talks begin, we'll have a quick
                          little welcome talk. Go to the Technology track in the
                          all-hands room!
                        </p>
                      </section>
                    </midwest-card>
                  )}
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

AuthenticationTunnel.injectProps(BarcampSchedule, ["user"]);
