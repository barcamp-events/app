import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'barcamp-auth'
})
export class BarcampAuth {

  render() {
    return (
      <Host>
        <stencil-route-title title="Sign up or Sign in" />
        awesome
        <slot></slot>
      </Host>
    );
  }

}
