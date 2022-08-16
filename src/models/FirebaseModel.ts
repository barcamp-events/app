import {
  getFirestore,
  collection,
  query,
  getDoc,
  getDocs,
  where,
  limit,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  onSnapshot,
} from "@firebase/firestore";
import type { WhereFilterOp } from "@firebase/firestore";
import { Model, prop } from "@midwest-design/common";

export default class FirebaseModel extends Model {
  static bucket = "default/";
  static size = 10;
  static instantiateList = (_?): any => false;

  constructor(data?, config?) {
    super(data, config);

    this.onChange((data) => {
      this.populate(data);
    });
  }

  @prop()
  public key: string;

  @prop()
  public owner: string;

  onChange(callback) {
    if (this.key && callback) {
      // @ts-ignore
      this.constructor.onChange(this.key, callback.bind(this));
    }
  }

  async prepare() {
    return;
  }

  static get model() {
    return FirebaseModel;
  }

  static instantiate(args?) {
    return new FirebaseModel(args);
  }

  // MODEL METHODS
  async save() {
    try {
      this.commit();
      // @ts-ignore
      const object = await this.constructor.update(this);
      this.populate(object);
      this.commit();
      return true;
    } catch (e) {
      console.error(e);
      this.rollback();
      return false;
    }
  }

  static get ref() {
    return getFirestore();
  }

  static doc(key) {
    return getDoc(key);
  }

  static get collection() {
    return collection(getFirestore(), this.model.bucket);
  }

  static async get(key: any): Promise<any> {
    let data = (await getDoc(key)).data();
    const object = this.instantiate(data);
    object.key = key;
    return object;
  }

  static async where(
    options: any[] | any[][],
    getAs?: "one" | "many"
  ): Promise<any> {
    let result;
    let objects = [];

    if (options[0].constructor === Array) {
      let q;

      options.forEach((option: string[]) => {
        q = query(
          this.model.collection,
          where(option[0], option[1] as WhereFilterOp, option[2])
        );
      });

      if (getAs === "one") {
        result = await getDocs(query(q, limit(1)));
      } else {
        result = await getDocs(q);
      }
    } else {
      let q = await query(
        this.model.collection,
        where(options[0], options[1], options[2])
      );

      if (getAs === "one") {
        result = await getDocs(query(q, limit(1)));
      } else {
        result = await getDocs(q);
      }
    }

    result.forEach((doc) => {
      objects.push(this.instantiate(doc.data()));
    });

    if (getAs === "one") {
      return objects[0];
    } else {
      return this.instantiateList() ? this.instantiateList(objects) : objects;
    }
  }

  static async list(): Promise<any> {
    let objects = [];
    let q = query(this.model.collection, limit(this.model.size));
    let result = await getDocs(q);

    result.forEach((doc) => {
      objects.push(this.instantiate(doc.data()));
    });

    return this.instantiateList() ? this.instantiateList(objects) : objects;
  }

  static async create(data: any): Promise<any> {
    let object = this.instantiate({ ...data });
    const result = await addDoc(this.model.collection, object.serialize());
    object.populate({ key: result.id });
    await object.prepare();
    await object.save();
    return object;
  }

  static async update(object): Promise<any> {
    if (object) {
      await updateDoc(object.key, {
        ...object.serialize(),
        updated: serverTimestamp(),
      });

      return object;
    }
  }

  static async delete(key) {
    return await deleteDoc(key);
  }

  static async onChange(key, cb) {
    if (key) {
      onSnapshot(key, (docSnapshot) => {
        cb(docSnapshot.data());
      });
    }
  }

  static async onNew(cb) {
    onSnapshot(this.model.collection, (querySnapshot) => {
      var objects = [];

      querySnapshot.forEach(function (doc) {
        objects.push(this.instantiate(doc.data()));
      });

      cb(objects);
    });
  }
}
