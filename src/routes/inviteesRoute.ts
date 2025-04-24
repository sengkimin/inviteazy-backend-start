
import { Router } from "express";
import { InviteeController } from "../controllers/inviteesController";
import { authMiddleware } from "../middlewares/authMiddleware"; 

export default function inviteeRoutes(controller: InviteeController): Router {
  const router = Router();

  router.get("/", controller.getAllInvitees.bind(controller));
  router.get("/event/:eventId", controller.getInviteesByEventId.bind(controller));

  router.patch("/:inviteeId", authMiddleware, controller.updateInviteeStatus.bind(controller));

  return router;
}
