import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'barcamp-auth'
})
export class BarcampAuth {
  render() {
    return (
      <Host>
        <stencil-route-title title="Sign up or Sign in" />
        <midwest-layout class="hero" size="flush" padding="large">
          <copy-wrap align="center">
            <h1 class="parco italic dm:text-theme-2">BarCamp Events</h1>
          </copy-wrap>
          <barcamp-auth-choices />
        </midwest-layout>
      </Host>
    );
  }
}
