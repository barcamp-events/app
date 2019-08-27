import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'barcamp-host-gather-volunteers'
})
export class BarcampHostGatherVolunteers {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
