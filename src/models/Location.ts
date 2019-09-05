import firebase from 'firebase';
import { Model, prop } from './Model';

export default class Location extends Model {
	static bucket = "location/";
    static size = 10;

    @prop()
    key;

    @prop()
	latitude;

    @prop()
	longitude;

    @prop()
	altitude;

    @prop()
	accuracy;

    @prop()
	city;

    @prop()
	street;

    @prop()
	region;

    @prop()
	postalCode;

    @prop()
	country;

    @prop()
	name;

    @prop()
    timestamp;


    async reverse_lookup() {
        //
	}

	static async retrieve_current_position() {
        //
    }

	static async find(address) {
        console.log(address)
	}


    // MODEL METHODS
    async save() {
        try {
            this.commit();
            const model = await Location.update(this);
            this.populate(model);
            this.commit();
        } catch (e) {
            this.rollback()
        }
    }

    static get ref () {
        return firebase.firestore()
    }

    static get doc () {
        return Location.ref.doc(Location.bucket)
    }

    static get collection () {
        return firebase.firestore().collection(Location.bucket)
    }

    static async get(key) {
		let model = (await Location.ref.doc(key).get()).data();
		model = new Location(model)
		model.key = key;
		return model
    }

    static async list() {
		return await Location.collection.limit(Location.size).get();
    }

    static async add(data) {
		const model = new Location(data)
		return await Location.doc.set(model.serialize());
    }

    static async update(model: Location) {
		if (model) {
            const ref = Location.ref.doc(model.key)

            await ref.update({
                ...model.serialize(),
                updated: firebase.firestore.FieldValue.serverTimestamp()
            });
		}
    }

    static async delete(key) {
        const ref = Location.ref.doc(key)
		await ref.delete();
    }
}
