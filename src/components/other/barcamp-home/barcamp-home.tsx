import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'barcamp-home'
})
export class BarcampHome {

  render() {
    return (
      <Host>
        <stellar-layout class="bg-theme-base0 dm-bg-theme-base9 bb b--theme-base7 hero dark-mode" padding="large">
          <copy-wrap align="center">
            <h1>Share your Passion!</h1>
            <p class="mb4">BarCamp is an un-conference organized in your community, by your community. Make new friends or catch up with old ones at one of the world’s best&nbsp;events.</p>
            <stellar-group>
              <stellar-button padding="small">Attend an Event</stellar-button>
              <div class="pa2"></div>
              <stellar-button padding="small" class="ml4 secondary">Host an Event</stellar-button>
            </stellar-group>
          </copy-wrap>
        </stellar-layout>

        <stellar-layout type="half" class="bg-theme-base2 bb b--theme-base3 dm-b--theme-base6 dm-bg-theme-base8" padding="large" align="center" size="large">
          <div>
            <copy-wrap align="left">
              <h2 class="fs6 theme-base9 dm-theme-base1"><stellar-animate-text words method="jump">Why do people attend a BarCamp?</stellar-animate-text></h2>
              <p class="mb4">Separated they live in Bookmarks right at the coast of the famous Semantics, large language ocean Separated they live in Bookmarks right at the&nbsp;coast.</p>
            </copy-wrap>
            <stellar-grid class="mt4">
              <copy-wrap>
                <h6 class="fs7 i theme-base6 dm-theme-base4">Meet your community</h6>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut temporibus sapiente velit adipisci labore&nbsp;sed.</p>
              </copy-wrap>
              <copy-wrap class="ma0">
                <h6 class="fs7 i theme-base6 dm-theme-base4">Learn something new</h6>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut temporibus sapiente velit adipisci labore&nbsp;sed.</p>
              </copy-wrap>
            </stellar-grid>
          </div>
          <div>
            <stellar-slides effect="slide" slidesPerView={1}>
              <stellar-slide>
                <stellar-video-interview src="/assets/video/stellar.mp4" width={1280} height={720} ></stellar-video-interview>
              </stellar-slide>
              <stellar-slide>
                <img src="https://placehold.it/1280x720" />
              </stellar-slide>
            </stellar-slides>
          </div>
        </stellar-layout>

        <stellar-layout type="half" class="bg-theme-base1 bb b--theme-base2 dm-b--theme-base5 dm-bg-theme-base7" padding="large" align="center" size="large">
          <div class="order-1">
            <copy-wrap align="left">
              <h2 class="fs6 theme-base9 dm-theme-base1"><stellar-animate-text words method="jump">Why do people host a BarCamp?</stellar-animate-text></h2>
              <p class="mb4">Separated they live in Bookmarks right at the coast of the famous Semantics, large language ocean Separated they live in Bookmarks right at the&nbsp;coast.</p>
            </copy-wrap>
            <stellar-grid class="mt4">
              <copy-wrap>
                <h6 class="fs7 i theme-base5 dm-theme-base2">Improve your community</h6>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut temporibus sapiente velit adipisci labore&nbsp;sed.</p>
              </copy-wrap>
              <copy-wrap class="ma0">
                <h6 class="fs7 i theme-base5 dm-theme-base2">Pop bubbles</h6>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut temporibus sapiente velit adipisci labore&nbsp;sed.</p>
              </copy-wrap>
            </stellar-grid>
          </div>
          <div>
          <stellar-slides effect="slide" slidesPerView={1}>
            <stellar-slide>
              <stellar-video-interview src="/assets/video/stellar.mp4" width={1280} height={720} ></stellar-video-interview>
            </stellar-slide>
            <stellar-slide>
              <img src="https://placehold.it/1280x720" />
            </stellar-slide>
          </stellar-slides>
          </div>
        </stellar-layout>

        <stellar-layout class="bg-theme-base0 dm-bg-theme-base9 hero dark-mode" padding="large">
          <copy-wrap align="center">
            <h3><stellar-animate-text words method="jump">Sponsor Your Local&nbsp;BarCamp</stellar-animate-text></h3>
            <p class="mb4">BarCamp Events are organized by people n your community. When you sponsor a BarCamp, that money goes directly to those folks, and they don’t have to deal with the&nbsp;taxes. </p>
            <stellar-group>
              <stellar-button padding="small">Learn more</stellar-button>
              <div class="pa2"></div>
              <stellar-button padding="small" class="secondary">Host an Event</stellar-button>
            </stellar-group>
          </copy-wrap>
        </stellar-layout>
      </Host>
    );
  }

}
