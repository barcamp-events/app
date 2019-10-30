import { Component, Host, Prop, h } from '@stencil/core';
import AuthenticationTunnel from '../../../tunnels/authentication';
import User from '../../../models/User';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.css'
})
export class AppHeader {
  @Prop() user: User;

  render() {
    return (
      <Host class="bg-white dm-bg-black">
        <div class="flex items-center w-90 center">
          <h6 class="parco i ma0 pa0 nowrap">
            <stencil-route-link url={this.user ? "/dashboard" : "/"} class="black dm-white no-underline" anchorClass="black dm-white no-underline">BarCamp <span class="dn di-l">Events</span></stencil-route-link>
          </h6>

          {!this.user && <stellar-button tag="route-link" href="/auth" ghost invert dark={false} class="mv3">Sign in</stellar-button>}

          {this.user && <stellar-dropdown class="bn mw6 ml-auto" position="right">
            <p slot="handle" class="fw4 parco flex items-center"><stellar-avatar name={this.user.displayName} notooltip class="mr3 s-bevel" />{this.user.displayName}</p>
            <stellar-item type="stencil-route-link" href="/profile">Profile</stellar-item>
            {/* <stellar-item type="stencil-route-link" href="/attend">Attend</stellar-item> */}
            {/* <stellar-item type="stencil-route-link" href="/host">Host</stellar-item> */}
            {/* <stellar-item type="stencil-route-link" href="/search"><stellar-icon name="search" class="fs6" /> Search</stellar-item> */}
            <stellar-item type="stencil-route-link" href="/sign-out">Sign out</stellar-item>
          </stellar-dropdown>}
        </div>
      </Host>
    );
  }
}

AuthenticationTunnel.injectProps(AppHeader, ['user']);
