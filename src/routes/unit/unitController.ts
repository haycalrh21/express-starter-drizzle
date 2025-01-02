import { Request, Response } from "express";

import { db } from "../../db/index.js";
import { asc, desc } from "drizzle-orm";
import { unitTable } from "../../db/unitSchema.js";
export async function CreateUnit(req: Request, res: Response): Promise<void> {
  const { unit_number, floor, bedrooms, bathrooms, status, price, type } =
    req.body;

  try {
    const data = {
      unit_number,
      floor,
      bedrooms,
      bathrooms,
      status,
      price,
      type,
      created_at: new Date(),
    };

    // Masukkan data ke database
    await db.insert(unitTable).values(data);

    res.status(201).json({ message: "Customer created successfully" });
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

    // Hitung total data untuk pagination
    const totalCustomers = await db.$count(unitTable);
    const total = totalCustomers;

    // Total count untuk halaman saat ini
    const totalCountPerPage = units.length;

    // Mapping data untuk output
    const mappedCustomers = units.map((unit) => ({
      id: unit.id,
      unit_number: unit.unit_number,
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
