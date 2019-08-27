import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'barcamp-schedule-signup'
})
export class BarcampScheduleSignup {

  render() {
    return (
      <Host>
        <stencil-route-title title="Schedule Sign Up" />
        <slot></slot>
      </Host>
    );
  }

}
