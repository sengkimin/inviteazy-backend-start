import { Pool } from "pg";
import { v4 as uuidv4 } from "uuid";
import { IInvitee, IInviteeRepository } from "../../interfaces/inviteesInterface";
import { queryWithLogging } from "../postgres/utils";

export class MongoInviteRepository implements IInviteeRepository {
  constructor(private pool: Pool) {}
  findById(inviteeId: string): Promise<IInvitee | null> {
    throw new Error("Method not implemented.");
  }
  updateCheckInStatus(event_id: string, user_id: string): Promise<IInvitee> {
    throw new Error("Method not implemented.");
  }
  updateCheckinStatus(id: string): Promise<IInvitee | null> {
    throw new Error("Method not implemented.");
  }
  updateCheckOutStatus(invitee: Omit<IInvitee, "id">, id: string): Promise<IInvitee | null> {
    throw new Error("Method not implemented.");
  }

  async create(invitee: Omit<IInvitee, "id" | "created_at">): Promise<IInvitee> {
    const inviteeId = uuidv4();
    const { rows } = await queryWithLogging(
      this.pool,
      `INSERT INTO invitees (
          id, event_id, user_id, status, qr_code,
          is_checked_in, checked_in_at,
          is_checked_out, checked_out_at
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        inviteeId,
        invitee.event_id,
        invitee.user_id,
        invitee.status,
        invitee.qr_code || null,
        invitee.is_checked_in ?? false,
        invitee.checked_in_at || null,
        invitee.is_checked_out ?? false,                  
        invitee.checked_out_at || null                 
      ]
    );
    return rows[0];
  }

  async updateStatus(inviteeId: string, status: string): Promise<IInvitee> {
    const { rows } = await this.pool.query(
      `UPDATE invitees SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
      [status, inviteeId]
    );
    return rows[0];
  }

  async findAll(): Promise<IInvitee[]> {
    const { rows } = await queryWithLogging(this.pool, `SELECT * FROM invitees`);
    return rows;
  }

  async findByEventId(eventId: string): Promise<IInvitee[]> {
    const { rows } = await queryWithLogging(
      this.pool,
      `SELECT * FROM invitees WHERE event_id = $1`,
      [eventId]
    );
    return rows;
  }
}