import { prop } from './Model';
import Dayjs from 'dayjs';
import FirebaseModel from './FirebaseModel';

export default class Talk extends FirebaseModel {
	static bucket = "talk/";
    static get model () { return Talk }
    static instantiate (args?) { return new Talk(args) }

	@prop({})
	public key: string;

	@prop({})
	public speakerKey: string;

	@prop({})
	public signingUpKey: string;

	@prop({})
	public conferenceKey: string;

	@prop({})
	public title: string;

	@prop({})
    public description: string;

	@prop({
		cast: {
			handler: Dayjs
		}
	})
    public time: DayjsType;

	@prop({defaultValue: [], emptyValue: []})
	public attendees: string[] = [];

	async release () {
		this.populate({
			speakerKey: null,
			signingUpKey: null,
			title: null,
			description: null,
			attendees: []
		});

		await this.save();
	}

	async attend(user: User) {
		if (!this.is_user_attending(user)) {
			this.attendees = [...this.attendees, user.key];
			return await this.save()
		}
	}

	async unattend(user: User) {
		if (this.is_user_attending(user)) {
			this.attendees = this.attendees.filter((key) => { return user.key !== key });
			return await this.save()
		}
	}

	is_user_attending(user: User) {
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
}
