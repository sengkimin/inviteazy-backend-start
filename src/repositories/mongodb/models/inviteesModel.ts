import mongoose, { Schema, Document } from "mongoose";

export interface IInvitee extends Document {
  event_id: string;
  user_id: string;
  status: "pending" | "accept" | "maybe" | "no" | "busy";
  qr_code?: string;
  is_checked_in?: boolean;
  checked_in_at?: string;
  is_checked_out?: boolean;
  checked_out_at?: string;
  createdAt?: Date;
  gift_money?: number;
}

const inviteeSchema: Schema = new Schema(
  {
    event_id: { type: String, required: true },
    user_id: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "accept", "maybe", "no", "busy"],
      default: "pending",
      required: true,
    },
    qr_code: { type: String },
    is_checked_in: { type: Boolean, default: false },
    checked_in_at: { type: String },
    is_checked_out: { type: Boolean, default: false },
    checked_out_at: { type: String },
    gift_money: { type: Number },
  },
  { timestamps: true }
);

export const InviteeModel = mongoose.model<IInvitee>("Invitee", inviteeSchema);
