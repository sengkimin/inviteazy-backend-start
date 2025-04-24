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


// type UUID = `${string}-${string}-${string}-${string}-${string}`;

// export interface IEvent {
//   id?: UUID;
//   user_id: UUID;
//   event_name: string;
//   event_datetime: Date;
//   location: string;
//   description: string;
//   create_at?: Date;
//   update_at?: Date;
// }

//   export interface IEventRepository {
//     create(event: Omit<IEvent, "id" | "create_at" | "update_at">): Promise<IEvent>;
//   }
  
//   export interface IEventService {
//     createEvent(event: Omit<IEvent, "id" | "create_at" | "update_at">): Promise<IEvent>;
//   }
  