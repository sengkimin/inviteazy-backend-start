import { Request, Response, NextFunction } from "express";
import { z } from "zod";

// User validation schema
const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  full_name: z.string().min(1).optional(),
  phone_number: z.string().optional(),
  profile_picture: z.string().url().optional(),
  address: z.string().optional(),
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

// ID validation schema for URL params
const idParamSchema = z.object({
  id: z.string(),
});

// Event creation validation schema
const createEventSchema = z.object({
  event_name: z.string().min(1),
  event_datetime: z.string().datetime(),
  location: z.string().min(3),
  description: z.string().optional(),
});

// const createInviteeSchema = z.object({
//   event_id: z.string().uuid(),
//   user_id: z.string().uuid(),
//   status: z.enum(['pending', 'accept', 'maybe', 'no', 'busy']),
//   qr_code: z.string().optional(),
//   is_checked_in: z.boolean().optional(),
//   checked_in_at: z.string().datetime().optional(),
//   is_checked_out: z.boolean().optional(),          
//   checked_out_at: z.string().datetime().optional(),    
// });


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

// export const validateCreateInvitee = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): void => {
//   try {
//     createInviteeSchema.parse(req.body);
//     next();
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       res.status(400).json({ message: error.errors[0].message });
//       return;
//     }
//     next(error);
//   }
// };
