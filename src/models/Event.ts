import {Model, prop} from './Model';
import User from './User';

export default class Event extends Model {

    @prop()
    public firebaseUID: string;

    public isManagedBy(_: User): boolean { return true; }
}
