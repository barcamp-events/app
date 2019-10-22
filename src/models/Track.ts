import firebase from '@firebase/app';
import { Model, prop, asyncForEach } from './Model';
import Talk from './Talk';
import Conference from './Conference';

export default class Track extends Model {
	static bucket = "track/";
	static size = 10;

	constructor(data?, config?) {
		super(data, config);

		this.onChange((data) => {
			this.populate(data);
		});
	}

	@prop({})
	public key: string;

	@prop({})
	public conferenceKey: string;

	@prop({})
	public name: string;

	@prop({})
	public image: string;

	@prop({defaultValue: "Churn, MRR, fundraising, or even the lemonade stand you ran when you were a kid are all fair game. This is a great place to talk about ways to build epic things and/or getting dat paper."})
	public description: string;

	@prop({defaultValue: [], emptyValue: []})
	public talks: string[];

	onChange(callback) {
		Track.onChange(this.key, callback.bind(this))
	}

	async createTalks(): Promise<Boolean> {
		let talkKeys = [];
		const conference = await Conference.get(this.conferenceKey)

		await asyncForEach(this.talks, async (_, index) => {
			const time = conference.start.add((conference.talk_length * (index - 1)), "minute");
			const track = await Talk.create(new Talk({trackKey: this.key, conferenceKey: this.conferenceKey, time }));
			talkKeys.push(track.key);
		})

		this.talks = talkKeys;

		return true;
	}

	async theTalks(): Promise<Talk[]> {
		const talks = [];

		await asyncForEach(this.talks, async (key) => {
			const talk = await Talk.get(key);
			talks.push(talk);
		})

		return talks;
	}

	async resetTalks() {
		const talks = await this.theTalks();

		await asyncForEach(talks, async (talk: Talk) => {
			return await talk.release()
		})
	}

	// MODEL METHODS
	async save() {
		try {
			this.commit();
			const track = await Track.update(this);
			this.populate(track);
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
		return Track.collection.doc(key)
	}

	static get collection () {
		return firebase.firestore().collection(Track.bucket)
	}

	static async get(key: string): Promise<Track> {
		let data = (await Track.collection.doc(key).get()).data();
		const track = new Track(data)
		track.key = key;
		return track
	}

	static async where(options: any[]|any[][], getAs?: "one"|"many") {
		let result;
		let tracks = [];

		if(options[0].constructor === Array) {
			let query = Track.collection;
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
				result = result = await track.collection.where(options[0], options[1], options[2]).limit(1).get();
			} else {
				// @ts-ignore
				result = result = await track.collection.where(options[0], options[1], options[2]).get();
			}
		}

		result.forEach((doc) => {
			tracks.push(new Track(doc.data()));
		});

		if (getAs === "one") {
			return tracks[0];
		} else {
			return tracks;
		}
	}

	static async list() {
		let tracks = [];
		let result = await Track.collection.limit(Track.size).get();

		result.forEach((doc) => {
			tracks.push(new Track(doc.data()))
		});

		return tracks;
	}

	static async create(track: Track): Promise<Track> {
		const result = await Track.collection.add(track.serialize());
		track.populate({key: result.id})
		await track.createTalks()
		await track.save()
		return track;
	}

	static async update(track: Track): Promise<Track> {
		if (track) {
			const ref = Track.doc(track.key)

			await ref.update({
				...track.serialize(),
				updated: firebase.firestore.FieldValue.serverTimestamp()
			});

			return track;
		}
	}

	static async delete(key) {
		const ref = Track.doc(key)
		await ref.delete();
	}

	static async onChange(key, cb) {
		if (key) {
			Track.doc(key).onSnapshot(docSnapshot => {
				cb(docSnapshot.data())
			})
		}
	}

	static async onNew(cb) {
		Track.collection.onSnapshot(querySnapshot => {
			var tracks = [];

			querySnapshot.forEach(function(doc) {
				tracks.push(new Track(doc.data()));
			});

			cb(tracks)
		})
	}
}
