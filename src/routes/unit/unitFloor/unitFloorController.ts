import { Request, Response } from "express";

import { db } from "./../../../db/index.js";
import { asc, desc } from "drizzle-orm";
import { eq } from "drizzle-orm";

import {
  unitBathroomTable,
  unitBedroomTable,
  unitTypeTable,
} from "../../../db/unit/unitTypeUtilites.js";
export async function CreateType(req: Request, res: Response): Promise<void> {
  const { type } = req.body;
  console.log("Received type:", type);
  //   jika unit number sama

  try {
    const existingUnit = await db
      .select({
        type: unitTypeTable.type,
      })
      .from(unitTypeTable)
      .where(eq(unitTypeTable.type, type)) // Menggunakan eq()
      .limit(1); // Ambil hanya satu hasil untuk efisiensi

    // Jika sudah ada, kirimkan pesan error
    if (existingUnit.length > 0) {
      res.status(400).json({ error: "Unit Number already exists" });
      return;
    }
    const data = {
      type,
      created_at: new Date(),
    };

    // Masukkan data ke database
    await db.insert(unitTypeTable).values(data);

    res.status(201).json({ message: "Type created successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
}

export async function GetTypeUnit(req: Request, res: Response): Promise<void> {
  const page = parseInt(req.query.page as string) || 1; // Halaman default 1
  const limit = parseInt(req.query.limit as string) || 10; // Default 10 data per halaman
  const offset = (page - 1) * limit;

  try {
    // Ambil data dengan pagination dan urutkan berdasarkan id terbaru
    const units = await db
      .select({
        id: unitTypeTable.id,
        type: unitTypeTable.type,
      })
      .from(unitTypeTable)
      .orderBy(desc(unitTypeTable.created_at)) // Urutkan id secara descending
      .limit(limit)
      .offset(offset);

    // Hitung total data untuk pagination
    const totalType = await db.$count(unitTypeTable);
    const total = totalType;

    // Total count untuk halaman saat ini
    const totalCountPerPage = units.length;

    // Mapping data untuk output
    const mappedUnitNumber = units.map((unit) => ({
      id: unit.id,
      type: unit.type,
    }));

    res.status(200).json({
      data: mappedUnitNumber,
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
    res.status(500).json({ error: "Failed to fetch Type" });
  }
}

export async function CreateBedroom(
  req: Request,
  res: Response
): Promise<void> {
  const { bedrooms } = req.body;

  try {
    const existingBedrooms = await db
      .select({ floor: unitBedroomTable.bedrooms })
      .from(unitBedroomTable)
      .where(eq(unitBedroomTable.bedrooms, bedrooms))
      .limit(1);
    if (existingBedrooms.length > 0) {
      res.status(400).json({ error: "Unit Number already exists" });
      return;
    }
    const data = {
      bedrooms,
      created_at: new Date(),
    };

    // Masukkan data ke database
    await db.insert(unitBedroomTable).values(data);

    res.status(201).json({ message: "Bedrooms created successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
}

export async function GetBedroom(req: Request, res: Response): Promise<void> {
  const page = parseInt(req.query.page as string) || 1; // Halaman default 1
  const limit = parseInt(req.query.limit as string) || 10; // Default 10 data per halaman
  const offset = (page - 1) * limit;

  try {
    // Ambil data dengan pagination dan urutkan berdasarkan id terbaru
    const bedrooms = await db
      .select({
        id: unitBedroomTable.id,
        bedrooms: unitBedroomTable.bedrooms,
      })
      .from(unitBedroomTable)
      .orderBy(desc(unitBedroomTable.created_at)) // Urutkan id secara descending
      .limit(limit)
      .offset(offset);

    // Hitung total data untuk pagination
    const totalCustomers = await db.$count(unitBedroomTable);
    const total = totalCustomers;

    // Total count untuk halaman saat ini
    const totalCountPerPage = bedrooms.length;

    // Mapping data untuk output
    const mappedBedroom = bedrooms.map((unit) => ({
      id: unit.id,
      bedrooms: unit.bedrooms,
    }));

    res.status(200).json({
      data: mappedBedroom,
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
    res.status(500).json({ error: "Failed to fetch Bedroom " });
  }
}

export async function CreateBathroom(
  req: Request,
  res: Response
): Promise<void> {
  const { bathrooms } = req.body;

  try {
    const existingbathrooms = await db
      .select({ floor: unitBathroomTable.bathrooms })
      .from(unitBathroomTable)
      .where(eq(unitBathroomTable.bathrooms, bathrooms))
      .limit(1);
    if (existingbathrooms.length > 0) {
      res.status(400).json({ error: "Unit Number already exists" });
      return;
    }
    const data = {
      bathrooms,
      created_at: new Date(),
    };

    // Masukkan data ke database
    await db.insert(unitBathroomTable).values(data);

    res.status(201).json({ message: "bathrooms created successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
}

export async function GetBathroom(req: Request, res: Response): Promise<void> {
  const page = parseInt(req.query.page as string) || 1; // Halaman default 1
  const limit = parseInt(req.query.limit as string) || 10; // Default 10 data per halaman
  const offset = (page - 1) * limit;

  try {
    // Ambil data dengan pagination dan urutkan berdasarkan id terbaru
    const bathrooms = await db
      .select({
        id: unitBathroomTable.id,
        bathrooms: unitBathroomTable.bathrooms,
      })
      .from(unitBathroomTable)
      .orderBy(desc(unitBathroomTable.created_at)) // Urutkan id secara descending
      .limit(limit)
      .offset(offset);

    // Hitung total data untuk pagination
    const totalCustomers = await db.$count(unitBathroomTable);
    const total = totalCustomers;

    // Total count untuk halaman saat ini
    const totalCountPerPage = bathrooms.length;

    // Mapping data untuk output
    const mappedBathroom = bathrooms.map((unit) => ({
      id: unit.id,
      bathrooms: unit.bathrooms,
    }));

    res.status(200).json({
      data: mappedBathroom,
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
    res.status(500).json({ error: "Failed to fetch Bathroom " });
  }
}
