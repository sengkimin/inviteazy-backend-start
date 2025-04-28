import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  
  email: string;
  password: string;
  full_name: string;
  phone_number?: string;
  profile_picture?: string;
  address?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    full_name: { type: String, required: true },
    phone_number: { type: String },
    profile_picture: { type: String },
    address: { type: String },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>("User", userSchema);
