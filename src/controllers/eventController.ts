import { Request, Response, NextFunction } from "express";
import { IEventService } from "../interfaces/eventInterface";
import { IInviteeService } from "../interfaces/inviteesInterface"; 
import { IEvent } from "../interfaces/eventInterface";

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

export class EventController {
  constructor(
    private eventService: IEventService,
    private inviteeService: IInviteeService 
  ) {}

  async createEvent(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user?.id;
      const { event_name, event_datetime, location, description }: IEvent = req.body;

      const newEvent = await this.eventService.createEvent({
        user_id: user,
        event_name,
        event_datetime,
        location,
        description,
      });

      res.status(201).json({
        message: "A new event was created.",
        data: newEvent,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unexpected error";
      res.status(500).json({ status: "error", message });
    }
  }

  async getAllEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.eventService.getAllEvents();
      res.json({ message: "Get all events.", data: result });
    } catch (error) {
      next(error);
    }
  }
  
  async inviteUserToEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { eventId } = req.params;
      const { user_id } = req.body;
  
      const newInvitee = await this.inviteeService.createInvitee({
        event_id: eventId,
        user_id,
        status: "pending",
      });
  
      res.status(201).json({ message: "User invited successfully", data: newInvitee });
    } catch (error) {
      next(error);
    }
  }


  async getGuestInsights(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const event_id = req.params.event_id;
      const insights = await this.inviteeService.getInviteesByEventId(event_id);
  
      const statusCounts = {
        totalInvited: insights.length,
        accept: 0,
        pending: 0,
        no: 0,
        busy: 0,
        maybe: 0,
        attended: 0,
        totalContribution: 0,
        totalGiftMoney: 0 
      };
  
      for (const invitee of insights) {
        const status = invitee.status;
        if (status in statusCounts) {
          statusCounts[status as keyof typeof statusCounts]++;
        }
  
        if (invitee.is_checked_in) {
          statusCounts.attended++;
        }
  
        if (invitee.gift_money) {
          statusCounts.totalGiftMoney += Number(invitee.gift_money);
        }
      }
  
      res.status(200).json({ data: statusCounts });
  
    } catch (error) {
      console.error("Error fetching guest insights:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  
  
}
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



