import { Component, Host, h, State, Element } from "@stencil/core";
import delay from "async-delay";
import BarcampAppState from "../../../stores/barcamp-app-state";

const colors = [
  "red",
  "orange",
  "yellow",
  "lime",
  "green",
  "teal",
  "cyan",
  "blue",
  "indigo",
  "violet",
  "fuschia",
  "pink",
  "gray",
];

@Component({
  tag: "barcamp-profile",
  styleUrl: "barcamp-profile.css",
})
export class BarcampProfile {
  @Element() element: HTMLElement;
  @State() user: User = BarcampAppState.state.user;
  @State() success: boolean = false;

  @State() profileCard: HTMLMidwestCardElement;

  componentDidLoad() {
    this.profileCard = this.element.querySelector("midwest-card#profile");
  }

  async onSubmit(e) {
    this.user.populate({ ...e.detail.json });
    this.user.dark_mode =
      e.detail.json.dark_mode === "false" ? false : e.detail.json.dark_mode;
    this.user.reduced_motion =
      e.detail.json.reduced_motion === "false"
        ? false
        : e.detail.json.reduced_motion;

    this.user.save();

    // @ts-ignore
    this.element.forceUpdate();

    this.success = true;

    await delay(100);

    await this.profileCard.flip_card();

    await delay(2000);

    await this.profileCard.flip_card();

    await delay(1000);

    this.success = false;
  }

  render() {
    return (
      <Host>
        <stencil-route-title title="Sign up or Sign in" />
        <midwest-layout class="hero" size="flush" padding="medium">
          <midwest-layout size="tiny">
            <midwest-card
              id="profile"
              flippable={this.success}
              flip-icon={"false"}
            >
              <header class="text-center overflow-hidden">
                <h2 class="parco i text-theme-12 dm:text-theme-4">
                  Edit your Profile
                </h2>
              </header>
              <section>
                <midwest-form ajax onSubmitted={this.onSubmit.bind(this)}>
                  <midwest-grid>
                    <midwest-input
                      name="displayName"
                      placeholder="example@barcamp.events"
                      label="Name"
                      default={this.user.displayName}
                    />
                    <midwest-input
                      name="bio"
                      type="textarea"
                      placeholder="Share your passion"
                      label="Bio"
                      default={this.user.bio}
                    />
                    <midwest-select name="color" label="Favorite color">
                      {colors.map((color) => (
                        <midwest-item
                          value={color}
                          checked={this.user.color === color}
                        >
                          {color}
                        </midwest-item>
                      ))}
                    </midwest-select>
                    <midwest-switch
                      name="dark_mode"
                      checked={this.user.dark_mode}
                    >
                      <p slot="yes">Dark Mode Enabled</p>
                      <p slot="no">Dark Mode Disabled</p>
                    </midwest-switch>
                    <midwest-switch
                      name="reduced_motion"
                      checked={this.user.reduced_motion}
                    >
                      <p slot="yes">Reduced Motion Enabled</p>
                      <p slot="no">Reduced Motion Disabled</p>
                    </midwest-switch>
                    <div>
                      <midwest-button tag="submit" label="Save">
                        Save
                      </midwest-button>
                    </div>
                  </midwest-grid>
                </midwest-form>
              </section>
              {this.user && (
                <section slot="back" class="flex items-center justify-center">
                  <copy-wrap align="center" class="-mt-12">
                    <midwest-avatar
                      name={this.user.displayName}
                      size="large"
                      shape="circle"
                    />
                    <h4 class="parco text-theme-6 dm:text-theme-6">
                      Saved your settings {this.user.displayName}!
                    </h4>
                  </copy-wrap>
                </section>
              )}
            </midwest-card>
          </midwest-layout>
        </midwest-layout>
      </Host>
    );
  }
}
