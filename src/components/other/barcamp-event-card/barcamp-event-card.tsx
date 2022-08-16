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
        <midwest-card>
          <header class="hero">
            <midwest-grid
              class="items-center justify-between"
              style={{ "grid-template-columns": "auto auto" }}
            >
              <h5 class="parco text-3xl text-theme-8 dm:text-white">
                {this.conference.stylizedName || "BarCamp Undefined"}
                {this.conference?.venue?.name && (
                  <small class="db fs7 base7 dm-base-2">
                    At {this.conference?.venue?.name || "Unknown Venue"}
                  </small>
                )}
              </h5>
              <div class="flex flex-column text-center gap-4 items-center">
                <midwest-calendar-date
                  date={this.conference.start}
                  class="-mb-2"
                ></midwest-calendar-date>
                <midwest-clock
                  size={50}
                  time={this.conference.start.toISOString()}
                  between={this.conference.end.toISOString()}
                />
              </div>
            </midwest-grid>
          </header>
          <section>
            <copy-wrap full clamp="4">
              <h5 class="mw-100 text-theme-8 dm:text-white">
                {this.conference.stylizedName}
              </h5>
              <p class="mw-100">
                BarCamp's are user generated conferences where the speakers are
                everyday folks, talking about what makes them excited. Talks
                aren’t scheduled or planned until just before the conference
                starts, and anyone can give a talk. Interested, but don’t want
                to give a talk? That’s okay too!
              </p>
              <p class="mw-100">
                At BarCamp, you won’t find a predetermined speaker list or a
                line of suits passing out business cards. What you will find is
                some shaggy dude in a t-shirt talking about moonshine, a web
                developer talking about the best practices in SEO, or a world
                traveler sharing their experiences. BarCamp is a chance to
                network, learn something new, and communicate what you’re most
                passionate about. Come one, come all.
              </p>
            </copy-wrap>
          </section>
          <footer class="flex items-center justify-between">
            {this.loading && (
              <p class="self-center pa1 flex items-center">
                <midwest-asset
                  src="./assets/images/loading.svg"
                  class="base5 mr3 fs6"
                />
                One moment...
              </p>
            )}

            {!this.loading && !this.conference.is_user_attending(this.user) && (
              <midwest-button
                tag="button"
                class="w-auto"
                onClick={this.onAttendClick.bind(this)}
              >
                Attend
              </midwest-button>
            )}
            {!this.loading && this.conference.is_user_attending(this.user) && (
              <midwest-button
                tag="button"
                onClick={this.onUnattendClick.bind(this)}
                ghost
              >
                Unattend
              </midwest-button>
            )}

            <midwest-grid
              column-width="70"
              column-gap="1rem"
              class="w-full ml-8 max-w-xl"
            >
              <midwest-button
                href={this.conference.site_link}
                tag="link"
                block
                target="_blank"
              >
                Site
              </midwest-button>
              <midwest-button
                href={this.conference.ticket_link}
                tag="link"
                block
                target="_blank"
              >
                Tickets
              </midwest-button>
              <midwest-button
                href={
                  this.conference.schedule_link ||
                  `/${this.conference.slug}/${this.conference.year}/schedule`
                }
                tag="link"
                block
                target="_blank"
              >
                Schedule
              </midwest-button>
            </midwest-grid>
            {/* <p class="fs8">123 miles away</p> */}
          </footer>
        </midwest-card>
      </Host>
    );
  }

}

AuthenticationTunnel.injectProps(BarcampEventCard, ['user']);