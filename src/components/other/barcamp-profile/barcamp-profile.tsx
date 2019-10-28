import { Component, Host, h, State, Element } from '@stencil/core';
import AuthenticationTunnel from '../../../tunnels/authentication'
import delay from 'async-delay';

const colors = ["red", "orange", "yellow", "lime", "green", "teal", "cyan", "blue", "indigo", "violet", "fuschia", "pink", "gray"]

@Component({
  tag: 'barcamp-profile',
  styleUrl: 'barcamp-profile.css',
})
export class BarcampProfile {
  @Element() element: HTMLElement;
  @State() user: User;
  @State() success: boolean = false;

  @State() profileCard: HTMLStellarCardElement;

  componentDidLoad() {
    this.profileCard = this.element.querySelector('stellar-card#profile')
  }

  async onSubmit(e) {
    this.user.populate({...e.detail.json});
    this.user.dark_mode = (e.detail.json.dark_mode === "false") ? false : e.detail.json.dark_mode;
    this.user.reduced_motion = (e.detail.json.reduced_motion === "false") ? false : e.detail.json.reduced_motion;

    this.user.save();

    // @ts-ignore
    this.element.forceUpdate();

    this.success = true;

    await delay(100);

    await this.profileCard.flip_card();

    await delay(2000);

    await this.profileCard.flip_card();

    await delay(1000);

    this.success = false;
  }

  render() {
    return <Host>
    <stencil-route-title title="Sign up or Sign in" />
    <stellar-layout class="hero" size="flush" padding="medium">
      <stellar-layout size="small">
        <stellar-card id="profile" flippable={this.success} flip-icon={"false"}>
          <header>
            <copy-wrap align="center">
              <h5 class="parco i">Edit your Profile</h5>
            </copy-wrap>
          </header>
          <section>
            <stellar-form ajax onSubmitted={this.onSubmit.bind(this)}>
              <stellar-grid>
                <stellar-input name="displayName" placeholder="example@barcamp.events" label="Name" default={this.user.displayName} class="width-2" />
                <stellar-input name="bio" type="textarea" placeholder="Share your passion" label="Bio" class="width-2" default={this.user.bio} />
                <stellar-select name="color" label="Favorite color" overlay default={this.user.color}>
                  {colors.map(color => <stellar-item value={color}>{color}</stellar-item>)}
                </stellar-select>
                <stellar-input type="hidden" name="dark_mode" value={"false"} />
                <stellar-switch name="dark_mode" checkedDefault={this.user.dark_mode}><p>Dark Mode</p></stellar-switch>
                <stellar-input type="hidden" name="reduced_motion" value={"false"} />
                <stellar-switch name="reduced_motion" checkedDefault={this.user.reduced_motion}><p>Reduce Motion</p></stellar-switch>
              </stellar-grid>
              <stellar-button tag="submit">Save</stellar-button>
            </stellar-form>
          </section>
          {this.user && <section slot="back">
            <copy-wrap align="center" class="mt5">
              <stellar-avatar name={this.user.displayName} size="large" shape="circle" />
              <h4 class="parco">Saved your settings {this.user.displayName}!</h4>
            </copy-wrap>
          </section>}
        </stellar-card>
      </stellar-layout>
    </stellar-layout>
  </Host>;
  }
}

AuthenticationTunnel.injectProps(BarcampProfile, ['user']);
