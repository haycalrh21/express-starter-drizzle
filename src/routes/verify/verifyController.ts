import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export async function checkToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.headers.authorization?.split(" ")[1]; // Ambil token setelah 'Bearer'
  // console.log("Token from headers:", token); // Periksa token

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token!, process.env.JWT_SECRET || "secret");
    if (typeof decoded !== "object" || !decoded) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    req.body.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
