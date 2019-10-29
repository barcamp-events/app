import { Component, Host, h, Prop, State, Listen } from '@stencil/core';
import Talk from '../../../models/Talk';
import User from '../../../models/User';
import AuthenticationTunnel from '../../../tunnels/authentication';

@Component({
  tag: 'barcamp-schedule-talk-signed-up'
})
export class BarcampScheduleTalkSignedUp {

  @Prop() talk: Talk;
  @Prop() user: User;
  @Prop() speaker: User;

  @State() confirmCancel: boolean = false;

  async onCancel() {
    if (this.confirmCancel) {
      await (await document.querySelector("web-audio").source("cancel")).play();
      await this.talk.release();
    }
    else {
      this.confirmCancel = true;
    }
  }

  @Listen("keydown", {target: "document"})
  handleEscape(e) {
    if (e.key === 'Escape') {
      this.confirmCancel = false;
    }
  }

  render() {
    return <Host class="dc">
      <stellar-card>
        <header class="hero">
          <h5>{this.talk.title}</h5>
        </header>
        <section>
          <copy-wrap>
            <h5>{this.talk.title}</h5>
            <p>{this.talk.description}</p>
          </copy-wrap>
        </section>
        <footer class="flex items-center justify-between">
          <div class="flex">
            <stellar-avatar name={this.speaker && this.speaker.displayName} class="mr3" />
            <p>{this.speaker && this.speaker.displayName}</p>
          </div>
          {(this.user && this.talk.speakerKey === this.user.key) && <stellar-button tag="button" onClick={this.onCancel.bind(this)} ghost dark>{this.confirmCancel ? "Are you sure?" : "Cancel"}</stellar-button>}
        </footer>
      </stellar-card>
    </Host>
  }
}

AuthenticationTunnel.injectProps(BarcampScheduleTalkSignedUp, ['user']);
