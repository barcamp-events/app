import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'barcamp-default-marketing'
})
export class BarcampDefaultMarketing {

  render() {
    return (
      <Host>
        <stencil-route-title title="Your Dashboard" />
        <h1>hello</h1>
      </Host>
    );
  }

}
