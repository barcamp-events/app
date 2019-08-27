import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'barcamp-host-name-your-event'
})
export class BarcampHostNameYourEvent {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
