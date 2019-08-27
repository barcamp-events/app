import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'barcamp-dashboard'
})
export class BarcampDashboard {

  render() {
    return (
      <Host>
        <stencil-route-title title="Your Dashboard" />
        <slot></slot>
      </Host>
    );
  }

}
