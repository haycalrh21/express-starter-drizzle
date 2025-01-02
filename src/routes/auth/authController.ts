import { Request, Response } from "express";
import { db } from "../../db/index.js";
import { eq } from "drizzle-orm";
import { userTable } from "../../db/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateUserToken = (user: any) => {
  return jwt.sign(
    { userId: user.id, role: user.role, email: user.email },
    process.env.JWT_SECRET || "", // Pastikan JWT_SECRET valid di environment
    {
      expiresIn: "7d", // Set token expired 30 hari
    }
  );
};

export async function loginUser(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    // Cek user berdasarkan email
    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));

    if (!user) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }

    // Cek password yang diberikan
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      res.status(401).json({ error: "Account not found" });
      return;
    }

    // Generate token untuk user
    const token = generateUserToken(user);

    // Set token ke cookie
    res.cookie("TOKEN", token, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // @ts-ignore
    delete user.password;
    // Kirimkan response sukses dengan token dan data user
    res.status(200).json({ token, user, message: "Login successful" });
  } catch (e) {
    console.error("Error in login:", e); // Tambahkan log error
    res.status(500).json({ error: "Internal Server Error" }); // Pastikan ada response error
  }
}

export async function registerUser(req: Request, res: Response) {
  const { email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10); // hash password

  try {
    const data = {
      email,
      password: hashPassword,
      role: "admin",
    };

    // Insert pengguna baru ke dalam tabel
    const [user] = await db.insert(userTable).values(data).returning();
    res.status(200).json({
      user,
      message: "User registered successfully",
    }); // mengirimkan response JSON dengan status 200
  } catch (error) {
    console.error(error); // log error untuk debugging
    res.status(500).json({ error: "Failed to register user" });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const { id } = req.params; // Mengambil ID dari URL parameter
    if (!id) {
      res.status(400).json({ error: "User ID is required" });
    }

    // Logika untuk mengambil data user berdasarkan id dari database
    const user = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, parseInt(id)));
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await db.select().from(userTable);
    res.json({
      users,
      message: "Users fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch users",
    });
  }
}

export async function logoutUser(req: Request, res: Response) {
  try {
    res.clearCookie("TOKEN");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to logout user" });
  }
}
