import { Component, Host, h, Element, State } from "@stencil/core";
import Authentication from "../../../models/Authentication";
import delay from "async-delay";
import { href } from "stencil-router-v2";
import BarcampAppState from "../../../stores/barcamp-app-state";

@Component({
  tag: "barcamp-auth-choice-guest",
  styleUrl: "barcamp-auth-choice-guest.css",
})
export class BarcampAuthChoiceGuest {
  @Element() element: HTMLElement;

  @State() user: User;
  @State() auth: Authentication = window["Authentication"] as Authentication;

  @State() card: HTMLMidwestCardElement;

  @State() success: boolean = false;
  @State() error: string;
  @State() step: number = 0;

  @State() redirectURL: string;

  componentWillLoad() {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get("redirect")) {
      this.redirectURL = urlParams.get("redirect")
        ? decodeURI(urlParams.get("redirect"))
        : "/";
    }

    BarcampAppState.onChange("user", async (user) => {
      this.user = user;
      if (user) {
        this.success = true;
        await delay(100);
        await this.card.flip_card();
      }
    });
  }

  componentDidLoad() {
    this.card = this.element.querySelector("midwest-card");
  }

  redirect() {
    // this.history.push(this.redirectURL, {});
  }

  async onSubmit() {
    try {
      await this.auth.signInAsGuest();

      this.success = true;
      await delay(100);

      await this.card.flip_card();
    } catch (e) {
      this.error = e.message;
    }
  }
  render() {
    return (
      <Host>
        <midwest-card id="guest" flippable={this.success} flip-icon={"false"}>
          <section>
            <midwest-form ajax onSubmitted={this.onSubmit.bind(this)}>
              <midwest-grid cols="1" responsive={false}>
                <h5 class="text-black dm:text-white text-center lh-copy">
                  Don't want to deal with this right&nbsp;now? <br />
                  <br />I got you fam.
                </h5>
                <midwest-button tag="submit" block>
                  Sign in as a Guest
                </midwest-button>
              </midwest-grid>
            </midwest-form>
          </section>
          {this.user && (
            <section slot="back">
              <copy-wrap align="center" class="mt-5">
                <midwest-avatar
                  name={this.user.displayName}
                  size="large"
                  class="s-bevel"
                />
                <h4 class="parco mb-5">Welcome to BarCamp Events!</h4>
                <midwest-grid
                  class="mw6 w-80"
                  style={{ "--grid-width": "100px", "--grid-gap": "1rem" }}
                >
                  <midwest-button
                    {...href(this.redirectURL)}
                    tag="link"
                    class="mr-4"
                    block
                  >
                    Continue to Redirect
                  </midwest-button>
                  <midwest-button
                    {...href(this.redirectURL)}
                    tag="link"
                    ghost
                    block
                  >
                    Dashboard
                  </midwest-button>
                </midwest-grid>
              </copy-wrap>
            </section>
          )}
        </midwest-card>
      </Host>
    );
  }
}
