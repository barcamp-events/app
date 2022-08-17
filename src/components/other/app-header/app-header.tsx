import { Component, Host, Prop, h, State } from "@stencil/core";
import AuthenticationTunnel from "../../../tunnels/authentication";
import User from "../../../models/User";
import Authentication from "../../../models/Authentication";
import delay from "async-delay";
import BarcampAppState from "../../../stores/barcamp-app-state";

@Component({
  tag: "app-header",
  styleUrl: "app-header.css",
})
export class AppHeader {
  @Prop() user: User;
  @State() auth: Authentication = window["Authentication"] as Authentication;
  @State() writable: boolean = BarcampAppState.get("writable");

  componentWillLoad() {
    BarcampAppState.onChange("writable", (val) => {
      this.writable = val;
    });
  }

  async switcharoo() {
    this.auth.signOut();
    await delay(20);
    this.auth.signInAsGuest();
  }

  render() {
    return (
      <Host class="bg-base-0 dm:bg-base-12 z-40 sticky top-0 border-b border-base-0 dm:border-base-11">
        <midwest-layout size="full" class="w-full center" padding="small">
          <div class="flex items-center justify-between">
            <h2 class="parco italic m-0 p-0 nowrap text-base-8 dm:text-base-4">
              <stencil-route-link
                url={this.user ? "/dashboard" : "/"}
                class="text-base-8 dm:text-base-4 no-underline"
                anchorClass="text-base-8 dm:text-base-4 no-underline"
              >
                BarCamp <span class="hidden md:inline-block">Events</span>
              </stencil-route-link>
            </h2>

            <div class="flex items-center justify-end">
              {!this.user && (
                <midwest-button
                  tag="stencil-route"
                  href="/auth"
                  ghost
                  class="my-3"
                >
                  Sign in
                </midwest-button>
              )}

              {this.user && this.writable && (
                <midwest-button
                  tag="button"
                  onClick={() => this.switcharoo()}
                  ghost
                  class="mr-6"
                >
                  Switch back to guest
                </midwest-button>
              )}

              {this.user && (
                <midwest-dropdown class="bn mw6 ml-auto" position="right">
                  <p slot="handle" class="fw4 parco flex items-center">
                    <midwest-avatar
                      name={this.user.displayName}
                      noTooltip
                      class="mr-3 s-bevel"
                    />
                    {this.user.displayName}
                  </p>
                  <midwest-item tag="stencil-route" href="/profile">
                    Profile
                  </midwest-item>
                  <midwest-item tag="stencil-route" href="/attend">
                    Attend
                  </midwest-item>
                  <midwest-item tag="stencil-route" href="/host">
                    Host
                  </midwest-item>
                  {/* <midwest-item type="stencil-route" href="/search"><midwest-icon name="search" class="fs6" /> Search</midwest-item> */}
                  <midwest-item tag="stencil-route" href="/sign-out">
                    Sign out
                  </midwest-item>
                </midwest-dropdown>
              )}
            </div>
          </div>
        </midwest-layout>
      </Host>
    );
  }
}

AuthenticationTunnel.injectProps(AppHeader, ["user"]);
