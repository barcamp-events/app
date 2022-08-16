import { Component, Host, h, State, Prop, Element } from "@stencil/core";
import { href } from "stencil-router-v2";
import Conference from "../../../models/Conference";
import BarcampAppState from "../../../stores/barcamp-app-state";

@Component({
  tag: "barcamp-host",
})
export class BarcampHost {
  @Element() element: HTMLElement;

  @Prop() conferenceId: string;
  @Prop() tabId: string;

  @State() conference: Conference = BarcampAppState.state.conference;

  nameTabEl!: HTMLMidwestTabElement;
  budgetTabEl!: HTMLMidwestTabElement;
  venueTabEl!: HTMLMidwestTabElement;
  agendaTabEl!: HTMLMidwestTabElement;
  sponsorsTabEl!: HTMLMidwestTabElement;
  volunteersTabEl!: HTMLMidwestTabElement;
  formatTabEl!: HTMLMidwestTabElement;
  brandingTabEl!: HTMLMidwestTabElement;

  async componentWillLoad() {
    if (this.conferenceId) {
      this.conference = await Conference.get(this.conferenceId);

      BarcampAppState.set("conference", this.conference);

      this.conference.onChange(async (conference) => {
        this.conference.populate(conference);
        BarcampAppState.set("conference", this.conference);

        // this.history.push(`/host/${conference.key}/${this.conference.step}`, {
        //   conferenceId: conference.key,
        //   conference,
        //   tabId: this.conference.step,
        // });

        this.activateTab();
      });
    }
  }

  async saveTab(name) {
    this.conference.step = name;
    this.conference.save();
  }

  activateTab() {
    const tab = {
      name: this.nameTabEl,
      budget: this.budgetTabEl,
      venue: this.venueTabEl,
      agenda: this.agendaTabEl,
      sponsors: this.sponsorsTabEl,
      volunteers: this.volunteersTabEl,
      format: this.formatTabEl,
      branding: this.brandingTabEl,
    }[this.conference.step];

    tab.activate();
  }

  tabUrl(tab) {
    return `/host/${this.conferenceId}/${tab}`;
  }

  render() {
    return (
      <Host>
        <midwest-layout
          type="supporting-content"
          size="full"
          class="bg-white dm:bg-black sticky z-30"
          style={{ "--padding": "0.5rem", top: "-11.5rem" }}
        >
          <section class="flex items-center">
            {this.conference && (
              <midwest-calendar-date
                start={this.conference.start.toISOString()}
                end={this.conference.end.toISOString()}
                class="text-3xl mr-4"
              />
            )}

            {!this.conference && <h1 class="parco italic">Host a BarCamp</h1>}
            {this.conference && (
              <div class="-mt-4">
                <h6 class="parco italic text-theme-7 dm:text-theme-6">
                  Host a BarCamp
                </h6>
                <h1 class="parco italic text-theme-12 dm:text-theme-2">
                  {this.conference.name}
                </h1>
              </div>
            )}
          </section>
          {this.conference && (
            <aside class="text-right">
              <p>Attendees, a quick link to the page, a publish button</p>
            </aside>
          )}
          {this.conference && (
            <div slot="nav">
              <midwest-tabs name="host" style={{ "--max-width": "100%" }}>
                <midwest-tab
                  ref={(e) => (this.nameTabEl = e)}
                  tag="link"
                  {...href(this.tabUrl("name"))}
                  name="name"
                  onClick={() => {
                    this.saveTab("name");
                  }}
                  open={!this.conference || this.conference?.step === "name"}
                >
                  Name
                </midwest-tab>
                <midwest-tab
                  ref={(e) => (this.budgetTabEl = e)}
                  tag="link"
                  {...href(this.tabUrl("budget"))}
                  name="budget"
                  onClick={() => {
                    this.saveTab("budget");
                  }}
                  open={this.conference?.step === "budget"}
                >
                  Budget
                </midwest-tab>
                <midwest-tab
                  ref={(e) => (this.venueTabEl = e)}
                  tag="link"
                  {...href(this.tabUrl("venue"))}
                  name="venue"
                  onClick={() => {
                    this.saveTab("venue");
                  }}
                  open={this.conference?.step === "venue"}
                >
                  Venue
                </midwest-tab>
                <midwest-tab
                  ref={(e) => (this.agendaTabEl = e)}
                  tag="link"
                  {...href(this.tabUrl("agenda"))}
                  name="agenda"
                  onClick={() => {
                    this.saveTab("agenda");
                  }}
                  open={this.conference?.step === "agenda"}
                >
                  Agenda
                </midwest-tab>
                <midwest-tab
                  ref={(e) => (this.sponsorsTabEl = e)}
                  tag="link"
                  {...href(this.tabUrl("sponsors"))}
                  name="sponsors"
                  onClick={() => {
                    this.saveTab("sponsors");
                  }}
                  open={this.conference?.step === "sponsors"}
                >
                  Sponsors
                </midwest-tab>
                <midwest-tab
                  ref={(e) => (this.volunteersTabEl = e)}
                  tag="link"
                  {...href(this.tabUrl("volunteers"))}
                  name="volunteers"
                  onClick={() => {
                    this.saveTab("volunteers");
                  }}
                  open={this.conference?.step === "volunteers"}
                >
                  Volunteers
                </midwest-tab>
                <midwest-tab
                  ref={(e) => (this.formatTabEl = e)}
                  tag="link"
                  {...href(this.tabUrl("format"))}
                  name="format"
                  onClick={() => {
                    this.saveTab("format");
                  }}
                  open={this.conference?.step === "format"}
                >
                  Format
                </midwest-tab>
                <midwest-tab
                  ref={(e) => (this.brandingTabEl = e)}
                  tag="link"
                  {...href(this.tabUrl("branding"))}
                  name="branding"
                  onClick={() => {
                    this.saveTab("branding");
                  }}
                  open={this.conference?.step === "branding"}
                >
                  Branding
                </midwest-tab>
              </midwest-tabs>
            </div>
          )}
        </midwest-layout>
        <midwest-layout size="full" class="bg-gray-0 dm:bg-gray-12">
          <section>
            <midwest-content
              for="host"
              id="name"
              open={!this.conference || this.conference?.step === "name"}
            >
              <barcamp-host-name-your-event />
            </midwest-content>

            <midwest-content
              for="host"
              id="budget"
              open={this.conference?.step === "budget"}
            >
              <barcamp-host-set-budget />
            </midwest-content>

            <midwest-content
              for="host"
              id="venue"
              open={this.conference?.step === "venue"}
            >
              <barcamp-host-find-venue />
            </midwest-content>

            <midwest-content
              for="host"
              id="agenda"
              open={this.conference?.step === "agenda"}
            >
              <barcamp-host-set-agenda />
            </midwest-content>

            <midwest-content
              for="host"
              id="sponsors"
              open={this.conference?.step === "sponsors"}
            >
              <barcamp-host-find-sponsors />
            </midwest-content>

            <midwest-content
              for="host"
              id="volunteers"
              open={this.conference?.step === "volunteers"}
            >
              <barcamp-host-gather-volunteers />
            </midwest-content>

            <midwest-content
              for="host"
              id="format"
              open={this.conference?.step === "format"}
            >
              <barcamp-host-set-format />
            </midwest-content>

            <midwest-content
              for="host"
              id="branding"
              open={this.conference?.step === "branding"}
            >
              <barcamp-host-branding />
            </midwest-content>
          </section>
        </midwest-layout>
      </Host>
    );
  }
}
