import { Pool } from "pg";
import { IEvent, IEventRepository } from "../../interfaces/eventInterface";
import { queryWithLogging } from "./utils";
import { v4 as uuidv4 } from 'uuid';



export class PostgresEventRepository implements IEventRepository {
  constructor(private pool: Pool) {}

  async findAll(): Promise<IEvent[]> {
    const { rows } = await queryWithLogging(
      this.pool,
      `SELECT id, user_id, event_name, event_datetime, location, description, created_at, updated_at FROM events`
    );
    return rows;
  }

  async create(event: Omit<IEvent, "id">): Promise<IEvent> {
    const eventId = uuidv4();
    const { rows } = await queryWithLogging(
      this.pool,
      `INSERT INTO events 
        (id, user_id, event_name, event_datetime, location, description) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id, user_id, event_name, event_datetime, location, description, created_at, updated_at`,
      [
        eventId,
        event.user_id,
        event.event_name,
        event.event_datetime,
        event.location,
        event.description || null,
      ]
    );
    return rows[0];
  }

 
  


}
