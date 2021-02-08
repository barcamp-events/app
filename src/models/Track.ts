import { prop, asyncForEach } from '@midwest-design/common';
import Talk from './Talk';
import Conference from './Conference';
import FirebaseModel from './FirebaseModel';
import { colors } from '@midwest-design/common';

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

	@prop()
	public color: string;

	@prop({})
	public image: string;

	@prop({defaultValue: "Churn, MRR, fundraising, or even the lemonade stand you ran when you were a kid are all fair game. This is a great place to talk about ways to build epic things and/or getting dat paper."})
	public description: string;

	@prop({defaultValue: [], emptyValue: []})
	public talks: string[];

	async prepare() {
		this.autoGenerateColor();
		await this.createTalks();
	}

	autoGenerateColor() {
		if (!this.color) {
			const safeColors = Object.keys(colors);
			let result = "";

			for (var i = 0; i < this.name.length; i++) {
				const hex = this.name.charCodeAt(i).toString(16);
				result += ("000"+hex).slice(-4);
			};

			const number = parseInt(result.slice(0, 7), 16);
			const color = safeColors[(number % safeColors.length - 1)];
			this.color = color;
		}
	}

	async createTalks(): Promise<Boolean> {
		let talkKeys = [];
		const conference: Conference = await Conference.get(this.conferenceKey);

		await asyncForEach(this.talks, async (_, index) => {
			const time = conference.talksBegin.add((conference.talkLength * index), "minute");

			const track = await Talk.create(new Talk({
				trackKey: this.key,
				conferenceKey: this.conferenceKey,
				trackTitle: this.name,
				time,
				talkLength: conference.talkLength
			}));

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
			talk.trackTitle = this.name;
			talk.trackKey = this.key;
			await talk.save()
			return await talk.release()
		})
	}
}

window["Track"] = Track;
