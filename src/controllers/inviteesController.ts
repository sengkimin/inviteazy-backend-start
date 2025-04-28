import { Request, Response, NextFunction } from "express";
import { IInviteeService } from "../interfaces/inviteesInterface";

export class InviteeController {
  constructor(private inviteeService: IInviteeService) {}

  async getAllInvitees(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.inviteeService.getAllInvitees();
      res.json({ message: "Invitees retrieved.", data: result });
    } catch (error) {
      next(error);
    }
  }

  async getInviteesByEventId(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId } = req.params;
      const result = await this.inviteeService.getInviteesByEventId(eventId);
      res.json({ message: "Invitees retrieved by event ID.", data: result });
    } catch (error) {
      next(error);
    }
  }

  async updateInviteeStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { inviteeId } = req.params;
      const { status } = req.body;

      const validStatuses = ["accept", "maybe", "no", "busy"];
      if (!validStatuses.includes(status)) {
         res.status(400).json({ message: "Invalid status value." });
         return;
      }

      const updated = await this.inviteeService.updateInviteeStatus(inviteeId, status);
      res.json({ message: "Invitee status updated.", data: updated });
    } catch (error) {
      next(error);
    }
  }

  async updateCheckInStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { event_id ,user_id} = req.params;
      console.log("event_id", event_id, user_id);

      const updated = await this.inviteeService.updateCheckInStatus(event_id, user_id);
      res.json({ message: "Invitee check-in status updated.", data: updated });
    } catch (error) {
      next(error);
    }
  }

  // async updateCheckInStatus(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { event_id, invitee_id } = req.params;
  
  //     const updated = await this.inviteeService.updateCheckInStatus(event_id, invitee_id);
  //     res.json({ message: "Invitee check-in status updated.", data: updated });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  
}
