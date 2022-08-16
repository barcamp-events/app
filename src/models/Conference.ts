import { prop, asyncForEach } from '@midwest-design/common';
import Location from './Location'
import User from './User';
import Maps from './Maps';
import slugify from 'slugify';
import Dayjs from 'dayjs'
import Track from './Track';
import Sponsor from './Sponsor';
import { SponsorList } from "./SponsorList";
import FirebaseModel from './FirebaseModel';
import Talk from './Talk';
import TalkList from './TalkList';
import LineItem from './LineItem';
import { LineItemList } from './LineItemList';

export default class Conference extends FirebaseModel {
	static bucket = "conference/";
    static get model () { return Conference }
    static instantiate (args?) { return new Conference(args) }

	constructor(data?, config?) {
		super(data, config);
		this.updateSlug()

		this.onChange((_) => {
			this.updateSlug()
		})
	}

	@prop()
	public name: string;
	
	@prop({ defaultValue: "Share Your Passion", emptyValue: "Share Your Passion" })
	public mantra: string;

	@prop()
	public site_link: string;

	@prop()
	public ticket_link: string;

	@prop()
	public schedule_link: string;

	@prop()
	public color: ThemeableColors;

	@prop()
	public dark: boolean;

	@prop({ defaultValue: false, emptyValue: false })
	public createable: boolean;

	@prop({ defaultValue: () => { return Dayjs().get('year') } })
	public year: number;

	@prop()
	public slug: string;

	@prop()
	public step: string;

	@prop()
	public type: "online"|"in-person"|"hybrid";

	@prop({ defaultValue: false, emptyValue: false })
	public approved: boolean;

	@prop({cast: {handler: Location}})
	public venue: Location;

	@prop({defaultValue: [], emptyValue: []})
	public tracks: string[];

	@prop({defaultValue: [], emptyValue: []})
	public attendees: string[];

	@prop({defaultValue: [], emptyValue: []})
	public agenda: Agenda[];

	@prop({defaultValue: [], emptyValue: []})
	public sponsors: string[];

	@prop({defaultValue: [], emptyValue: []})
	public lineItems: string[];

	@prop({
		defaultValue: Dayjs().set('hour', 8).set('second', 0).set('minute', 0).set('millisecond', 0),
		cast: {
			handler: Dayjs
		}
	})
	public start: Dayjs.Dayjs;

	@prop({
		defaultValue: Dayjs().set('hour', 9).set('second', 0).set('minute', 0).set('millisecond', 0),
		cast: {
			handler: Dayjs
		}
	})
	public talksBegin: Dayjs.Dayjs;

	@prop({
		defaultValue: Dayjs().set('hour', 17).set('second', 0).set('minute', 0).set('millisecond', 0),
		cast: {
			handler: Dayjs
		}
	})
	public end: Dayjs.Dayjs;

	@prop({defaultValue: 30, emptyValue: 30})
	public talkLength: number;

	async prepare() {
		if (this.createable) {
			await this.createTracks()
		}
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

	async addSponsor(sponsor: Sponsor) {
		if (!this.is_sponsoring(sponsor)) {
			this.sponsors = [...this.sponsors, sponsor.key];
			return await this.save()
		}
	}

	async removeSponsor(sponsor: Sponsor) {
		if (this.is_sponsoring(sponsor)) {
			this.sponsors = this.sponsors.filter((key) => { return sponsor.key !== key });
			return await this.save()
		}
	}

	async addLineItem(lineItem: LineItem) {
		this.lineItems = [...this.lineItems, lineItem.key];
		return await this.save()
	}

	async removeLineItem(lineItem: LineItem) {
		this.lineItems = this.lineItems.filter((key) => { return lineItem.key !== key });
		return await this.save()
	}

	updateSlug() {
		this.slug = slugify(this.name).toLowerCase().replace("barcamp-", "");
	}

	get stylizedName() {
		return `${this.name} ${this.start.format('YYYY')}`
	}

	is_user_attending(user: User) {
		return this.attendees.includes(user.key)
	}

	is_sponsoring(sponsor: Sponsor) {
		return this.sponsors.includes(sponsor.key)
	}

	async getTalksInOrder () {
		const talks = await Talk.where(["conferenceKey", "==", this.key], "many") as Talk[];
		const list = new TalkList(talks);
		return list.by_time_and_tracks(this.tracks);
	}

	get slots() {
		return this.end.diff(this.talksBegin, 'minute') / this.talkLength
	}

	async createTracks(tracks: string[] = ["Technology", "Design", "Makers", "Kitchen Sink"]): Promise<Boolean> {
		let trackKeys = [];
		let talks = new Array(this.slots).fill(null);

		await asyncForEach(tracks, async (name) => {
			const track = await Track.create(new Track({name, conferenceKey: this.key, talks: talks}));
			trackKeys.push(track.key);
		})

		this.tracks = trackKeys;

		return true;
	}

	async theTracks(): Promise<Track[]> {
		const tracks = [];

		await asyncForEach(this.tracks, async (key, index) => {
			const track = await Track.get(key);
			tracks[index] = track;
		})

		return tracks;
	}

	async theSponsors(): Promise<SponsorList> {
		const sponsors = [];

		await asyncForEach(this.sponsors, async (key, index) => {
			const sponsor = await Sponsor.get(key);
			sponsors[index] = sponsor;
		});

		return new SponsorList(sponsors);
	}

	async theLineItems(): Promise<LineItemList> {
		const lineItems = [];

		await asyncForEach(this.lineItems, async (key, index) => {
			const lineItem = await LineItem.get(key);
			lineItems[index] = lineItem;
		});

		return new LineItemList(lineItems);
	}

	async theAttendees(): Promise<User[]> {
		const users = [];

		await asyncForEach(this.attendees, async (key, index) => {
			const user = await User.get(key);
			users[index] = user;
		});

		return users;
	}

	async resetConferenceTracks() {
		const tracks = await this.theTracks();

		await asyncForEach(tracks, async (track: Track) => {
			return await track.resetTalks()
		})
	}

	public isManagedBy(user: User): boolean { return this.owner === user.key; }

	public async distance(user: User) {
		const current = await user.currentLocation();
		return await Maps.get_distance(current, this.venue)
	}

	static async list(): Promise<Conference[]> { return await super.list() }
	static async create(data: Conference): Promise<Conference> { return await super.create(data) }
	static async update(data: Conference): Promise<Conference> { return await super.update(data) }
	static async get(key: string): Promise<Conference> { return await super.get(key) }

	static async upcoming() {
		let conferences = [];
		let today = Dayjs();
		let result = await Conference.collection.get();

		result.forEach((doc) => {
			let conf = new Conference(doc.data());

			if (today.isBefore(conf.end)) {
        conferences.push(conf);
      }
		});

		return conferences;
	}

	static async near_me() {
		//@ts-ignore
		const current = await Location.getCurrentCity();

		let conferences = [];
		let result = await Conference.collection.limit(Conference.size).get();

		result.forEach((doc) => {
			conferences.push(doc.data())
		});

		return conferences;
	}
}

window["Conference"] = Conference;
