import { IEvent, IEventRepository } from "../interfaces/eventInterface";
import { IEventService } from "../interfaces/eventInterface";

export class EventService implements IEventService {
  constructor(private eventRepository: IEventRepository) {}

  async getAllEvents() {
    return await this.eventRepository.findAll();
  }

  async createEvent(event: Omit<IEvent, "id">) {
    const newEvent = await this.eventRepository.create(event);
    return newEvent;
  }
  
}


