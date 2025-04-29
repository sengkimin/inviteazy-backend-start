import { Request, Response, NextFunction } from "express";
import { IInviteeService } from "../interfaces/inviteesInterface";
import redisCache from "../services/cacheService";
import { IInvitee } from "../interfaces/inviteesInterface"; 


export class InviteeController {
  constructor(private inviteeService: IInviteeService) {}

async getInviteesByEventId(req: Request, res: Response, next: NextFunction) {
  try {
    const { eventId } = req.params;
    const cacheKey = `data:${req.method}:${req.originalUrl}`; 
    const cacheData = await redisCache.get(cacheKey);

    if (cacheData) {
      res.json({ message: `Cache: Get invitees by event ID ${eventId}`, data: JSON.parse(cacheData) });
      return;
    }

    const result = await this.inviteeService.getInviteesByEventId(eventId);
    await redisCache.set(cacheKey, JSON.stringify(result), 360); 

    res.json({ message: `Invitees retrieved for event ID ${eventId}.`, data: result });
  } catch (error) {
    next(error);
  }
}


  

async getAllInvitees(req: Request, res: Response, next: NextFunction) {
  try {
    const cacheKey = `data:${req.method}:${req.originalUrl}`;
    const cacheData = await redisCache.get(cacheKey);

    if (cacheData) {
      res.json({ message: "Cache: Get all invitees", data: JSON.parse(cacheData) });
      return;
    }

    const result = await this.inviteeService.getAllInvitees();
    await redisCache.set(cacheKey, JSON.stringify(result), 360); 

    res.json({ message: "Invitees retrieved.", data: result });
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
        console.log("Checkout request for ID:", id, "with gift:", gift);
        
        // Check if 'gift' is provided
        if (!gift) {
            throw new Error("The 'gift' field is required.");
        }

        // Fetch the existing invitee
        const existingInvite = await this.inviteeService.getinviteeById(id);
        if (!existingInvite) {
            throw new Error("Invite not found");
        }

        console.log("Existing Invite:", existingInvite);

        // Check if already checked out
        if (existingInvite.is_checked_out) {
            throw new Error("Invite is already checked out.");
        } else if (!existingInvite.is_checked_in) {
            throw new Error("Invite is not checked in.");
        }

        // Prepare updated invite data
        const inviteData: Omit<IInvitee, "id"> = {
            event_id: existingInvite.event_id,
            user_id: existingInvite.user_id,
            status: existingInvite.status,
            qr_code: existingInvite.qr_code,
            is_checked_in: existingInvite.is_checked_in,
            checked_in_at: existingInvite.checked_in_at,
            is_checked_out: true,
            checked_out_at: new Date(),
            gift_money: gift,
        };

        // Update status
        const result = await this.inviteeService.updateCheckOutStatus(inviteData, id);

        res.json({ message: "Invite status updated.", data: result });
    } catch (error) {
        next(error);
    }
}


}
