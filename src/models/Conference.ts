import firebase from 'firebase';
import { Model, prop } from './Model';
import Location from './Location'
import User from './User';
import Maps from './Maps';
import slugify from 'slugify';
import Dayjs from 'dayjs'

export default class Conference extends Model {
	static bucket = "conference/";
	static size = 10;

	constructor(data?, config?) {
		super(data, config);
		this.updateSlug()

		this.onChange((data) => {
			this.populate(data);
			this.updateSlug()
		})
	}

	@prop({})
	public key: string;

	@prop({})
	public owner: string;

	@prop({})
	public name: string;

	@prop({ defaultValue: () => { return Dayjs().get('year') } })
	public year: number;

	@prop({ })
	public slug: string;

	@prop({})
	public venue: Location;

	@prop({defaultValue: [], emptyValue: []})
	public attendees: string[] = [];

	@prop({
		defaultValue: Dayjs().set('hour', 8).set('second', 0).set('minute', 0).set('millisecond', 0),
		cast: {
			handler: Dayjs
		}
	})
	public start: Dayjs.Dayjs;

	@prop({
		defaultValue: Dayjs().set('hour', 17).set('second', 0).set('minute', 0).set('millisecond', 0),
		cast: {
			handler: Dayjs
		}
	})
	public end: Dayjs.Dayjs;

	onChange(callback) {
		Conference.onChange(this.key, callback.bind(this))
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

	updateSlug() {
		this.slug = slugify(this.name).toLowerCase();
	}

	get stylizedName() {
		return `BarCamp ${this.name} ${this.start.format('YYYY')}`
	}

	is_user_attending(user: User) {
		return this.attendees.includes(user.key)
	}

	// MODEL METHODS
	async save() {
		try {
			this.commit();
			const conference = await Conference.update(this);
			this.populate(conference);
			this.commit();
			return true
		} catch (e) {
			this.rollback()
			return false
		}
	}

	public isManagedBy(user: User): boolean { return this.owner === user.key; }
	public async distance(user: User) {
		const current = await user.currentLocation();
		return await Maps.get_distance(current, this.venue)
	}

	static get ref () {
		return firebase.firestore()
	}

	static doc (key) {
		return Conference.collection.doc(key)
	}

	static get collection () {
		return firebase.firestore().collection(Conference.bucket)
	}

	static async get(key: string): Promise<Conference> {
		let data = (await Conference.collection.doc(key).get()).data();
		const conference = new Conference(data)
		conference.key = key;
		return conference
	}

	static async where(options: any[]|any[][], getAs?: "one"|"many") {
		let result;
		let conferences = [];

		if(options[0].constructor === Array) {
			let query = Conference.collection;
			// @ts-ignore
			options.forEach((option: string[]) => {
				// @ts-ignore
				query = query.where(option[0], option[1], option[2])
			})

			if (getAs === "one") {
				result = await query.limit(1).get()
			} else {
				result = await query.get()
			}

		} else {
			if (getAs === "one") {
				// @ts-ignore
				result = result = await Conference.collection.where(options[0], options[1], options[2]).limit(1).get();
			} else {
				// @ts-ignore
				result = result = await Conference.collection.where(options[0], options[1], options[2]).get();
			}
		}

		result.forEach((doc) => {
			conferences.push(new Conference(doc.data()));
		});

		if (getAs === "one") {
			return conferences[0];
		} else {
			return conferences;
		}
	}

	static async list() {
		let conferences = [];
		let result = await Conference.collection.limit(Conference.size).get();

		result.forEach((doc) => {
			conferences.push(new Conference(doc.data()))
		});

		return conferences;
	}

	static async near_me() {
		const current = await Location.getCurrentCity();

		console.log("Searching in", current.latitude, current.longitude);

		let conferences = [];
		let result = await Conference.collection.limit(Conference.size).get();

		result.forEach((doc) => {
			conferences.push(doc.data())
		});

		return conferences;
	}

	static async create(data): Promise<Conference> {
		let conference = new Conference({ ...data })
		const result = await Conference.collection.add(conference.serialize());
		conference.populate({key: result.id})
		await conference.save()
		console.log(conference);
		return conference;
	}

	static async update(conference: Conference): Promise<Conference> {
		if (conference) {
			const ref = Conference.doc(conference.key)

			await ref.update({
				...conference.serialize(),
				updated: firebase.firestore.FieldValue.serverTimestamp()
			});

			return conference;
		}
	}

	static async delete(key) {
		const ref = Conference.doc(key)
		await ref.delete();
	}

	static async onChange(key, cb) {
		if (key) {
			Conference.doc(key).onSnapshot(docSnapshot => {
				cb(docSnapshot.data())
			})
		}
	}

	static async onNew(cb) {
		Conference.collection.onSnapshot(querySnapshot => {
			var conferences = [];

			querySnapshot.forEach(function(doc) {
				conferences.push(new Conference(doc.data()));
			});

			cb(conferences)
		})
	}
}

window["Conference"] = Conference;
