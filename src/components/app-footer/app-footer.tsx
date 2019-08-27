import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-footer',
  styleUrl: 'app-footer.css'
})
export class AppFooter {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
