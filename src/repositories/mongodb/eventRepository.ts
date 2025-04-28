import { EventModel, IEventDocument } from "./models/eventModel";
import { IEvent, IEventRepository } from "../../interfaces/eventInterface";

export class MongoEventRepository implements IEventRepository {
  async findAll(): Promise<IEvent[]> {
    const events: IEventDocument[] = await EventModel.find();
    return events.map((event) => ({
      user_id: event.user_id,
      event_name: event.event_name,
      event_datetime: event.event_datetime.toISOString(),
      location: event.location,
      description: event.description,
      created_at: event.createdAt,
      updated_at: event.updatedAt,
    }));
  }

  async findById(id: string): Promise<IEvent | null> {
    const event: IEventDocument | null = await EventModel.findById(id);
    if (!event) return null;
    return {
      user_id: event.user_id,
      event_name: event.event_name,
      event_datetime: event.event_datetime.toISOString(),
      location: event.location,
      description: event.description,
      created_at: event.createdAt,
      updated_at: event.updatedAt,
    };
  }

  async create(event: Omit<IEvent, "id">): Promise<IEvent> {
    const newEvent = new EventModel(event);
    await newEvent.save();
    return {
      user_id: newEvent.user_id,
      event_name: newEvent.event_name,
      event_datetime: newEvent.event_datetime.toISOString(),
      location: newEvent.location,
      description: newEvent.description,
      created_at: newEvent.createdAt,
      updated_at: newEvent.updatedAt,
    };
  }
}
