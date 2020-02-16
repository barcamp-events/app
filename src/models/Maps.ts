import Location from "./Location";

export default class Maps {
	static places_api_key = "<@GOOGLE_PLACES_API@>";
	static maps_api_key = "<@GOOGLE_MAPS_API@>";
	static proxy = "https://cors-anywhere.herokuapp.com/";

	static async search_place (input) {
		let result = await fetch(`${Maps.proxy}https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${input}&inputtype=textquery&fields=place_id&key=${Maps.places_api_key}`);
		let json = await result.json()
		result = json["candidates"][0];

		const place = await Maps.get_place(result["place_id"]);

		return { place_id: result["place_id"], ...place["result"] };
    }

	static async reverse_geocode (lat, lng, level = "locality") {
		let result = await (await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=${level}&key=${Maps.places_api_key}`)).json()

		return result.results[0]
	}

	static async get_place (id) {
		let result = await fetch(`${Maps.proxy}https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&fields=name,rating,formatted_phone_number,photos,opening_hours,icon,url,geometry&key=${Maps.places_api_key}`);

		return await result.json()
	}

	static async get_distance(location: Location, destination: Location) {
		let result = await fetch(`${Maps.proxy}https://maps.googleapis.com/maps/api/distancematrix/json?origins=${location.latitude},${location.longitude}|${destination.latitude},${destination.longitude}&key=${Maps.places_api_key}`);
		result = await result.json();
		return result;
	}

	static get_picture(id) {
		return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=${id}&key=${Maps.places_api_key}`
	}
}
