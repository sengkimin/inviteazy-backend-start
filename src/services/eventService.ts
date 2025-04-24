import { 
    IEvent, 
    IEventRepository, 
    IEventService 
  } from "../interfaces/eventInterface";
  
  export class EventService implements IEventService {
    constructor(private eventRepository: IEventRepository) {}
  
    async createEvent(event: Omit<IEvent, "id">): Promise<IEvent> {
      const newEvent = await this.eventRepository.create(event);
      return newEvent;
    }
  }
  