import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'barcamp-auth'
})
export class BarcampAuth {
  render() {
    return <Host>
      <stencil-route-title title="Sign up or Sign in" />
      <stellar-layout class="hero" size="flush" padding="large">
          <copy-wrap align="center">
            <h1 class="parco i">BarCamp Events</h1>
          </copy-wrap>
          <barcamp-auth-choices />
      </stellar-layout>
    </Host>
  }
}
