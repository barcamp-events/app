import firebase from 'firebase';
import { Model, prop } from './Model';

export class SponsorList {
    public list: Sponsor[];

    constructor(list: Sponsor[] = []) {
        this.list = list;
	}

	get hasPlatinum() { return this.platinum.length !== 0 }
	get hasGold() { return this.gold.length !== 0 }
	get hasSilver() { return this.silver.length !== 0 }
	get hasBronze() { return this.bronze.length !== 0 }
	get hasCarbon() { return this.carbon.length !== 0 }

    get platinum() {
        return this.list.filter((sponsor: Sponsor) => { return sponsor.level.toLowerCase() === "platinum" })
    }

    get gold() {
        return this.list.filter((sponsor: Sponsor) => { return sponsor.level.toLowerCase() === "gold" })
    }

    get silver() {
        return this.list.filter((sponsor: Sponsor) => { return sponsor.level.toLowerCase() === "silver" })
    }

    get bronze() {
        return this.list.filter((sponsor: Sponsor) => { return sponsor.level.toLowerCase() === "bronze" })
    }

    get carbon() {
        return this.list.filter((sponsor: Sponsor) => { return sponsor.level.toLowerCase() === "carbon" })
    }
}

export default class Sponsor extends Model {
	static bucket = "sponsor/";
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
	public conferenceKey: string;

	@prop({})
	public name: string;

	@prop({})
    public description: string;

	@prop({})
	public level: "platinum"|"gold"|"silver"|"bronze"|"carbon";

	@prop({})
    public cta: string;

	@prop({})
    public image: string;

	onChange(callback) {
		Sponsor.onChange(this.key, callback.bind(this))
	}

	// MODEL METHODS
	async save() {
		try {
			this.commit();
			const talk = await Sponsor.update(this);
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
		return Sponsor.collection.doc(key)
	}

	static get collection () {
		return firebase.firestore().collection(Sponsor.bucket)
	}

	static async get(key: string): Promise<Sponsor> {
		let data = (await Sponsor.collection.doc(key).get()).data();
		const talk = new Sponsor(data)
		talk.key = key;
		return talk
	}

	static async where(options: any[]|any[][], getAs?: "one"|"many") {
		let result;
		let sponsors: Sponsor[] = [];

		if(options[0].constructor === Array) {
			let query = Sponsor.collection;
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
				result = result = await Sponsor.collection.where(options[0], options[1], options[2]).limit(1).get();
			} else {
				// @ts-ignore
				result = result = await Sponsor.collection.where(options[0], options[1], options[2]).get();
			}
		}

		result.forEach((doc) => {
			sponsors.push(new Sponsor(doc.data()));
		});

		if (getAs === "one") {
			return sponsors[0];
		} else {
			return new SponsorList(sponsors);
		}
	}

	static async list() {
		let sponsors = [];
		let result = await Sponsor.collection.limit(Sponsor.size).get();

		result.forEach((doc) => {
			sponsors.push(new Sponsor(doc.data()))
		});

		return new SponsorList(sponsors);
	}

	static async create(data: Sponsor): Promise<Sponsor> {
		let talk = new Sponsor({ ...data })
		const result = await Sponsor.collection.add(talk.serialize());
		talk.populate({key: result.id})
		await talk.save()
		return talk;
	}

	static async update(talk: Sponsor): Promise<Sponsor> {
		if (talk) {
			const ref = Sponsor.doc(talk.key)

			await ref.update({
				...talk.serialize(),
				updated: firebase.firestore.FieldValue.serverTimestamp()
			});

			return talk;
		}
	}

	static async delete(key) {
		const ref = Sponsor.doc(key)
		await ref.delete();
	}

	static async onChange(key, cb) {
		if (key) {
			Sponsor.doc(key).onSnapshot(docSnapshot => {
				cb(docSnapshot.data())
			})
		}
	}

	static async onNew(cb) {
		Sponsor.collection.onSnapshot(querySnapshot => {
			var sponsors = [];

			querySnapshot.forEach(function(doc) {
				sponsors.push(new Sponsor(doc.data()));
			});

			cb(sponsors)
		})
	}
}

window["Sponsor"] = Sponsor;
