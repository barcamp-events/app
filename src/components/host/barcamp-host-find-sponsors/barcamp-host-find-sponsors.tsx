import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'barcamp-host-find-sponsors'
})
export class BarcampHostFindSponsors {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
