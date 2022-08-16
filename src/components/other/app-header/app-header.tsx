import { Component, Host, h, State } from "@stencil/core";
import { href } from "stencil-router-v2";
import Authentication from "../../../models/Authentication";

@Component({
  tag: "app-header",
  styleUrl: "app-header.css",
})
export class AppHeader {
  @State() user: User;

  componentWillLoad() {
    Authentication.onAuthStateChanged(({ user }) => {
      this.user = user;
    });
  }

  render() {
    return (
      <Host class="bg-theme-0 dm:bg-theme-12 z-40 sticky top-0 border-b border-theme-0 dm:border-theme-11">
        <midwest-layout size="full" class="w-full center" padding="small">
          <div class="flex items-center justify-between">
            <h2 class="parco italic m-0 p-0 nowrap text-xl text-theme-8 dm:text-theme-4">
              <a
                {...href(this.user ? "/dashboard" : "/")}
                class="text-theme-8 dm:text-theme-4 no-underline"
              >
                BarCamp <span class="hidden md:inline-block">Events</span>
              </a>
            </h2>

            <div class="flex items-center justify-end">
              {!this.user && (
                <midwest-button
                  {...href("/auth")}
                  tag="link"
                  ghost
                  class="my-3"
                >
                  Sign in
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
                  <midwest-item {...href("/profile")} tag="a">
                    Profile
                  </midwest-item>
                  <midwest-item tag="a" {...href("/attend")}>
                    Attend
                  </midwest-item>
                  <midwest-item tag="a" {...href("/host")}>
                    Host
                  </midwest-item>
                  {/* <midwest-item type="stencil-route" href="/search"><midwest-icon name="search" class="fs6" /> Search</midwest-item> */}
                  <midwest-item tag="a" {...href("/sign-out")}>
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
