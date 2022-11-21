import jwt_decode from "jwt-decode";

export interface IUser {
    _id: string;
    token: string;
    name: string;
    role: string;
}

export class User implements IUser {
  _id = "anonym";
  token = "none";
  name = "anonym";
  role = "anonym";
  public constructor();
  public constructor(token :string);
  public constructor(...args: any[]) {
    if (args.length === 0) { return this; }
    if (args.length === 1) {
      const decode: any = jwt_decode(args[0]);
      this.token = args[0]; 
      this._id = decode._id;
      this.name = decode.name;
      this.role = decode.role;
      return this;
    }
    throw new Error('Undefined constructor');
  }
}
