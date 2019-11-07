import { Component, Host, h, Prop, State, Listen } from '@stencil/core';
import Talk from '../../../models/Talk';
import User from '../../../models/User';
import AuthenticationTunnel from '../../../tunnels/authentication';
import Notifications from '../../../models/Notifications';

@Component({
  tag: 'barcamp-schedule-talk-signed-up'
})
export class BarcampScheduleTalkSignedUp {

  @Prop() talk: Talk;
  @Prop() user: User;
  @Prop() speaker: User;

  @State() confirmCancel: boolean = false;
  @State() notifPermission: string;
  notifications!: Notifications;

  async onCancel() {
    if (this.confirmCancel) {
      await (await document.querySelector("web-audio").source("cancel")).play();
      await this.talk.release();
    }
    else {
      this.confirmCancel = true;
    }
  }

  async onRemindMe() {
    if (!this.notifications) {
      this.notifications = new Notifications();
    }

    if (this.notifications.granted) {
      this.notifPermission = "granted";
      await this.talk.sendNotification(this.user);
    } else {
      this.notifPermission = "denied";
    }
  }

  async onDontRemindMe() {
    if (!this.notifications) {
      this.notifications = new Notifications();
    }

    if (this.notifications.granted) {
      this.notifPermission = "granted";
      await this.talk.dontSendNotification(this.user);
    } else {
      this.notifPermission = "denied";
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
        <footer>
          <stellar-grid style={{"--grid-width": "auto"}} class="justify-between">
            <div class="flex width-2">
              <stellar-avatar name={this.speaker && this.speaker.displayName} class="mr3" />
              <p>{this.speaker && this.speaker.displayName}</p>
            </div>
            {(this.user && this.talk.speakerKey === this.user.key) && <stellar-button tag="button" onClick={this.onCancel.bind(this)} ghost dark>{this.confirmCancel ? "Are you sure?" : "Cancel"}</stellar-button>}
            {Notifications.supported && !this.talk.isRecievingNotification(this.user) && !this.notifPermission && (this.user && this.talk.speakerKey !== this.user.key) && <stellar-button tag="button" onClick={this.onRemindMe.bind(this)} ghost dark><stellar-asset name="notifications-outline" />Remind me</stellar-button>}
            {Notifications.supported && !this.talk.isRecievingNotification(this.user) && this.notifPermission === "granted" && <stellar-button tag="button" onClick={this.onRemindMe.bind(this)} ghost dark><stellar-asset name="notifications-off" /><stellar-tooltip>Reminder off</stellar-tooltip></stellar-button>}
            {Notifications.supported && this.talk.isRecievingNotification(this.user) && this.notifPermission === "granted" && <stellar-button tag="button" onClick={this.onDontRemindMe.bind(this)} ghost dark><stellar-asset name="notifications" /><stellar-tooltip>Reminder on</stellar-tooltip></stellar-button>}
            {Notifications.supported && this.notifPermission === "denied" && <stellar-button tag="button" onClick={this.onRemindMe.bind(this)} ghost dark><stellar-asset name="notifications-off" /><stellar-tooltip>No permission</stellar-tooltip></stellar-button>}
          </stellar-grid>
        </footer>
      </stellar-card>
    </Host>
  }
}

AuthenticationTunnel.injectProps(BarcampScheduleTalkSignedUp, ['user']);
