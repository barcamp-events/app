import { prop } from './Model';
import FirebaseModel from './FirebaseModel';

export default class Image extends FirebaseModel {
	static bucket = "images/";
  static get model () { return Image }
  static instantiate (args?) { return new Image(args) }

  @prop()
  height: number;

  @prop()
  width: number;

  @prop()
  is_silhouette: string;

  @prop()
  url: string;

  @prop()
  owner: string;

  @prop()
  created_at: string;

  @prop()
  modified_at: string;

	async upload() {
		//
	}
}
