import { prop, asyncForEach } from './Model';
import Talk from './Talk';
import Conference from './Conference';
import FirebaseModel from './FirebaseModel';

export default class Track extends FirebaseModel {
	static bucket = "track/";
    static get model () { return Track }
    static instantiate (args?) { return new Track(args) }

	@prop({})
	public key: string;

	@prop({})
	public conferenceKey: string;

	@prop({})
	public name: string;

	@prop({})
	public image: string;

	@prop({defaultValue: "Churn, MRR, fundraising, or even the lemonade stand you ran when you were a kid are all fair game. This is a great place to talk about ways to build epic things and/or getting dat paper."})
	public description: string;

	@prop({defaultValue: [], emptyValue: []})
	public talks: string[];

	async prepare() {
		console.log("calling track prepare")
		await this.createTalks();
	}

	async createTalks(): Promise<Boolean> {
		let talkKeys = [];
		const conference: Conference = await Conference.get(this.conferenceKey);

		await asyncForEach(this.talks, async (_, index) => {
			const time = conference.talksBegin.add((conference.talkLength * index), "minute");
			const track = await Talk.create(new Talk({trackKey: this.key, conferenceKey: this.conferenceKey, time }));
			talkKeys.push(track.key);
		});

		this.talks = talkKeys;

		return true;
	}

	async theTalks(): Promise<Talk[]> {
		const talks = [];

		await asyncForEach(this.talks, async (key) => {
			const talk = await Talk.get(key);
			talks.push(talk);
		})

		return talks;
	}

	async resetTalks() {
		const talks = await this.theTalks();

		await asyncForEach(talks, async (talk: Talk) => {
			return await talk.release()
		})
	}
}

window["Track"] = Track;
