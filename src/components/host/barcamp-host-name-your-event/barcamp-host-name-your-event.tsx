import { Component, Host, h, State } from "@stencil/core";
import "@midwest-design/device";
import { colors } from "@midwest-design/common";
import Conference from "../../../models/Conference";
import BarcampAppState from "../../../stores/barcamp-app-state";

@Component({
  tag: "barcamp-host-name-your-event",
})
export class BarcampHostNameYourEvent {
  @State() conference: Conference = BarcampAppState.state.conference;

  @State() name: string;
  @State() mantra: string;
  @State() color: ThemeableColors;
  @State() start: string;
  @State() end: string;
  @State() dark: boolean;

  componentWillLoad() {
    if (this.conference) {
      this.color = this.conference.color;
      this.dark = this.conference.dark;
      this.name = this.conference.name;
      this.mantra = this.conference.mantra;
      this.start = this.conference.start.toISOString();
      this.end = this.conference.end.toISOString();
    }
  }

  async saveStep(e) {
    const conferenceData = e.detail.json.conference;

    if (!this.conference) {
      // const conference = await Conference.create({
      //   ...conferenceData,
      //   step: "budget",
      // } as Conference);
      // this.history.push(`/host/${conference.key}/budget`, {
      //   conferenceId: conference.key,
      //   conference,
      // });
    } else {
      this.conference.populate({
        ...conferenceData,
        step: "budget",
      });

      await this.conference.save();
    }
  }

  get colors() {
    return Object.keys(colors).filter((c) => !["black", "white"].includes(c));
  }

  render() {
    return (
      <Host>
        <midwest-layout
          type="supporting-content"
          class="align-start"
          size="large"
        >
          <section>
            <midwest-card>
              <header>
                <h3 class="parco italic dm:text-white">Name your event</h3>
              </header>
              <section>
                <midwest-form ajax onSubmitted={this.saveStep.bind(this)}>
                  <midwest-grid cols="1" responsive={false}>
                    <midwest-input
                      label="Name your event"
                      inline
                      name="conference[name]"
                      size="large"
                      value={this.conference?.name}
                      description="Usually this is something like 'BarCamp Nebraska'"
                      placeholder="BarCamp Events"
                      autofocus
                      onUpdate={(e) => {
                        this.name = e.detail;
                      }}
                    />
                    <midwest-input
                      name="conference[mantra]"
                      label="Mantra"
                      value={this.conference?.mantra}
                      placeholder="Share your passion"
                      onUpdate={(e) => {
                        this.mantra = e.detail;
                      }}
                    />
                    <midwest-grid>
                      <midwest-input-date
                        name="conference[start]"
                        type="datetime"
                        noDuration
                        value={this.conference?.start?.toISOString()}
                        label="Start"
                        onUpdate={(e) => {
                          this.start = e.detail;
                        }}
                      />
                      <midwest-input-date
                        name="conference[end]"
                        type="datetime"
                        noDuration
                        value={this.conference?.end?.toISOString()}
                        label="End"
                        onUpdate={(e) => {
                          this.end = e.detail;
                        }}
                      />
                    </midwest-grid>
                    <midwest-grid>
                      <midwest-select
                        name="conference[color]"
                        noAvatars
                        label="Choose a color"
                        onUpdate={(e) => {
                          this.color = e.detail;
                        }}
                      >
                        {this.colors.map((color) => (
                          <midwest-item
                            value={color}
                            checked={this.conference?.color === color}
                          >
                            {color}
                          </midwest-item>
                        ))}
                      </midwest-select>

                      <midwest-switch
                        name="conference[dark]"
                        label="Dark Mode"
                        checked={this.conference?.dark}
                        onUpdate={(e) => {
                          this.dark = e.detail.checked;
                        }}
                      >
                        <p slot="yes">Dark Mode Enabled</p>
                        <p slot="no">Dark Mode Disabled</p>
                      </midwest-switch>
                    </midwest-grid>
                    <p class="text-sm text-center m-auto">
                      By hosting an event on BarCamp Events, you agree to follow
                      the <a>Code of Conduct</a>, <a>Privacy Policy</a>, and{" "}
                      <a>Terms of Service</a>.{" "}
                    </p>
                    <midwest-button tag="submit" class="inline-block">
                      Save and Continue
                    </midwest-button>
                  </midwest-grid>
                </midwest-form>
              </section>
            </midwest-card>
          </section>
          <aside class="sticky top-0 bottom-0 m-auto mt-0">
            <barcamp-host-event-preview
              color={this.color}
              dark={this.dark}
              name={this.name}
              mantra={this.mantra}
            />
          </aside>
        </midwest-layout>
      </Host>
    );
  }
}
