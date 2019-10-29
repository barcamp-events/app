import { Component, Host, h, State, Prop } from '@stencil/core';
import { RouterHistory, MatchResults } from '@stencil/router';
import Conference from '../../../models/Conference'
import Track from '../../../models/Track';
import { SponsorList } from "../../../models/SponsorList";

@Component({
  tag: 'barcamp-default-marketing'
})
export class BarcampDefaultMarketing {

  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;

  @State() conference: Conference;
  @State() tracks: Track[] = [];
  @State() sponsors: SponsorList = new SponsorList()
  @State() slug: string;
  @State() year: string;

  componentWillLoad() {
    this.slug = this.match.params.slug;
    this.year = this.match.params.year;
    this.loadConference();
  }

  async loadConference() {
    if (!this.year) {
      this.conference = await Conference.where(["slug", "==", this.slug], "one")
    } else {
      this.conference = await Conference.where([["slug", "==", this.slug], ["year", "==", Number(this.year)]], "one")
    }

    this.tracks = await this.conference.theTracks();
    this.sponsors = await this.conference.theSponsors();

    this.conference.onChange(async (conference) => {
      this.conference.populate(conference);
      this.tracks = await this.conference.theTracks();
      this.sponsors = await this.conference.theSponsors();
    })
  }

  render() {
    return (
      <Host>
        <stencil-route-title title="Your Dashboard" />
        <stellar-layout class="hero" padding="large">
          <copy-wrap align="center">
            <h6 class="parco fs6 mb2">{this.conference && this.conference.stylizedName}</h6>
            <h1 class="parco fs-massive mb4">Share Your Passion</h1>
            <stellar-button>Buy Tickets <stellar-asset name="arrow-dropright" align="right" /></stellar-button>
          </copy-wrap>
        </stellar-layout>
        <stellar-layout size="small" padding="large" class="bb b--gray1 dm-b--gray9">
          <copy-wrap>
            <h3 class="parco alt">BarCamp is an&nbsp;Unconference</h3>
            <p>BarCamp Omaha is a user generated conference where the speakers are everyday folks talking about what interests them. Talks aren’t scheduled or planned until just before the conference starts, and anyone can give a talk. Curious, but don’t want to take the stage? That’s okay&nbsp;too.</p>

            <p>At BarCamp, you won’t find a predetermined speaker list or a line of suits passing out business cards. What you will find is some shaggy dude in a t-shirt talking about moonshine, a web developer talking about the best practices in SEO, or a world traveler sharing their experiences. BarCamp is a chance to network, learn something new, and share what awakens your curiosity. Come one, come&nbsp;all.</p>
          </copy-wrap>
        </stellar-layout>
        <stellar-layout size="large" padding="large" class="bb b--gray1 dm-b--gray9 bg-theme-base2 dm-bg-theme-base8">
          <stellar-grid class="items-center">
            <copy-wrap>
              <h2 class="parco alt">{this.conference && this.conference.venue.name}</h2>
              <h6 class="mb4">{this.conference && this.conference.venue.address}</h6>
              <stellar-button href={this.conference && this.conference.venue.directions} target="_blank">Directions</stellar-button>
            </copy-wrap>
            <div class="pv5 ph4 bg-theme-base2 dm-bg-theme-base8 w-100 tc"><h5 class="parco alt">Put a Map here</h5></div>
          </stellar-grid>
        </stellar-layout>
        <stellar-layout class="bb b--gray1 dm-b--gray9" size="large">
          <stellar-layout size="small">
            <copy-wrap>
              <h2 class="parco alt">The Tracks</h2>
              <p>Pick from the tracks below to give your talk. All topics and folk are welcome, but please follow our Code of&nbsp;Conduct.</p>
            </copy-wrap>
          </stellar-layout>
          <stellar-grid>
            {this.tracks && this.tracks.map((track: Track) => <stellar-card padding="small">
              <header class="hero relative pt6"><h5 class="fs7 parco absolute bottom-1 left-1 tracked i">{track.name}</h5></header>
              <section><p>{track.description}</p></section>
            </stellar-card>)}
          </stellar-grid>
        </stellar-layout>
        <stellar-layout size="large" padding="large" class="bb b--gray1 dm-b--gray9 bg-theme-base2 dm-bg-theme-base8">
          <stellar-layout size="small">
            <copy-wrap>
              <h2 class="parco alt">The Agenda</h2>
              <p>Acme automates your subscription revenue and customer reporting. Just connect your data and Acme will calculate and visualize your most important&nbsp;metrics.</p>
            </copy-wrap>
          </stellar-layout>
        </stellar-layout>
        <stellar-layout padding="large" class="bb b--gray1 dm-b--gray9">
          <stellar-layout size="small">
            <copy-wrap>
              <h2 class="parco alt">FAQ&rsquo;s</h2>
              <p>This website is operated by the Design Files. Throughout the site, the terms “we”, “us” and “our” refer to the Design Files. The Design Files offers this website, including all information, tools, and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies, and notices stated&nbsp;here.</p>
            </copy-wrap>
          </stellar-layout>
          <section>
            <stellar-accordion>
              <p slot="label" class="pa0">What am I paying $20 for?</p>
              <p>Opening Party / Drink Ticket, Breakfast, Soda &amp; Snacks, Lunch, BarCamp T-shirt, Good Times / New Friends (which is sorta priceless…)</p>
            </stellar-accordion>
            <stellar-accordion>
              <p slot="label" class="pa0">How long are the talks?</p>
              <p>Talks go for {this.conference && this.conference.talkLength}minutes</p>
            </stellar-accordion>
            <stellar-accordion>
              <p slot="label" class="pa0">Can I give a sales presentation?</p>
              <p class="fs2 parco alt">NOPE</p>
            </stellar-accordion>
          </section>
        </stellar-layout>
        <stellar-layout size="large" class="bb b--gray1 dm-b--gray7 bg-theme-base2 dm-bg-theme-base8" padding="large">
          <copy-wrap align="center">
            <h2 class="parco alt">Our Sponsors</h2>
            <p class="mb5">This website is operated by the Design Files. Throughout the site, the terms “we”, “us” and “our” refer to the Design Files.</p>

            {this.sponsors.hasPlatinum && <div>
              <h3 class="parco alt mb4">Platinum</h3>
              <stellar-grid class="mb5" style={{"--grid-width": "340px"}}>
                {this.sponsors.platinum.map(sponsor => <barcamp-sponsor sponsor={sponsor} />)}
              </stellar-grid>
            </div>}

            {this.sponsors.hasGold && <div>
              <h3 class="parco alt mb4">Gold</h3>
              <stellar-grid class="mb5" style={{"--grid-width": "270px"}}>
                {this.sponsors.gold.map(sponsor => <barcamp-sponsor sponsor={sponsor} />)}
              </stellar-grid>
            </div>}


            {this.sponsors.hasSilver && <div>
              <h3 class="parco alt mb4">Silver</h3>
              <stellar-grid class="mb5">
                {this.sponsors.silver.map(sponsor => <barcamp-sponsor sponsor={sponsor} />)}
              </stellar-grid>
            </div>}


            {this.sponsors.hasBronze && <div>
              <h3 class="parco alt mb4">Bronze</h3>
              <stellar-grid class="mb5" style={{"--grid-width": "150px"}}>
                {this.sponsors.bronze.map(sponsor => <barcamp-sponsor sponsor={sponsor} />)}
              </stellar-grid>
            </div>}


            {this.sponsors.hasCarbon && <div>
              <h3 class="parco alt mb4">Carbon</h3>
              <stellar-grid style={{"--grid-width": "100px"}}>
                {this.sponsors.carbon.map(sponsor => <barcamp-sponsor sponsor={sponsor} />)}
              </stellar-grid>
            </div>}
          </copy-wrap>
        </stellar-layout>
        <stellar-layout size="large" class="hero" padding="large">
          <copy-wrap align="center">
            <h2 class="parco mb4 fs1">Not ready to&nbsp;commit? That&rsquo;s&nbsp;okay!</h2>
            <p>We can send you an email or a push notification if you would like to be reminded before the event&nbsp;begins.</p>
            <div class="inline-flex items-baseline mt4">
              <stellar-button ghost class="mr4">Remind me </stellar-button>
              <stellar-button>Buy Tickets <stellar-asset name="arrow-dropright" align="right" /></stellar-button>
            </div>
          </copy-wrap>
        </stellar-layout>
      </Host>
    );
  }

}
