import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const userSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  full_name: z.string().min(3, { message: "Full name must be at least 3 characters" }),
  phone_number: z.string().min(8, { message: "Phone number must be at least 8 digits" }).optional(),
  profile_picture: z.string().url({ message: "Invalid profile picture URL" }).optional(),
  address: z.string().min(3, { message: "Address is too short" }),
});

const eventSchema = z.object({
  user_id: z.string(),
  event_name: z.string().min(3, { message: "Event name must be at least 3 characters" }),
  event_datetime: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
  location: z.string().min(3, { message: "Location must be at least 3 characters" }),
  description: z.string().min(3, { message: "Description must be at least 3 characters" }),
  create_at: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }).optional(),
  update_at: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }).optional(),
});


  // role: z.enum(["admin", "public", "tourist"]),


const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const idParamSchema = z.object({
  id: z.string(),
});

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    userSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
      return;
    }
    next(error);
  }
};

export const validateEvent = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    eventSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
      return;
    }
    next(error);
  }
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
      return;
    }
    next(error);
  }
};

export const validateIdInURLParam = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    idParamSchema.parse(req.params);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
      return;
    }
    next(error);
  }
};
