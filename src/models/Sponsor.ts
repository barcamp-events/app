import { prop } from '@midwest-design/common';
import FirebaseModel from './FirebaseModel';
import { SponsorList } from './SponsorList';

export default class Sponsor extends FirebaseModel {
	static bucket = "sponsor/";
	static get model () { return Sponsor }
	static instantiate (args?) { return new Sponsor(args) }
	static instantiateList (args?) { return new SponsorList(args) }

	constructor(data?, config?) {
		super(data, config);
	}

	@prop({})
	public key: string;

	@prop({})
	public conferenceKey: string;

	@prop({})
	public name: string;

	@prop({})
    public description: string;

	@prop({})
	public level: "platinum"|"gold"|"silver"|"bronze"|"carbon";

	@prop({})
    public cta: string;

	@prop({})
    public image: string;
}
