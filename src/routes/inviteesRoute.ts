
import { Router } from "express";
import { InviteeController } from "../controllers/inviteesController";
import { authMiddleware } from "../middlewares/authMiddleware";
import {validateInviteeStatus} from "../middlewares/validationMiddleware" 

export default function inviteeRoutes(controller: InviteeController): Router {
  const router = Router();

  router.patch("/:inviteeId",validateInviteeStatus, authMiddleware, controller.updateInviteeStatus.bind(controller));
  
  router.get("/", authMiddleware, controller.getAllInvitees.bind(controller));
  router.get("/:eventId", authMiddleware, controller.getInviteesByEventId.bind(controller));
  router.patch("/checkout/:id", authMiddleware, controller.updateCheckOutStatus.bind(controller));
  router.patch("/checkin/:event_id/:user_id", authMiddleware, controller.updateCheckInStatus.bind(controller));
  return router;
}
