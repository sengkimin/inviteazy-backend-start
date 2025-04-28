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
}
