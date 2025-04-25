import { Request, Response, NextFunction } from "express";
import { IInviteeService } from "../interfaces/inviteesInterface";
import redisCache from "../services/cacheService";


export class InviteeController {
  constructor(private inviteeService: IInviteeService) {}
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
  

  async getInviteesByEventId(req: Request, res: Response, next: NextFunction) {
    try {
      const cacheKey = `data:${req.method}:${req.originalUrl}`;
      const cacheData = await redisCache.get(cacheKey);
  
      if (cacheData) {
        res.json({ message: "Cache: Get invitees by event ID", data: JSON.parse(cacheData) });
        return;
      }
  
      const { eventId } = req.params;
      const result = await this.inviteeService.getInviteesByEventId(eventId);
      await redisCache.set(cacheKey, JSON.stringify(result), 360);
  
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
