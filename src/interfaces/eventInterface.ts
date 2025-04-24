export interface IEvent {
    id?: string;
    user_id?:string;
    event_name: string;
    event_datetime: string;
    location: string;
    description?: string;
    created_at?: Date;
    updated_at?: Date;
  }
  
  export interface IEventRepository {
    findAll(): Promise<IEvent[]>;
    create(event: Omit<IEvent, "id">): Promise<IEvent>;
  }
  
  export interface IEventService {
    getAllEvents(): Promise<IEvent[]>;
    createEvent(event: Omit<IEvent, "id">): Promise<IEvent>;
  }
  