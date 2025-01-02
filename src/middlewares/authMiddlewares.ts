import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1]; // Ambil token dari header Authorization

  if (!token) {
    // Mengirimkan error jika token tidak ada
    res.status(401).json({ error: "Token missing" });
    return; // Menghentikan eksekusi lebih lanjut setelah respons dikirim
  }

  try {
    // Dekode token
    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
      if (err) {
        // Mengirimkan error jika token tidak valid
        res.status(403).json({ error: "Invalid token" });
        return; // Menghentikan eksekusi lebih lanjut setelah respons dikirim
      } else {
        // Jika token valid, lanjutkan ke middleware berikutnya
        next();
      }
    });
  } catch (err) {
    // Menangani error lainnya
    res.status(403).json({ error: "Invalid token" });
    return; // Menghentikan eksekusi lebih lanjut setelah respons dikirim
  }
}
