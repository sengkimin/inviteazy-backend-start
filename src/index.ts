import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { UserService } from "./services/userService";
import { UserController } from "./controllers/userController";
import { AuthController } from "./controllers/authController";
import { EventController } from "./controllers/eventController";
import { EventService } from "./services/eventService";
import { PostgresEventRepository } from "./repositories/postgres/eventRepository";


import authRoutes from "./routes/authRoutes";
import { connectPostgresDb } from "./config/postgresdb/db";
import { PostgresUserRepository } from "./repositories/postgres/userRepository";
import { loggingMiddleware } from "./middlewares/loggingMiddleware";
import eventRoutes from "./routes/eventRoutes";
// import { connectMongoDB } from "./config/mongodb/db";
// import { MongoUserRepository } from "./repositories/mongodb/userRepository";

dotenv.config();

const app = express();
const port = 3000;

// Switch connection to database
// connectMongoDB();
const pgPool = connectPostgresDb();

// Repositories
// const userRepository = new MongoUserRepository();
const userRepository = new PostgresUserRepository(pgPool);
const eventRepository = new PostgresEventRepository(pgPool);

// Services
const userService = new UserService(userRepository);
const eventService = new EventService(eventRepository);
// Controllers
const userController = new UserController(userService);
const authController = new AuthController(userService);
const eventController = new EventController(eventService);

// Middlewares
app.use(express.json());
app.use(loggingMiddleware);


// Routes
app.use("/api/users", userRoutes(userController));
app.use("/api/auth", authRoutes(authController));
app.use("/api/v1", eventRoutes(eventController));
// Handle Errors
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
