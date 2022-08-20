import { Component, Host, h, Prop, State, Listen } from '@stencil/core';
import Talk from '../../../models/Talk';
import User from '../../../models/User';
import AuthenticationTunnel from '../../../tunnels/authentication';
import Notifications from '../../../models/Notifications';

@Component({
  tag: "barcamp-schedule-talk-signed-up",
})
export class BarcampScheduleTalkSignedUp {
  @Prop() talk: Talk;
  @Prop() user: User;
  @Prop() speaker: User;
  @Prop() readonly: boolean = false;

  @State() confirmCancel: boolean = false;
  @State() notifPermission: string;
  notifications!: Notifications;

  async onCancel() {
    if (this.confirmCancel) {
      await (await document.querySelector("web-audio").source("cancel")).play();
      await this.talk.release();
    } else {
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

  @Listen("keydown", { target: "document" })
  handleEscape(e) {
    if (e.key === "Escape") {
      this.confirmCancel = false;
    }
  }

  renderNotifications() {
    if (
      !this.talk.isRecievingNotification(this.user) &&
      !this.notifPermission &&
      this.user &&
      this.talk.speakerKey !== this.user.key
    ) {
      return (
        <midwest-button
          tag="button"
          onClick={this.onRemindMe.bind(this)}
          ghost
          dark
        >
          <midwest-asset name="notifications-outline" />
          Remind me
        </midwest-button>
      );
    }

    if (
      !this.talk.isRecievingNotification(this.user) &&
      this.notifPermission === "granted"
    ) {
      return (
        <midwest-button
          tag="button"
          onClick={this.onRemindMe.bind(this)}
          ghost
          dark
        >
          <midwest-asset name="notifications-off" />
          <midwest-tooltip>Reminder off</midwest-tooltip>
        </midwest-button>
      );
    }

    if (this.notifPermission === "granted") {
      return (
        <midwest-button
          tag="button"
          onClick={this.onDontRemindMe.bind(this)}
          ghost
          dark
        >
          <midwest-asset name="notifications" />
          <midwest-tooltip>Reminder on</midwest-tooltip>
        </midwest-button>
      );
    }

    if (this.notifPermission === "denied") {
      return (
        <midwest-button
          tag="button"
          onClick={this.onRemindMe.bind(this)}
          ghost
          dark
        >
          <midwest-asset name="notifications-off" />
          <midwest-tooltip>No permission</midwest-tooltip>
        </midwest-button>
      );
    }

    return "";
  }

  render() {
    return (
      <Host class="dc">
        <midwest-card padding="small">
          <header class="hero">
            <midwest-label class="uppercase" pill>
              {this.talk.trackTitle}
            </midwest-label>
            <h4 class="text-black dm:text-white">{this.talk.title}</h4>
          </header>
          <section>
            <copy-wrap>
              <p>{this.talk.description}</p>
            </copy-wrap>
          </section>
          <footer>
            <midwest-grid
              style={{ "--grid-width": "auto" }}
              class="justify-between"
            >
              <div class="flex width-2">
                <midwest-avatar
                  name={this.speaker && this.speaker.displayName}
                  class="mr-3"
                />
                <p>{this.speaker && this.speaker.displayName}</p>
              </div>
              {this.user && this.talk.speakerKey === this.user.key && (
                <midwest-button
                  tag="button"
                  onClick={this.onCancel.bind(this)}
                  ghost
                  dark
                >
                  {this.confirmCancel ? "Are you sure?" : "Cancel"}
                </midwest-button>
              )}
              {!this.readonly &&
                Notifications.supported &&
                this.renderNotifications()}
            </midwest-grid>
          </footer>
        </midwest-card>
      </Host>
    );
  }
}

AuthenticationTunnel.injectProps(BarcampScheduleTalkSignedUp, ['user']);
