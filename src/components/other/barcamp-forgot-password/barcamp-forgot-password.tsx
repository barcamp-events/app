import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'barcamp-forgot-password'
})
export class BarcampForgotPassword {

  render() {
    return (
      <Host>
        <stencil-route-title title="Forgot Password" />
        <slot></slot>
      </Host>
    );
  }

}
