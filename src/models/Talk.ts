import { prop } from '@midwest-design/common';
import Dayjs from 'dayjs';
import FirebaseModel from './FirebaseModel';

export default class Talk extends FirebaseModel {
	static format = "h:mma";
	static bucket = "talk/";
	static get model () { return Talk }
	static instantiate (args?) { return new Talk(args) }

	@prop({})
	public key: string;

	@prop({})
	public speakerKey: string;

	@prop({})
	public trackKey: string;

	@prop({})
	public signingUpKey: string;

	@prop({})
	public conferenceKey: string;

	@prop({defaultValue: 30, emptyValue: 30})
	public talkLength: number;

	@prop({})
	public title: string;

	@prop({})
    public description: string;

	@prop({})
	public trackTitle: string;

	@prop({
		cast: {
			handler: Dayjs
		}
	})
    public time: DayjsType;

	@prop({defaultValue: [], emptyValue: []})
	public attendees: string[] = [];

	@prop({defaultValue: [], emptyValue: []})
	public notify: string[] = [];

	async release () {
		this.populate({
			speakerKey: null,
			signingUpKey: null,
			title: null,
			description: null,
			talkLength: 30,
			attendees: []
		});

		await this.save();
	}

	get friendlyLength() {
		return `From ${this.time.format(Talk.format)} to ${this.time.add(this.talkLength, 'minute').format(Talk.format)}`;
	}

	async attend(user: User) {
		if (!this.isUserAttending(user)) {
			this.attendees = [...this.attendees, user.key];
			return await this.save()
		}
	}

	async unattend(user: User) {
		if (this.isUserAttending(user)) {
			this.attendees = this.attendees.filter((key) => { return user.key !== key });
			return await this.save()
		}
	}

	isUserAttending(user: User) {
		return this.attendees.includes(user.key)
	}

	get isTaken() {
		return this.title && this.description
	}

	get isAvailable() {
		return !this.isTaken && !this.isSigningUp;
	}

	get isSigningUp() {
		return this.signingUpKey && !this.isTaken;
	}

	async sendNotification (user: User) {
		if (!this.isRecievingNotification(user)) {
			this.notify = [...this.notify, user.key];
			return await this.save();
		}
	}

	async dontSendNotification (user: User) {
		if (this.isRecievingNotification(user)) {
			this.notify = this.notify.filter((key) => { return user.key !== key });
			return await this.save();
		}
	}

	isRecievingNotification(user: User) {
		return this.notify.includes(user.key)
	}

	static async switch(from: Talk, to: Talk) {
		const fromClone = from.clone();
		const toClone = to.clone();

		await to.populate({
			speakerKey: fromClone.speakerKey,
			signingUpKey: fromClone.signingUpKey,
			title: fromClone.title,
			description: fromClone.description,
			attendees: fromClone.attendees,
			notify: fromClone.notify,
		});

		await from.populate({
			speakerKey: toClone.speakerKey,
			signingUpKey: toClone.signingUpKey,
			title: toClone.title,
			description: toClone.description,
			attendees: toClone.attendees,
			notify: toClone.notify,
		});

		await to.save();
		await from.save();

		return true;
	}
}

window["Talk"] = Talk;
