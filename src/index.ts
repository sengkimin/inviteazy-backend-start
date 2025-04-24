import inviteeRoutes from "./routes/inviteesRoute";
import { PostgresInviteeRepository } from "./repositories/postgres/inviteesRepository";
import { InviteeService } from "./services/inviteesService";
import { InviteeController } from "./controllers/inviteesController";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import eventRoutes from "./routes/eventRoutes";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { loggingMiddleware } from "./middlewares/loggingMiddleware";
import { UserService } from "./services/userService";
import { EventService } from "./services/eventService";
import { UserController } from "./controllers/userController";
import { AuthController } from "./controllers/authController";
import { EventController } from "./controllers/eventController";
import { PostgresUserRepository } from "./repositories/postgres/userRepository";
import { PostgresEventRepository } from "./repositories/postgres/eventRepository";  
import { connectPostgresDb } from "./config/postgresdb/db";



// import { connectMongoDB } from "./config/mongodb/db";


dotenv.config();

const app = express();
const port = 3000;


const pgPool = connectPostgresDb(); 
// await connectMongoDB();            


// Repositories
const userRepository = new PostgresUserRepository(pgPool);
const eventRepository = new PostgresEventRepository(pgPool);  
const inviteeRepository = new PostgresInviteeRepository(pgPool);



// Services
const userService = new UserService(userRepository);
const eventService = new EventService(eventRepository);  
const inviteeService = new InviteeService(inviteeRepository);


// Controllers
const userController = new UserController(userService);
const authController = new AuthController(userService);
// const eventController = new EventController(eventService);
const eventController = new EventController(eventService, inviteeService);

const inviteeController = new InviteeController(inviteeService);


// Middlewares
app.use(express.json());
app.use(loggingMiddleware);

// Routes
app.use("/api/users", userRoutes(userController));
app.use("/api/auth", authRoutes(authController));
app.use("/api/v1/events", eventRoutes(eventController)); 
app.use("/api/v1/invitations", inviteeRoutes(inviteeController)); 

// Handle Errors
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
