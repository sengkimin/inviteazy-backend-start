import { NextFunction, Request, Response } from "express";
import { IUser, IUserService } from "../interfaces/userInterface";
import redisCache from "../services/cacheService";

export class UserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.userService.getAllUsers();
      res.json({ message: "Get all users.", data: result });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const cacheKey = `data:${req.method}:${req.originalUrl}`;
      const cacheData = await redisCache.get(cacheKey);

      if (cacheData) {
        res.json({
          message: "Cache: Get user by Id",
          data: JSON.parse(cacheData),
        });
        return;
      }

      const { id } = req.params;
      const result = await this.userService.getUserById(id);
      await redisCache.set(cacheKey, JSON.stringify(result), 360);

      res.json({ message: "Api: Get user by Id", data: result });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        email,
        password,
        full_name,
        phone_number,
        profile_picture,
        address,
      }: Omit<IUser, "id"> = req.body;
  
      console.log("Creating user with:", req.body);
  
      


      const newUser = await this.userService.createUser({
        email,
        password,
        full_name,
        phone_number,
        profile_picture,
        address,

      });
  
      res.status(201).json({
        message: "A new user was created.",
        data: newUser,
      });
    } catch (error) {
      console.error("Create user failed:", error);
 
      next(error);
    }
  }
  
}
