import firebase from 'firebase';
import { Model, prop } from './Model';
import Image from './Image';

export default class User extends Model {
	static bucket = "users/";
	static size = 10;

    @prop()
    name;

    @prop()
    public email: string;

    @prop()
    public firebaseUID: string;

    @prop()
	key;

    @prop()
	social;

    @prop()
	images;

    @prop()
	birthday;

    @prop()
	description;

    @prop()
	privacy;

    @prop()
	stripe_customer;

	link(platform) {
		let url;

		if (platform === "twitter") {
			url = `https://twitter.com/${this.social.twitter}`
		} else if (platform === "facebook") {
			url = `https://facebook.com/${this.social.facebook}`
		} else if (platform === "instagram") {
			url = `https://instagram.com/${this.social.instagram}`
		}

		return url;
    }

    public loggedIn() {}

	get_profile_picture() {
		const image = new Image(this.images[0])
		return image.url
	}

	static async current() {
		let result = firebase.auth().currentUser

		if (result && result.uid) {
			return await User.get(result.uid)
		}

		return false;
	}

    // MODEL METHODS
    async save() {
        try {
            this.commit();
            const user = await User.update(this);
            this.populate(user);
            this.commit();
        } catch (e) {
            this.rollback()
        }
    }

    static get ref () {
        return firebase.firestore()
    }

    static get doc () {
        return User.ref.doc(User.bucket)
    }

    static get collection () {
        return firebase.firestore().collection(User.bucket)
    }

    static async get(key: string): Promise<User> {
		let data = (await User.ref.doc(key).get()).data();
		const user = new User(data)
		user.key = key;
		return user
    }

    static async list() {
		return await User.collection.limit(User.size).get();
    }

    static async create(data) {
        const key = firebase.auth().currentUser.uid;
		const user = new User({ ...data, key })
		return await User.ref.doc(key).set(user.serialize());
    }

    static async update(user: User) {
		if (user) {
            const ref = User.ref.doc(user.key)

            await ref.update({
                ...user.serialize(),
                updated: firebase.firestore.FieldValue.serverTimestamp()
            });
		}
    }

    static async delete(key) {
        const ref = User.ref.doc(key)
		await ref.delete();
    }
}
