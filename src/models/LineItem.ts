import { prop } from '@midwest-design/common';
import FirebaseModel from './FirebaseModel';
import { LineItemList } from './LineItemList';

export default class LineItem extends FirebaseModel {
	static bucket = "line_item/";
  static get model () { return LineItem }
  static instantiate (args?) { return new LineItem(args) }
  static instantiateList (args?) { return new LineItemList(args) }

	constructor(data?, config?) {
		super(data, config);
	}

	@prop()
	public key: string;

	@prop()
	public conferenceKey: string;

	@prop()
	public name: string;

	@prop()
  public description: string;

	@prop({cast: { handler: Number }})
  public cost: number;

	@prop({cast: { handler: Number }})
  public raised: number;
}
