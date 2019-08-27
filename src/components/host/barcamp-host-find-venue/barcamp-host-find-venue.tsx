import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'barcamp-host-find-venue'
})
export class BarcampHostFindVenue {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
