import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'barcamp-schedule'
})
export class BarcampSchedule {

  render() {
    return (
      <Host>
        <stencil-route-title title="Schedule" />
        <slot></slot>
      </Host>
    );
  }

}
