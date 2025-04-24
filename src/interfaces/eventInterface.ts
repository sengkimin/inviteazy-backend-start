

type UUID = `${string}-${string}-${string}-${string}-${string}`;

export interface IEvent {
  id?: UUID;
  user_id: UUID;
  event_name: string;
  event_datetime: Date;
  location: string;
  description: string;
  create_at?: Date;
  update_at?: Date;
}

  export interface IEventRepository {
    create(event: Omit<IEvent, "id" | "create_at" | "update_at">): Promise<IEvent>;
  }
  
  export interface IEventService {
    createEvent(event: Omit<IEvent, "id" | "create_at" | "update_at">): Promise<IEvent>;
  }
  