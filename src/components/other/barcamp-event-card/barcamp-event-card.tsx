import { Component, Host, h, Prop, Element, State, Method } from '@stencil/core';
import Conference from '../../../models/Conference';
import AuthenticationTunnel from '../../../tunnels/authentication';
import delay from 'async-delay'

@Component({
  tag: 'barcamp-event-card',
  styleUrl: 'barcamp-event-card.css'
})
export class BarcampEventCard {
  @Element() element: HTMLElement;
  @Prop() conference: Conference;
  @Prop() user: User;
  @State() loading: boolean = false;

  componentDidLoad() {
    this.conference.onChange(() => {
      // @ts-ignore
      this.element.forceUpdate();
    })
  }

  @Method()
  async get_conf() {
    return this.conference;
  }

  @Method()
  async get_user() {
    return this.user;
  }

  async onAttendClick() {
    this.loading = true;
    await this.conference.attend(this.user);
    await delay(600)
    this.loading = false;
  }

  async onUnattendClick() {
    this.loading = true;
    await this.conference.unattend(this.user);
    await delay(600)
    this.loading = false;
  }

  render() {
    return (
      <Host>
        <stellar-card>
          <header class="hero">
            <stellar-grid class="items-center justify-between" style={{"grid-template-columns": "auto auto"}}>
              <h5 class="parco">{this.conference.stylizedName || "BarCamp Undefined"}<small class="db fs7 theme-base7 dm-theme-base2">At {this.conference.venue.name}</small></h5>
              <div class="tc">
                <div class="bg-white dm-bg-black flex flex-column tc br3 overflow-hidden shadow-1 mw3 mb3">
                  <h6 class="pa2">{this.conference.start.format('D')}</h6>
                  <h6 class="fs7 bg-theme-complement5 ma0 ph3 pv2 parco fw6 theme-complement0">{this.conference.start.format('MMM')}</h6>
                </div>
                <stellar-clock size={50} time={this.conference.start.toISOString()} between={this.conference.end.toISOString()} />
              </div>
            </stellar-grid>
          </header>
          <section>
            <copy-wrap full>
              <h5 class="mw-100">BarCamp Lincoln's first year!</h5>
              <p class="mw-100">BarCamp's are user generated conferences where the speakers are everyday folks, talking about what makes them excited. Talks aren’t scheduled or planned until just before the conference starts, and anyone can give a talk. Interested, but don’t want to give a talk? That’s okay too!</p>
              <p class="mw-100">At BarCamp, you won’t find a predetermined speaker list or a line of suits passing out business cards. What you will find is some shaggy dude in a t-shirt talking about moonshine, a web developer talking about the best practices in SEO, or a world traveler sharing their experiences. BarCamp is a chance to network, learn something new, and communicate what you’re most passionate about. Come one, come all.</p>
            </copy-wrap>
          </section>
          <footer class="flex items-end justify-between">
            {this.loading && <p class="self-center pa1 flex items-center">
              <stellar-asset src="./assets/images/loading.svg" class="theme-base5 mr3 fs6" />
              One sec...
            </p>}

            {/* <stellar-grid align="baseline" style={{"grid-template-columns": "auto auto"}}>
              {!this.loading && !this.conference.is_user_attending(this.user) && <stellar-button tag="button" onClick={this.onAttendClick.bind(this)}>Attend</stellar-button>}
              {!this.loading && this.conference.is_user_attending(this.user) && <stellar-button href={`/${this.conference.slug}/${this.conference.year}/schedule`} tag="route-link">Schedule</stellar-button>}
              {!this.loading && this.conference.is_user_attending(this.user) && <stellar-button tag="button" onClick={this.onUnattendClick.bind(this)} ghost>Leave</stellar-button>}
            </stellar-grid> */}

            <stellar-grid style={{ "--grid-width": "70px", "--grid-gap": "1rem" }} class="mt3 w-100">
              <stellar-button href={this.conference.site_link} tag="link" block target="_blank">Site</stellar-button>
              <stellar-button href={this.conference.ticket_link} tag="link" block target="_blank">Tickets</stellar-button>
              <stellar-button href={this.conference.schedule_link} tag="link" block target="_blank">Schedule</stellar-button>
            </stellar-grid>
            {/* <p class="fs8">123 miles away</p> */}
          </footer>
        </stellar-card>
      </Host>
    );
  }

}

AuthenticationTunnel.injectProps(BarcampEventCard, ['user']);
