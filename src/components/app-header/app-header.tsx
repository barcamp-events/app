import { Component, Host, Prop, h } from '@stencil/core';
import AuthenticationTunnel from '../../tunnels/authentication';
import User from '../../models/User';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.css'
})
export class AppHeader {
  @Prop() user: User;

  onColorChange(color) {
    document.querySelector('stellar-theme').base = color;
  }

  switchDarkMode(dark) {
    document.querySelector('stellar-theme').dark = dark;
  }

  render() {
    return (
      <Host class="bg-white dm-bg-black">
        <div class="flex items-center w-90 center">
          <h6 class="parco i ma0 pa0 nowrap">
            <stencil-route-link url="/" class="black dm-white no-underline" anchorClass="black dm-white no-underline">BarCamp <span class="dn di-l">Events</span></stencil-route-link>
          </h6>

          {!this.user && <stellar-button tag="route-link" href="/auth" ghost invert dark={false} class="mv3">Sign in</stellar-button>}

          {this.user && <stellar-tabs class="bn mw6 ml-auto" size="tiny">
            <stellar-tab tag="route-link" href="/account" class="self-center">Account</stellar-tab>
            <stellar-tab tag="route-link" href="/attend" class="self-center">Attend</stellar-tab>
            <stellar-tab tag="route-link" href="/host" class="self-center">Host</stellar-tab>
            <stellar-tab tag="route-link" href="/search" class="self-center"><stellar-icon name="search" class="fs6" /></stellar-tab>
          </stellar-tabs>}
          {this.user && <stellar-color-picker class="ml2 mr4" val="indigo" onUpdate={(e) => { this.onColorChange(e.detail) }} /> }
          {this.user && <stellar-switch onUpdate={(e) => { this.switchDarkMode(e.detail.checked) }}><stellar-tooltip align="bottom-right">Dark Mode</stellar-tooltip></stellar-switch>}
        </div>
      </Host>
    );
  }
}

AuthenticationTunnel.injectProps(AppHeader, ['user']);
