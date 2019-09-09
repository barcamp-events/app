import firebase from 'firebase';
import { Model, prop } from './Model';
import Location from './Location'
import User from './User';

export default class Conference extends Model {
	static bucket = "conference/";
	static size = 10;

	constructor(data?, config?) {
		super(data, config);

		this.onChange((data) => {
			this.populate(data);
		})
	}

	@prop()
	public key: string;

	@prop()
	public owner: string;

	@prop()
	public name: string;

	@prop()
	public venue: Location;

	@prop()
	public start_date: Date;

	@prop()
	public end_date: Date;

	onChange(callback) {
		Conference.onChange(this.key, callback.bind(this))
	}

	// MODEL METHODS
	async save() {
		try {
			this.commit();
			const conference = await Conference.update(this);
			this.populate(conference);
			this.commit();
		} catch (e) {
			this.rollback()
		}
	}

	public isManagedBy(user: User): boolean { return this.owner === user.key; }

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
		const key = data.key;
		const conference = new Conference({ ...data, key })
		await Conference.doc(key).set(conference.serialize());
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
		Conference.doc(key).onSnapshot(docSnapshot => {
			cb(docSnapshot.data())
		})
	}

	static async onChange(key, cb) {
		Conference.doc(key).onSnapshot(docSnapshot => {
			cb(docSnapshot.data())
		})
	}
}

window["Conference"] = Conference;
