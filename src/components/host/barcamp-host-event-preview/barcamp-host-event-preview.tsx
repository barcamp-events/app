import { Component, Host, h, Prop, State, Element, forceUpdate } from '@stencil/core';
import { LineItemList } from '../../../models/LineItemList';
import BarcampAppState from "../../../stores/barcamp-app-state";

@Component({
  tag: "barcamp-host-event-preview",
  styleUrl: "preview.css",
  shadow: true,
})
export class BarcampHostEventPreview {
  @Element() element: HTMLElement;

  @Prop() showBudget: boolean;
  @Prop() showVenue: boolean;

  @State() conference: Conference = BarcampAppState.state.conference;
  @Prop() color: ThemeableColors;
  @Prop() dark: boolean;
  @Prop() name: string;
  @Prop() mantra: string;
  @Prop() lineItems: LineItemList;
  @Prop() type: string;

  @State() preview: "iphone-xs-max" | "imac" | "ipad-pro-portrait" =
    "iphone-xs-max";

  async componentWillLoad() {
    this.lineItems = await this.conference.theLineItems();

    this.conference.onChange(async (conference) => {
      this.conference.populate(conference);
      this.dark = this.conference.dark;
      this.color = this.conference.color;
      forceUpdate(this.element);
    });
  }

  renderHeader() {
    return (
      <div
        class="pt-16 p-8 block bg-theme-1 dm:bg-theme-12"
        style={{ transition: "all 200ms var(--ease) 0s" }}
      >
        <div class="inline-flex items-center">
          <midwest-label class="uppercase text-theme-11 dm:text-theme-3">
            {this.name || this.conference.name || "BarCamp Events"}
          </midwest-label>
          <midwest-calendar-date
            start={this.conference.start.toISOString()}
            end={this.conference.end.toISOString()}
            class="text-xs ml-4"
          />
        </div>
        <h3
          class="parco italic mb-8 text-theme-8 dm:text-theme-0"
          style={{ transition: "all 200ms var(--ease) 0s" }}
        >
          {this.mantra || this.conference.mantra || "Share your Passion"}
        </h3>
        <midwest-button tag="button">
          Buy your tickets{" "}
          <ion-icon name="arrow-forward-outline" slot="icon" class="right" />
        </midwest-button>
      </div>
    );
  }

  renderBudget() {
    return (
      <div
        class="p-6 block bg-theme-0 border-t border-b border-theme-1 dm:border-theme-10 dm:bg-theme-11"
        style={{ transition: "all 200ms var(--ease) 0s" }}
      >
        <midwest-progress
          value={this.lineItems.raised}
          max={this.lineItems.goal}
        />
        <p class="text-black dm:text-white mt-4">
          <midwest-unit value={this.lineItems.raised} money to="usd" /> raised
          of <midwest-unit value={this.lineItems.goal} money to="usd" />
        </p>
      </div>
    );
  }

  renderVenue() {
    return (
      <div
        class="p-6 block bg-theme-0 dm:bg-theme-11"
        style={{ transition: "all 200ms var(--ease) 0s" }}
      >
        <midwest-grid class="items-center">
          <copy-wrap>
            <h4 class="parco alt dm:text-theme-2 mb-4">
              The {this.type.replace("-", " ")} Venue
            </h4>
            {this.type !== "online" && (
              <h3 class="mb-4 dm:text-theme-1 parco">
                {(this.conference && this.conference?.venue?.name) ||
                  "The Kaneko"}
              </h3>
            )}
            {this.type !== "online" && (
              <p class="mb-4 dm:text-theme-0">
                {(this.conference && this.conference?.venue?.name) ||
                  "1234 address lane"}
              </p>
            )}
            {this.type === "online" && (
              <p class="text-sm dm:text-theme-2">
                This event will be online exclusvely. Get cozy and come share
                your passion wih great folks!
              </p>
            )}
            {this.type === "in-person" && (
              <p class="text-sm dm:text-theme-2">
                This event will be in person exclusvely. Come spend time with
                folks at{" "}
                {(this.conference && this.conference?.venue?.name) ||
                  "The Kaneko"}
                , and enjoy great time and food with great folks!
              </p>
            )}
            {this.type === "hybrid" && (
              <p class="text-sm dm:text-theme-2">
                This event will be both streamed and physically available. Get
                cozy at home, or get dressed up and come to{" "}
                {(this.conference && this.conference?.venue?.name) ||
                  "The Kaneko"}{" "}
                and party. Either way - come share your passion wih great folks!
              </p>
            )}
            {this.type !== "online" && (
              <midwest-button
                href={this.conference && this.conference?.venue?.directions}
                target="_blank"
              >
                Directions
              </midwest-button>
            )}
          </copy-wrap>
          {this.type !== "online" && (
            <midwest-map>
              <midwest-map-marker></midwest-map-marker>
            </midwest-map>
          )}
        </midwest-grid>
      </div>
    );
  }

  renderAgenda() {
    return (
      <div
        class="p-6 block bg-theme-0 dm:bg-theme-11"
        style={{ transition: "all 200ms var(--ease) 0s" }}
      ></div>
    );
  }

  renderSponsors() {
    return (
      <div
        class="p-6 block bg-theme-0 dm:bg-theme-11"
        style={{ transition: "all 200ms var(--ease) 0s" }}
      ></div>
    );
  }

  renderVolunteers() {
    return (
      <div
        class="p-6 block bg-theme-0 dm:bg-theme-11"
        style={{ transition: "all 200ms var(--ease) 0s" }}
      ></div>
    );
  }

  renderFormat() {
    return (
      <div
        class="p-6 block bg-theme-0 dm:bg-theme-11"
        style={{ transition: "all 200ms var(--ease) 0s" }}
      ></div>
    );
  }

  renderBranding() {
    return (
      <div
        class="p-6 block bg-theme-0 dm:bg-theme-11"
        style={{ transition: "all 200ms var(--ease) 0s" }}
      ></div>
    );
  }

  render() {
    return (
      <Host class="flex flex-col items-center">
        <midwest-group class="m-auto mb-6">
          <midwest-button onClick={() => (this.preview = "imac")}>
            Desktop
          </midwest-button>
          <midwest-button onClick={() => (this.preview = "ipad-pro-portrait")}>
            Tablet
          </midwest-button>
          <midwest-button onClick={() => (this.preview = "iphone-xs-max")}>
            Phone
          </midwest-button>
        </midwest-group>
        <midwest-device frame={this.preview}>
          <midwest-theme
            base={this.color || this.conference.color}
            dark={this.dark}
            class="relative"
          >
            <div
              class="bg-white dm:bg-black absolute top-0 left-0 right-0 bottom-0 text-center overflow-auto"
              style={{ transition: "all 200ms var(--ease) 0s" }}
            >
              {this.renderHeader()}
              {this.showBudget && this.renderBudget()}
              {this.showVenue && this.renderVenue()}
              {false && this.renderAgenda()}
              {false && this.renderSponsors()}
              {false && this.renderVolunteers()}
              {false && this.renderFormat()}
              {false && this.renderBranding()}
            </div>
          </midwest-theme>
        </midwest-device>
      </Host>
    );
  }
}