

import { Pool, QueryResult } from "pg";
import{IEvent, IEventRepository} from "../../interfaces/eventInterface";
import { queryWithLogging } from "./utils";
import { v4 as uuidv4 } from 'uuid';

export class PostgresEventRepository implements IEventRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  // Create a new event
  async create(event: Omit<IEvent, "id"> ): Promise<IEvent> {
    try {
      
      // Hash the event's password
      const now = new Date();
      const newUuid: string = uuidv4();

      // Perform the insert query
      const { rows }: QueryResult = await queryWithLogging(
        this.pool,
        "INSERT INTO events (id, user_id, event_name, event_datetime, location, description, create_at, update_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, user_id, event_name, event_datetime, location, description, create_at, update_at",
        [
          newUuid,
          event.user_id,
          event.event_name,
          event.event_datetime,
          event.location,
          event.description,
          now,
          now
        ]
      );

      return rows[0];
    } catch (error) {
      console.error("Error in create:", error);
      throw new Error("Failed to create event");
    }
  }
}
