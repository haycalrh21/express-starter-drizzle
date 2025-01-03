import { Request, Response } from "express";

import { db } from "../../db/index.js";
import { and, asc, desc, eq } from "drizzle-orm";
import { unitTable } from "../../db/unitSchema.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dn7elxsw6",
  api_key: "765376974365957",
  api_secret: "2WoTsfxjwx7pqCB8C7d2agTwcEs",
});

export async function CreateUnit(req: Request, res: Response): Promise<void> {
  const { unit_number, floor, bedrooms, bathrooms, file, status, price, type } =
    req.body;
  // console.log(req.body);

  if (!file || typeof file !== "string" || !file.startsWith("data:image")) {
    res.status(400).json({ error: "Invalid or missing file data" });
    return;
  }

  try {
    // Assuming db is an instance of an ORM or query builder,
    // make sure it allows querying by unit_number and floor
    const existingUnit = await db
      .select()
      .from(unitTable)
      .where(
        and(eq(unitTable.unit_number, unit_number), eq(unitTable.floor, floor))
      )

      .limit(1);
    if (existingUnit.length > 0) {
      res.status(400).json({
        error: `Unit number ${unit_number} on floor ${floor} already exists.`,
      });
      console.log(existingUnit);
      return;
    }

    const uploadResponse = await cloudinary.uploader.upload(file, {
      folder: "rent-apart",
    });

    if (!uploadResponse.secure_url) {
      res.status(500).json({ error: "Failed to upload file" });
      return;
    }

    const fileUrl: string = uploadResponse.secure_url; // KTP URL wajib string

    const data = {
      unit_number,
      floor,
      bedrooms,
      bathrooms,
      status,
      price,
      image: fileUrl,
      type,
      created_at: new Date(),
    };

    // Insert data into the database
    await db.insert(unitTable).values(data); // Adjust table name accordingly

    res.status(201).json({ message: "Unit created successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
}

export async function GetUnit(req: Request, res: Response): Promise<void> {
  const page = parseInt(req.query.page as string) || 1; // Halaman default 1
  const limit = parseInt(req.query.limit as string) || 10; // Default 10 data per halaman
  const offset = (page - 1) * limit;

  try {
    // Ambil data dengan pagination dan urutkan berdasarkan id terbaru
    const units = await db
      .select({
        id: unitTable.id,
        unit_number: unitTable.unit_number,
        image: unitTable.image,
        floor: unitTable.floor,
        bedrooms: unitTable.bedrooms,
        bathrooms: unitTable.bathrooms,
        status: unitTable.status,
        price: unitTable.price,
        type: unitTable.type,
      })
      .from(unitTable)
      .orderBy(desc(unitTable.created_at)) // Urutkan id secara descending
      .limit(limit)
      .offset(offset);
    // console.log(units);
    // Hitung total data untuk pagination
    const totalCustomers = await db.$count(unitTable);
    const total = totalCustomers;

    // Total count untuk halaman saat ini
    const totalCountPerPage = units.length;

    // Mapping data untuk output
    const mappedCustomers = units.map((unit) => ({
      id: unit.id,
      unit_number: unit.unit_number,
      image: unit.image,
      floor: unit.floor,
      bedrooms: unit.bedrooms,
      bathrooms: unit.bathrooms,
      status: unit.status,
      price: unit.price,
      type: unit.type,
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
