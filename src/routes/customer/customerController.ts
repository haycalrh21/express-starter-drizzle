import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { customerTable } from "../../db/customerSchema.js";
import { db } from "../../db/index.js";
import { desc } from "drizzle-orm/expressions.js";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: "dn7elxsw6",
  api_key: "765376974365957",
  api_secret: "2WoTsfxjwx7pqCB8C7d2agTwcEs",
});

export async function CreateCustomer(
  req: Request,
  res: Response
): Promise<void> {
  const { name, email, phone, address, dateOfBirth, gender, file } = req.body;

  if (!file || typeof file !== "string" || !file.startsWith("data:image")) {
    res.status(400).json({ error: "Invalid or missing file data" });
    return;
  }

  try {
    // Upload file ke Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(file, {
      folder: "rent-apart",
    });

    if (!uploadResponse.secure_url) {
      res.status(500).json({ error: "Failed to upload file" });
      return;
    }

    const fileUrl: string = uploadResponse.secure_url; // KTP URL wajib string

    const data = {
      name,
      email,
      phone,
      address,
      date_of_birth: dateOfBirth,
      gender,
      ktp: fileUrl,
    };

    // Masukkan data ke database
    await db.insert(customerTable).values(data);

    res.status(201).json({ message: "Customer created successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
}

export async function GetCustomers(req: Request, res: Response): Promise<void> {
  const page = parseInt(req.query.page as string) || 1; // Halaman default 1
  const limit = parseInt(req.query.limit as string) || 10; // Default 10 data per halaman
  const offset = (page - 1) * limit;

  try {
    // Ambil data dengan pagination dan urutkan berdasarkan id terbaru
    const customers = await db
      .select({
        id: customerTable.id,
        name: customerTable.name,
        email: customerTable.email,
        phone: customerTable.phone,
        address: customerTable.address,
        date_of_birth: customerTable.date_of_birth,
        gender: customerTable.gender,
        ktp: customerTable.ktp,
      })
      .from(customerTable)
      .orderBy(desc(customerTable.id)) // Urutkan id secara descending
      .limit(limit)
      .offset(offset);

    // Hitung total data untuk pagination
    const totalCustomers = await db.$count(customerTable);
    const total = totalCustomers;

    // Total count untuk halaman saat ini
    const totalCountPerPage = customers.length;

    // Mapping data untuk output
    const mappedCustomers = customers.map((customer) => ({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      dateOfBirth: customer.date_of_birth,
      gender: customer.gender,
      ktp: customer.ktp,
    }));

    res.status(200).json({
      data: mappedCustomers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        totalCountPerPage,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
}
