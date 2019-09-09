import firebase from 'firebase';
import { Model, prop } from './Model';
import { MD5 } from './utils';

export default class User extends Model {
	static bucket = "users/";
	static size = 10;

	constructor(data?, config?) {
		super(data, config);

		this.onChange((data) => {
			this.populate(data);
		})
	}

	@prop()
	public displayName: string;

	@prop()
	public email: string;

	@prop()
	public key: string;

	@prop()
	public social;

	@prop({defaultValue: "violet"})
	public color: string = "violet";

	@prop({emptyValue: false})
	public dark_mode: boolean;

	@prop({emptyValue: false})
	public reduced_motion;

	@prop()
	public bio;

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

	onChange(callback) {
		User.onChange(this.key, callback.bind(this))
	}

	public loggedIn() {}

	get profile_picture() {
		return 'http://www.gravatar.com/avatar/' + MD5(this.email) + '.jpg?s=200&d=blank';
	}

	get is_usable () {
		return this.key && this.displayName && this.email;
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

	static doc (key) {
		return User.collection.doc(key)
	}

	static get collection () {
		return firebase.firestore().collection(User.bucket)
	}

	static async get(key: string): Promise<User> {
		let data = (await User.collection.doc(key).get()).data();
		const user = new User(data)
		user.key = key;
		return user
	}

	static async list() {
		return await User.collection.limit(User.size).get();
	}

	static async create(data) {
		const key = data.key;
		const user = new User({ ...data, key })
		await User.doc(key).set(user.serialize());
		return user;
	}

	static async update(user: User) {
		if (user) {
			const ref = User.doc(user.key)

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

	static async onChange(key, cb) {
		User.doc(key).onSnapshot(docSnapshot => {
			cb(docSnapshot.data())
		})
	}
}

window["User"] = User;
