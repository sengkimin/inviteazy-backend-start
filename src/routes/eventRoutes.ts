import { Router } from "express";
import { EventController } from "../controllers/eventController";
import { validateCreateEvent } from "../middlewares/validationMiddleware"; 
import { authMiddleware } from "../middlewares/authMiddleware";

export default function eventRoutes(controller: EventController): Router {
  const router = Router();

  router.post("/", authMiddleware, validateCreateEvent, controller.createEvent.bind(controller));

  router.get("/", controller.getAllEvents.bind(controller));

  router.post("/:eventId/invite", authMiddleware, controller.inviteUserToEvent.bind(controller));

  router.get("/:event_id/status", controller.getGuestInsights.bind(controller));


  return router;
}
