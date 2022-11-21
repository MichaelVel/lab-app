import {pbkdf2Sync, randomBytes} from "crypto";
import { Schema, InferSchemaType, model } from "mongoose";
import { sign } from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET as string;

const userSchema = new Schema({
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name: { 
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    hash: String,
    salt: String,
}, {strict: true});

userSchema.methods.setPassword = function (password: string) {
    this.salt = randomBytes(16).toString('hex');
    this.hash = pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
};

userSchema.methods.validPassword = function (password: string) {
    const hash = pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function () {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7 );
    return sign( {
        _id: this._id,
        email: this.email,
        name: this.name,
        role: this.role,
        exp: Math.trunc(expiry.getTime() / 1000),
    }, secret );
};

declare interface IUser extends InferSchemaType<typeof userSchema> {
   setPassword(password: string): void;
   validPassword(password:string): boolean;
   generateJwt(): string;
}

export const User =  model<IUser>('User', userSchema);
