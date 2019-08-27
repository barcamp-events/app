import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'barcamp-host-branding'
})
export class BarcampHostBranding {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
