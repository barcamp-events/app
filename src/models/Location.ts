import firebase from 'firebase';
import { Model, prop } from './Model';
import { Plugins } from '@capacitor/core';
import Maps from './Maps';

export default class Location extends Model {
	static bucket = "location/";
    static size = 10;

    @prop()
    key;

    // Geo
    @prop()
    accuracy;

    // Geo
    @prop()
	latitude;

    // Geo
    @prop()
    longitude;

    // Geo
    @prop()
    timestamp;

    // Reverse Lookup
    @prop()
	city;

    // Reverse Lookup
    @prop()
	street;

    // Reverse Lookup
    @prop()
	region;

    // Reverse Lookup
    @prop()
	postalCode;

    // Reverse Lookup
    @prop()
    state;

    // Reverse Lookup
    @prop()
    country;

    // Reverse Lookup
    @prop()
    place_id;

    // Reverse Lookup
    @prop({emptyValue: "no name"})
    name;

    // Reverse Lookup
    @prop()
	address;

    // Reverse Lookup
    @prop()
    url;

    get directions() {
        return `https://www.google.com/maps/dir/?api=1&destination_place_id=${this.place_id}`;
    }

    static async getCurrentCity() {
        const { Geolocation } = Plugins;
        const position = await Geolocation.getCurrentPosition();
        const reverseLookup = await Location.reverseLookup(position.coords);

        return new Location({
            timestamp: position.timestamp,
            accuracy: position.coords.accuracy,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: reverseLookup.formatted_address,
            name: reverseLookup.address_components[0].long_name + " " + reverseLookup.address_components[2].long_name,
            city: reverseLookup.address_components[0],
            region: reverseLookup.address_components[1],
            state: reverseLookup.address_components[2],
            country: reverseLookup.address_components[3],
            place_id: reverseLookup.place_id
        });
    }

    static async getByAddress(address) {
        const position = await Location.find(address);

        const reverseLookup = await Location.reverseLookup({
            latitude: position.geometry.location.lat,
            longitude: position.geometry.location.lng
        }, "street_address");

        return new Location({
            latitude: position.geometry.location.lat,
            longitude: position.geometry.location.lng,
            name: position.name,
            address: reverseLookup.formatted_address,
            place_id: position.place_id,
            url: position.url
        });
    }

	static async find(address) {
        return await Maps.search_place(address)
    }

    static async reverseLookup({latitude, longitude}, level = "locality") {
        return await Maps.reverse_geocode(latitude, longitude, level);
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


window["BarCampLocation"] = Location;
