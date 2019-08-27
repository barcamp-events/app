import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'barcamp-host-set-format'
})
export class BarcampHostSetFormat {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
