import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'barcamp-home'
})
export class BarcampHome {
  render() {
    return (
      <Host>
        <midwest-layout
          class="bb border-theme-2 dm:border-theme-7 hero"
          padding="large"
        >
          <copy-wrap align="center">
            <h1 class="fs-massive parco dm:text-theme-0">
              Share your Passion!
            </h1>
            <p class="mb-4 dm:text-theme-2">
              BarCamp is an un-conference organized in your community, by your
              community. Make new friends or catch up with old ones at one of
              the world’s best&nbsp;events.
            </p>
            <midwest-button tag="stencil-route" href="/dashboard">
              Attend an Event
            </midwest-button>
            {/* <midwest-button class="ml-4 secondary">Host an Event</midwest-button> */}
          </copy-wrap>
        </midwest-layout>

        <midwest-layout
          type="half"
          class="bg-theme-1 bb border-theme-2 dm:border-theme-12 dm:bg-theme-11"
          padding="large"
          align="center"
          size="large"
        >
          <section>
            <copy-wrap align="left">
              <h2 class="parco text-theme-9 dm:text-theme-1">
                <midwest-animate-text words method="jump">
                  Why do people attend a BarCamp?
                </midwest-animate-text>
              </h2>
              <p class="mb-4 dm:text-theme-2">
                Because it's a fun, fast paced way to network with and learn
                from your community. Come one, come all!
              </p>
            </copy-wrap>
            <midwest-grid class="mt-4">
              <copy-wrap>
                <h4 class="parco tracking-wide italic text-theme-6 dm:text-theme-1">
                  Meet your community
                </h4>
                <p class="dm:text-theme-2">
                  There are so many opportunities around you, it's just a matter
                  of meeting folks. BarCamp's are loose and fun, and designed to
                  help you find those opportunities.
                </p>
              </copy-wrap>
              <copy-wrap class="ma0">
                <h4 class="parco tracking-wide italic text-theme-6 dm:text-theme-1">
                  Learn something new
                </h4>
                <p class="dm:text-theme-2">
                  It's hard to imagine knowing every single thing your community
                  is working on. BarCamp's enable you and your community to
                  learn from your best&mdash;you.
                </p>
              </copy-wrap>
            </midwest-grid>
          </section>
          <aside>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/nXY2jMPLvSA?controls=0"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </aside>
        </midwest-layout>

        {/* <midwest-layout type="half" class="bg-theme-1 bb border-theme-2 dm:border-theme-5 dm:bg-theme-7" padding="large" align="center" size="large">
        <div class="order-1">
          <copy-wrap align="left">
            <h2 class="parco fs6 base9 dm:base0"><midwest-animate-text words method="jump">Why do people host a BarCamp?</midwest-animate-text></h2>
            <p class="mb-4">Separated they live in Bookmarks right at the coast of the famous Semantics, large language ocean Separated they live in Bookmarks right at the&nbsp;coast.</p>
          </copy-wrap>
          <midwest-grid class="mt-4">
            <copy-wrap>
              <h6 class="parco tracked fs7 i base5 dm:base0">Improve your community</h6>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut temporibus sapiente velit adipisci labore&nbsp;sed.</p>
            </copy-wrap>
            <copy-wrap class="ma0">
              <h6 class="parco tracked fs7 i base5 dm:base0">Pop bubbles</h6>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut temporibus sapiente velit adipisci labore&nbsp;sed.</p>
            </copy-wrap>
          </midwest-grid>
        </div>
        <div>
          <midwest-video-interview src="/assets/video/stellar.mp4" width={1280} height={720} ></midwest-video-interview>
        </div>
      </midwest-layout> */}

        {/* <midwest-layout class="hero" padding="large">
        <copy-wrap align="center">
          <h3 class="fs-large parco"><midwest-animate-text words method="jump">Sponsor Your Local&nbsp;BarCamp</midwest-animate-text></h3>
          <p class="mb-4">BarCamp Events are organized by people n your community. When you sponsor a BarCamp, that money goes directly to those folks, and they don’t have to deal with the&nbsp;taxes. </p>
          <div class="inline-flex items-center">
            <midwest-button>Learn more</midwest-button>
            <midwest-button class="ml-4 secondary">Host an Event</midwest-button>
          </div>
        </copy-wrap>
      </midwest-layout> */}
      </Host>
    );
  }

}
