import { Router } from "express";
import { EventController } from "../controllers/eventController";
import { validateCreateEvent, validateCreateInvitee } from "../middlewares/validationMiddleware"; 
import { authMiddleware } from "../middlewares/authMiddleware";

export default function eventRoutes(controller: EventController): Router {
  const router = Router();
  
  router.post("/", authMiddleware, validateCreateEvent, controller.createEvent.bind(controller));

  router.get("/", authMiddleware, controller.getAllEvents.bind(controller));

  router.get("/:event_id/status", authMiddleware, controller.getGuestInsights.bind(controller));
  
  router.post("/:eventId/invite", authMiddleware, validateCreateInvitee, controller.inviteUserToEvent.bind(controller));



  return router;
}
