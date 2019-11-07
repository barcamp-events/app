import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'barcamp-auth'
})
export class BarcampAuth {
  render() {
    return <Host>
      <stencil-route-title title="Sign up or Sign in" />
      <stellar-message striped class="theme-blue sticky top-0 z-5 h-auto" closable={false}><stellar-grid class="justify-between items-center w-100 pv4 pv3-l"><p>Excuse the mess! For the most part, this app isn&rsquo;t ready.</p><div class="ml-auto-m ml-auto-l"><stellar-button tag="route-link" href="/omaha/2019/schedule" size="tiny" padding="tiny" contrast>Visit BarCamp Omaha&rsquo;s Schedule <stellar-asset name="arrow-round-forward" align="right" /></stellar-button></div></stellar-grid></stellar-message>
      <stellar-layout class="hero" size="flush" padding="large">
          <copy-wrap align="center">
            <h1 class="parco i">BarCamp Events</h1>
          </copy-wrap>
          <barcamp-auth-choices />
      </stellar-layout>
    </Host>
  }
}
