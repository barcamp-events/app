import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-footer',
  styleUrl: 'app-footer.css'
})
export class AppFooter {
  render() {
    return (
      <Host class="bg-white dm-bg-black">
        <div class="flex items-stretch w-90 center h-100">
          <h6 class="parco i ma0 pa0 nowrap mr4 self-center">
            <stencil-route-link url="/" class="black dm-white no-underline" anchorClass="black dm-white no-underline">BarCamp <span class="dn di-l">Events</span></stencil-route-link>
          </h6>

          <stellar-tabs class="bn mw6 mr-auto" size="tiny" flipIndicator>
            <stellar-tab tag="route-link" href="/docs/privacy-policy" class="self-center">Privacy Policy</stellar-tab>
            <stellar-tab tag="route-link" href="/docs/terms-of-service" class="self-center">Terms of Service</stellar-tab>
            <stellar-tab tag="route-link" href="/docs/code-of-conduct" class="self-center">Code of Conduct</stellar-tab>
          </stellar-tabs>

          <stellar-group class="mr4 mv3">
            <stellar-button ghost invert tag="link" class="mr3" target="_blank" href="https://facebook.com/barcampevents">
              <stellar-asset name="logo-facebook" class="fs6" />
            </stellar-button>
            <stellar-button ghost invert tag="link" class="mr3" target="_blank" href="https://twitter.com/barcampevents">
              <stellar-asset name="logo-twitter" class="fs6" />
            </stellar-button>
            <stellar-button ghost invert tag="link" class="mr3" target="_blank" href="https://instagram.com/barcampevents">
              <stellar-asset name="logo-instagram" class="fs6" />
            </stellar-button>
          </stellar-group>
        </div>
      </Host>
    );
  }

}
