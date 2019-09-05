import firebase from 'firebase';
import { Model, prop } from './Model';
import Location from './location'
import User from './User';

export default class Event extends Model {
	static bucket = "event/";
    static size = 10;

    @prop()
    public key: string;

    @prop()
    public name: string;

    @prop()
    public venue: Location;

    @prop()
    public stripe_product_id: Location;

    @prop()
    public firebaseUID: string;


    // MODEL METHODS
    async save() {
        try {
            this.commit();
            const model = await Event.update(this);
            this.populate(model);
            this.commit();
        } catch (e) {
            this.rollback()
        }
    }

    public isManagedBy(_: User): boolean { return true; }

    static get ref () {
        return firebase.firestore()
    }

    static get doc () {
        return Event.ref.doc(Event.bucket)
    }

    static get collection () {
        return firebase.firestore().collection(Event.bucket)
    }

    static async get(key) {
		let model = (await Event.ref.doc(key).get()).data();
		model = new Event(model)
		model.key = key;
		return model
    }

    static async list() {
		return await Event.collection.limit(Event.size).get();
    }

    static async add(data) {
		const model = new Event(data)
		return await Event.doc.set(model.serialize());
    }

    static async update(model: Event) {
		if (model) {
            const ref = Event.ref.doc(model.key)

            await ref.update({
                ...model.serialize(),
                updated: firebase.firestore.FieldValue.serverTimestamp()
            });
		}
    }

    static async delete(key) {
        const ref = Event.ref.doc(key)
		await ref.delete();
    }
}
