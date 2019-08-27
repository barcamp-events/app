import {Model, prop} from './Model';

export default class User extends Model {
    @prop()
    public name: string;

    @prop()
    public email: string;

    @prop()
    public firebaseUID: string;

    public loggedIn() {}

    public static async get (): Promise<User> { return new User }
    public static async getByEmail (_: string): Promise<User> { return new User }
    public static async list (): Promise<User[]> { return [new User] }
    public static async create (): Promise<User> { return new User }
    public static async update (): Promise<User> { return new User }
    public static async delete (): Promise<boolean>  { return true }
}
