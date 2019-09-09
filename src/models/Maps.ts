
export default class Maps {
	static api_key = "<@GOOGLE_PLACES_API@>";
	static proxy = "https://cors-anywhere.herokuapp.com/";

	static async search_place (input) {
		let result = await fetch(`${Maps.proxy}https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${input}&inputtype=textquery&fields=place_id&key=${Maps.api_key}`);
		let json = await result.json()
		result = json["candidates"][0];

		const place = await Maps.get_place(result["place_id"]);

		return {place_id: result["place_id"], ...place["result"]};
    }


	static async reverse_geocode (lat, lng, level = "locality") {
		let result = await (await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=${level}&key=${Maps.api_key}`)).json()

		return result.results[0]
	}

	static async get_place (id) {
		let result = await fetch(`${Maps.proxy}https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&fields=name,rating,formatted_phone_number,photos,opening_hours,icon,url,geometry&key=${Maps.api_key}`);

		return await result.json()
	}

	static get_picture(id) {
		return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=${id}&key=${Maps.api_key}`
	}
}
