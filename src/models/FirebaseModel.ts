import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Model, prop } from '@midwest-design/common';

export default class FirebaseModel extends Model {
	static bucket = "default/";
	static size = 10;
	static instantiateList = (_?): any => false;

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

	onChange(callback) {
        if (this.key && callback) {
            // @ts-ignore
            this.constructor.onChange(this.key, callback.bind(this))
        }
    }

    async prepare() { return; }

    static get model () {
        return FirebaseModel
    }

    static instantiate (args?) {
        return new FirebaseModel(args)
    }

	// MODEL METHODS
	async save() {
		try {
            this.commit();
            // @ts-ignore
			const object = await this.constructor.update(this);
			this.populate(object);
			this.commit();
			return true
		} catch (e) {
            console.error(e);
			this.rollback()
			return false
		}
	}

	static get ref () {
		return firebase.firestore()
	}

	static doc (key) {
		return this.model.collection.doc(key)
	}

	static get collection () {
		return firebase.firestore().collection(this.model.bucket)
	}

	static async get(key: string): Promise<any> {
		let data = (await this.model.collection.doc(key).get()).data();
		const object = this.instantiate(data)
		object.key = key;
		return object
	}

	static async where(options: any[]|any[][], getAs?: "one"|"many"): Promise<any> {
		let result;
		let objects = [];

		if(options[0].constructor === Array) {
			let query = this.model.collection;
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
				result = result = await this.model.collection.where(options[0], options[1], options[2]).limit(1).get();
			} else {
				// @ts-ignore
				result = result = await this.model.collection.where(options[0], options[1], options[2]).get();
			}
		}

		result.forEach((doc) => {
			objects.push(this.instantiate(doc.data()));
		});

		if (getAs === "one") {
			return objects[0];
		} else {
			return (this.instantiateList()) ? this.instantiateList(objects) : objects;
		}
	}

	static async list(): Promise<any> {
		let objects = [];
		let result = await this.model.collection.limit(this.model.size).get();

		result.forEach((doc) => {
			objects.push(this.instantiate(doc.data()))
		});

        return (this.instantiateList()) ? this.instantiateList(objects) : objects;
	}

	static async create(data: any): Promise<any> {
		let object = this.instantiate({ ...data })
		const result = await this.model.collection.add(object.serialize());
		object.populate({key: result.id})
		await object.prepare()
		await object.save()
		return object;
	}

	static async update(object): Promise<any> {
		if (object) {
			const ref = this.model.doc(object.key)

			await ref.update({
				...object.serialize(),
				updated: firebase.firestore.FieldValue.serverTimestamp()
			});

			return object;
		}
	}

	static async delete(key) {
		const ref = this.model.doc(key)
		return await ref.delete();
	}

	static async onChange(key, cb) {
		if (key) {
			this.model.doc(key).onSnapshot(docSnapshot => {
				cb(docSnapshot.data())
			})
		}
	}

	static async onNew(cb) {
		this.model.collection.onSnapshot(querySnapshot => {
			var objects = [];

			querySnapshot.forEach(function(doc) {
				objects.push(this.instantiate(doc.data()));
			});

			cb(objects)
		})
	}
}
