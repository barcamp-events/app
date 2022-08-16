import { Component, Host, h } from "@stencil/core";
import BarcampAppState from "../../../stores/barcamp-app-state";
@Component({
  tag: "barcamp-auth-choices",
  styleUrl: "barcamp-auth-choices.css",
})
export class BarcampAuthChoices {
  render() {
    BarcampAppState.state.user;

    return (
      <Host>
        <midwest-layout size="tiny">
          <midwest-card>
            <header class="flush p-0">
              {!BarcampAppState.state.user && (
                <midwest-tabs block name="auth">
                  <midwest-tab open href="#sign-in">
                    Sign In
                  </midwest-tab>
                  <midwest-tab href="#sign-up">Sign Up</midwest-tab>
                  <midwest-tab href="#guest">Guest</midwest-tab>
                </midwest-tabs>
              )}
            </header>

            <section class="flush p-0">
              <midwest-content for="auth" id="sign-in" open>
                <barcamp-auth-choice-sign-in />
              </midwest-content>
              <midwest-content for="auth" id="sign-up">
                <barcamp-auth-choice-sign-up />
              </midwest-content>
              <midwest-content for="auth" id="guest">
                <barcamp-auth-choice-guest />
              </midwest-content>
            </section>
          </midwest-card>
        </midwest-layout>
      </Host>
    );
  }
}
