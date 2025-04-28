import { Request, Response, NextFunction } from "express";
import { IInviteeService } from "../interfaces/inviteesInterface";
import redisCache from "../services/cacheService";
import { IInvitee } from "../interfaces/inviteesInterface"; // Import IInvitee interface


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


  async createInvitee(req: Request, res: Response, next: NextFunction) {
    try {
      const { event_id, user_id } = req.body;
      const inviteeData: Omit<IInvitee, "id" | "created_at"> = {
        event_id,
        user_id,
        status: "pending", // Default status value
      };
  
      const newInvitee = await this.inviteeService.createInvitee(inviteeData);
      res.status(201).json({ message: "Invitee created.", data: newInvitee });
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

  async updateCheckOutStatus(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params; 
        const { gift } = req.body;
        if (!gift) {
            throw new Error("The 'gift' field is required.");
        }

        // Fetch the existing invite
        const existingInvite = await this.inviteeService.getinviteeById(id);
        if (!existingInvite) {
            throw new Error("Invite not found");
        }

        // Check if the invite is already checked out
        if (existingInvite.is_checked_out) {
            throw new Error("Invite is already checked out.");
        }else if (existingInvite.is_checked_in === false) {
            throw new Error("Invite is not checked in.");
        }

        // Create the invite data for update, preserving existing values
        const inviteData: Omit<IInvitee, "id"> = {
            event_id: existingInvite.event_id,
            user_id: existingInvite.user_id,
            status: existingInvite.status,
            qr_code: existingInvite.qr_code,
            is_checked_in: existingInvite.is_checked_in,
            checked_in_at: existingInvite.checked_in_at,
            is_checked_out: true, // Update to indicate checked out
            checked_out_at: new Date(), // Set current time for checkout
            gift_money: gift // Update with the provided gift
        };

        // Call the service with separate arguments as per the interface
        const result = await this.inviteeService.updateCheckOutStatus(inviteData, id);

        res.json({ message: "Invite status updated.", data: result });
    } catch (error) {
        next(error);
    }
}

}
