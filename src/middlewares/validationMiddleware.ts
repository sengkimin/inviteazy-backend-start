import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  full_name: z.string().min(1).optional(),
  phone_number: z.string().optional(),
  profile_picture: z.string().url().optional(),
  address: z.string().optional(),
});


const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const idParamSchema = z.object({
  id: z.string(),
});

const createEventSchema = z.object({
  event_name: z.string().min(1),
  event_datetime: z.string().datetime(),
  location: z.string().min(3),
  description: z.string().optional(),
});

const createInviteeSchema = z.object({
  user_id: z.string().uuid({ message: "Invalid user ID" }),
});


const updateInviteeStatusSchema = z.object({
  status: z.enum(["accept", "maybe", "no", "busy"]),
});

export const validateInviteeStatus = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    updateInviteeStatusSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
      return;
    }
    next(error);
  }
};

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
    createEventSchema.parse(req.body);
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

export const validateCreateEvent = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    createEventSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
      return;
    }
    next(error);
  }
};

export const validateCreateInvitee = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    createInviteeSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
      return;
    }
    next(error);
  }
};
