import Talk from './Talk';

export default class TalkList {
    private talks: Talk[];

	constructor(talks: Talk[]) {
		this.talks = talks;
    }

	by_time() {
        const list: {time?: number, dayjs: DayjsType, talks?: Talk[]}[] = [];

		this.talks.forEach((talk) => {
            const time = talk.time.unix();
            let result = list.findIndex((item) => item.time === time);

			if (result !== -1) {
				list[result].talks = [...list[result].talks, talk];
			} else {
				list.push({time, dayjs: talk.time, talks: [talk]})
			}
		});

		return list.sort((before, after) => before.time - after.time)
	}

    by_time_and_tracks(tracks: string[]) {
        const result = this.by_time();
        const entries = Object.entries(result);

        const sorted = entries.map((value) => {
            const object = value[1];

            object.talks = object.talks.sort((talk_before, talk_after) => { return tracks.indexOf(talk_before.trackKey) - tracks.indexOf(talk_after.trackKey); });

            return object;
        })

        return sorted;
    }

	by_track() {
		const list: Talk[][] = [];

		this.talks.forEach((talk) => {
			if (list[talk.trackTitle]) {
				list[talk.trackTitle].push(talk);
			} else {
				list[talk.trackTitle] = [talk];
			}
		});

		return list;
	}
}
