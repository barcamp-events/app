import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'barcamp-host-set-agenda'
})
export class BarcampHostSetAgenda {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
