import firebase from 'firebase';
import { Model, prop } from './Model';
import Dayjs from 'dayjs';

export default class Talk extends Model {
	static bucket = "talk/";
	static size = 10;

	constructor(data?, config?) {
		super(data, config);

		this.onChange((data) => {
			this.populate(data);
		})
	}

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
    public time: Dayjs;

	@prop({defaultValue: [], emptyValue: []})
	public attendees: string[] = [];

	onChange(callback) {
		Talk.onChange(this.key, callback.bind(this))
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

	get is_taken() {
		return this.speakerKey && this.title && this.description
	}

	get is_signing_up() {
		return this.signingUpKey !== null;
	}

	// MODEL METHODS
	async save() {
		try {
			this.commit();
			const talk = await Talk.update(this);
			this.populate(talk);
			this.commit();
			return true
		} catch (e) {
			this.rollback()
			return false
		}
	}

	static get ref () {
		return firebase.firestore()
	}

	static doc (key) {
		return Talk.collection.doc(key)
	}

	static get collection () {
		return firebase.firestore().collection(Talk.bucket)
	}

	static async get(key: string): Promise<Talk> {
		let data = (await Talk.collection.doc(key).get()).data();
		const talk = new Talk(data)
		talk.key = key;
		return talk
	}

	static async where(options: any[]|any[][], getAs?: "one"|"many") {
		let result;
		let talks = [];

		if(options[0].constructor === Array) {
			let query = Talk.collection;
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
				result = result = await Talk.collection.where(options[0], options[1], options[2]).limit(1).get();
			} else {
				// @ts-ignore
				result = result = await Talk.collection.where(options[0], options[1], options[2]).get();
			}
		}

		result.forEach((doc) => {
			talks.push(new Talk(doc.data()));
		});

		if (getAs === "one") {
			return talks[0];
		} else {
			return talks;
		}
	}

	static async list() {
		let talks = [];
		let result = await Talk.collection.limit(Talk.size).get();

		result.forEach((doc) => {
			talks.push(new Talk(doc.data()))
		});

		return talks;
	}

	static async create(data: Talk): Promise<Talk> {
		let talk = new Talk({ ...data })
		const result = await Talk.collection.add(talk.serialize());
		talk.populate({key: result.id})
		await talk.save()
		return talk;
	}

	static async update(talk: Talk): Promise<Talk> {
		if (talk) {
			const ref = Talk.doc(talk.key)

			await ref.update({
				...talk.serialize(),
				updated: firebase.firestore.FieldValue.serverTimestamp()
			});

			return talk;
		}
	}

	static async delete(key) {
		const ref = Talk.doc(key)
		await ref.delete();
	}

	static async onChange(key, cb) {
		if (key) {
			Talk.doc(key).onSnapshot(docSnapshot => {
				cb(docSnapshot.data())
			})
		}
	}

	static async onNew(cb) {
		Talk.collection.onSnapshot(querySnapshot => {
			var talks = [];

			querySnapshot.forEach(function(doc) {
				talks.push(new Talk(doc.data()));
			});

			cb(talks)
		})
	}
}
