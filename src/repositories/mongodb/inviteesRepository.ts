import { InviteeModel } from "./models/inviteesModel"; 
import {  IInvitee, IInviteeRepository } from "../../interfaces/inviteesInterface";

export class MongoInviteRepository implements IInviteeRepository {
  findAll(): Promise<IInvitee[]> {
      throw new Error("Method not implemented.");
  }
  findByEventId(eventId: string): Promise<IInvitee[]> {
      throw new Error("Method not implemented.");
  }
  updateStatus(inviteeId: string, status: string): Promise<IInvitee> {
      throw new Error("Method not implemented.");
  }
  async getAllInvites(): Promise<IInvitee[] | null> {
    const invites = await InviteeModel.find();
    if (!invites.length) return null;

    return invites.map(this.toInvite);
  }

  async updateInviteStatus(id: string, status: string): Promise<IInvitee | null> {
    try {
      const updated = await InviteeModel.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
  
      if (!updated) {
        throw new Error(`Invitee with ID ${id} not found.`);
      }
  
      return this.toInvite(updated);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update invitee status');
    }
  }
  

  async findById(id: string): Promise<IInvitee | null> {
    const invite = await InviteeModel.findById(id);
    return invite ? this.toInvite(invite) : null;
  }

  async updateCheckinStatus(id: string): Promise<IInvitee | null> {
    const updated = await InviteeModel.findByIdAndUpdate(
      id,
      { is_checked_in: true, checked_in_at: new Date().toISOString() },
      { new: true }
    );
    return updated ? this.toInvite(updated) : null;
  }

  async findAllAcceptedByEventID(eventID: string): Promise<IInvitee[]> {
    const invites = await InviteeModel.find({ event_id: eventID, status: "accept" });
    return invites.map(this.toInvite);
  }

  async create(invite: Omit<IInvitee, "id">): Promise<IInvitee> {
    const newInvite = new InviteeModel(invite);
    await newInvite.save();
    return this.toInvite(newInvite);
  }

  async findInviteByUserID(userID: string): Promise<IInvitee[] | null> {
    const invites = await InviteeModel.find({ user_id: userID });
    if (!invites.length) return null;
    return invites.map(this.toInvite);
  }

  // Helper to convert Mongoose doc to domain model
  private toInvite(doc: any): IInvitee {
    return {
      id: doc._id.toString(),
      event_id: doc.event_id,
      user_id: doc.user_id,
      status: doc.status,
      qr_code: doc.qr_code,
      is_checked_in: doc.is_checked_in,
      checked_in_at: doc.checked_in_at,
      is_checked_out: doc.is_checked_out,
      checked_out_at: doc.checked_out_at,
      gift_money: doc.gift_money,
    };
  }
}
