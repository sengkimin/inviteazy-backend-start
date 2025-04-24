import { Request, Response, NextFunction, RequestHandler } from "express";
import { string } from "joi";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: {id:string};


export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = {id:(decoded as any).id};
    next();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    res.status(401).json({ message: "Invalid token" });
    return;
  }
};
