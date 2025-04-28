import { Pool } from "pg";
import { v4 as uuidv4 } from "uuid";
import { IInvitee, IInviteeRepository } from "../../interfaces/inviteesInterface";
import { queryWithLogging } from "./utils";

export class PostgresInviteeRepository implements IInviteeRepository {
  constructor(private pool: Pool) {}
  async updateCheckInStatus(event_id: string, user_id: string): Promise<IInvitee> {
    const { rows } = await queryWithLogging(
        this.pool,
        `
          UPDATE invitees
          SET is_checked_in = true, checked_in_at = NOW()
          WHERE event_id = $1 AND user_id = $2
          RETURNING *`,
        [event_id, user_id]
      );

      return rows[0];
    }

  async create(invitee: Omit<IInvitee, "id" | "created_at">): Promise<IInvitee> {
    // const inviteeId = uuidv4();
    const { rows } = await queryWithLogging(
      this.pool,
    `INSERT INTO invitees (
      id, event_id, user_id, status, qr_code,
      is_checked_in, checked_in_at, created_at,
      is_checked_out, checked_out_at, gift
   )
   VALUES ($1, $2, $3, $4, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT)
   RETURNING *`,
  [
    uuidv4(), // Generate a unique ID for the invitee
    invitee.event_id,
    invitee.user_id,
    invitee.status ?? "pending" // Default status value
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

  async findById(inviteeId: string): Promise<IInvitee | null> {
    const { rows } = await queryWithLogging(
      this.pool,
      `SELECT * FROM invitees WHERE id = $1`,
      [inviteeId]
    );
    return rows[0] ?? null;
  }

  async updateCheckinStatus(id: string): Promise<IInvitee | null> {
    return queryWithLogging(
      this.pool,
      `UPDATE public.invitees 
       SET is_checked_in = true, checked_in_at = NOW() 
       WHERE id = $1 
       RETURNING id, event_id, user_id, status, qr_code, is_checked_in, checked_in_at, created_at, is_checked_out, checked_out_at, gift`,
      [id]
    ).then((result) => result.rows[0] ?? null);
  }
  
  async updateCheckOutStatus(invite: Omit<IInvitee, "id">, id: string): Promise<IInvitee | null> {
    return queryWithLogging(
      this.pool,
      `UPDATE public.invitees 
       SET gift = $1, is_checked_out = true, checked_out_at = NOW() 
       WHERE id = $2 
       RETURNING id, event_id, user_id, status, qr_code, is_checked_in, checked_in_at, created_at, is_checked_out, checked_out_at, gift`,
      [invite.gift_money, id]
    ).then((result) => result.rows[0] ?? null);
  }
  
}


  