import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.get("Authorization")?.split(" ")[1]; // Ambil token setelah 'Bearer'

  if (!token) {
    res.status(401).json({ error: "Unauthorized" }); // Jangan return response di luar `next()`
  }

  try {
    const decoded = jwt.verify(
      token!,
      process.env.JWT_SECRET || "default-secret"
    );
    if (typeof decoded !== "object" || !decoded) {
      res.status(401).json({ error: "Unauthorized" }); // Tidak mengembalikan Response selain error
    }

    req.body.user = decoded; // Menyimpan informasi user dari token
    next(); // Lanjutkan ke middleware atau route handler berikutnya
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" }); // Tangani error dengan respons
  }
}
