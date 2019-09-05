import firebase from 'firebase';
import { Model, prop } from './Model';

export default class Image extends Model {
	static bucket = "images/";
	static size = 10;

    @prop()
    key: string;

    @prop()
    height: number;

    @prop()
    width: number;

    @prop()
    is_silhouette: string;

    @prop()
    url: string;

    @prop()
    owner: string;

    @prop()
    created_at: string;

    @prop()
	modified_at: string;

	async upload() {
		//
	}

    static get ref () {
        return firebase.firestore()
    }

    static get doc () {
        return Image.ref.doc(Image.bucket)
    }

    static get collection () {
        return firebase.firestore().collection(Image.bucket)
    }

    static async get(key) {
		let model = (await Image.ref.doc(key).get()).data();
		model = new Image(model)
		model.key = key;
		return model
    }

    static async list() {
		return await Image.collection.limit(Image.size).get();
    }

    static async add(data) {
		const model = new Image(data)
		return await Image.doc.set(model.serialize());
    }

    static async update(model: Image) {
		if (model) {
            const ref = Image.ref.doc(model.key)

            await ref.update({
                ...model.serialize(),
                updated: firebase.firestore.FieldValue.serverTimestamp()
            });
		}
    }

    static async delete(key) {
        const ref = Image.ref.doc(key)
		await ref.delete();
    }
}
