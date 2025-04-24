import { NextFunction, Request, Response } from "express";
import { IEvent, IEventService } from "../interfaces/eventInterface";
import { AuthRequest } from "../middlewares/authMiddleware";
export class EventController {
  private eventService: IEventService;

  constructor(eventService: IEventService) {
    this.eventService = eventService;
  }

  async createEvent(req: AuthRequest, res: Response, next: NextFunction){
    try {
      const {

         event_name,
         event_datetime,
         location,
         description,
        //  create_at,
        //  update_at

        }: Omit<IEvent, "id"> = req.body;
        const {id} = req.user;
        
        if (!id) {
          res.status(400).json({ message: "id is required" });
          return;
        }

      const createEvent = await this.eventService.createEvent({
        user_id: id,
         event_name,
         event_datetime,
         location,
         description,
        // create_at: new Date(),
        // update_at: new Date()
        
      });
     
      res
        .status(201)
        .json({ message: "A new event was created.", data: createEvent });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}



