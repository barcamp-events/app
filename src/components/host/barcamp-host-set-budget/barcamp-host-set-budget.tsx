import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'barcamp-host-set-budget'
})
export class BarcampHostSetBudget {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
