import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'barcamp-default-marketing'
})
export class BarcampDefaultMarketing {

  render() {
    return (
      <Host>
        <stencil-route-title title="Default Marketing" />
        <slot></slot>
      </Host>
    );
  }

}
