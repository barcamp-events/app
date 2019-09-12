import firebase from 'firebase';
import { Model, prop } from './Model';
import { MD5 } from './utils';
import Location from './Location';

export default class User extends Model {
	static bucket = "users/";
	static size = 10;

	constructor(data?, config?) {
		super(data, config);

		this.onChange((data) => {
			this.populate(data);
		})
	}

	@prop({
		populatable: ['firebase']
	})
	public displayName: string;

	@prop({
		populatable: ['firebase']
	})
	public email: string;

	@prop({
		populatable: ['firebase']
	})
	public key: string;

	@prop({
		populatable: ['firebase']
	})
	public social;

	@prop({
		defaultValue: "violet",
		populatable: ['firebase']
	})
	public color: string = "violet";

	@prop({
		emptyValue: false,
		populatable: ['firebase']
	})
	public dark_mode: boolean;

	@prop({
		emptyValue: false,
		populatable: ['firebase']
	})
	public reduced_motion;

	@prop({
		populatable: ['firebase']
	})
	public bio;

	@prop({
		populatable: []
	})
	public location;

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

	async currentLocation() {
		if (!this.location) {
			this.location = await Location.getCurrentCity();
		}

		return this.location;
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
		await User.doc(key).set(user.serialize('firebase'));
		return user;
	}

	static async update(user: User) {
		if (user) {
			const ref = User.doc(user.key)

			await ref.update({
				...user.serialize('firebase'),
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
