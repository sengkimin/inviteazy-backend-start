import mongoose, { Schema, Document } from "mongoose";

export interface IEventDocument extends Document {
  user_id: string;
  event_name: string;
  event_datetime: Date;
  location: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const eventSchema: Schema = new Schema(
  {
    user_id: { type: String, required: true },
    event_name: { type: String, required: true },
    event_datetime: { type: Date, required: true },
    location: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export const EventModel = mongoose.model<IEventDocument>("Event", eventSchema);
