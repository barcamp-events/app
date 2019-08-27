import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.css'
})
export class AppHeader {

  onColorChange(color) {
    document.querySelector('stellar-theme').base = color;
  }

  render() {
    return (
      <Host class="bg-white dm-bg-black light-mode">
        <stellar-layout size="full" padding="none">
          <stellar-tabs class="bb-0 mw-100">
            <stellar-tab tag="route-link" href="/" class="mr-auto" open><h6 class="i ma0 pa0">BarCamp Events</h6></stellar-tab>
            <stellar-tab tag="route-link" href="/account" class="self-center">Account</stellar-tab>
            <stellar-tab tag="route-link" href="/attend" class="self-center">Attend</stellar-tab>
            <stellar-tab tag="route-link" href="/host" class="self-center">Host</stellar-tab>
            <stellar-tab tag="route-link" href="/search" class="self-center"><stellar-icon name="search" class="fs6" /></stellar-tab>
          </stellar-tabs>
        </stellar-layout>
      </Host>
    );
  }

}
