import { Router } from "express";
import { EventController } from "../controllers/eventController";
import { authMiddleware } from "../middlewares/authMiddleware";

export default function eventRoutes(controller: EventController): Router {
  const router = Router();

  router.post("/events",  authMiddleware,  controller.createEvent.bind(controller));


  return router;
}
