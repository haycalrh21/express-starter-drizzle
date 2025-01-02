import { Request, Response } from "express";

import { db } from "./../../../db/index.js";
import { asc, desc } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { unitTable } from "../../../db/unitSchema.js";
import {
  unitFloorTable,
  unitNumberTable,
} from "../../../db/unit/unitFloorNumber.js";
export async function CreateUnitNumber(
  req: Request,
  res: Response
): Promise<void> {
  const { unit_number } = req.body;
  console.log("Received unit_number:", unit_number);
  //   jika unit number sama

  try {
    const existingUnit = await db
      .select({
        unit_number: unitNumberTable.unit_number,
      })
      .from(unitNumberTable)
      .where(eq(unitNumberTable.unit_number, unit_number)) // Menggunakan eq()
      .limit(1); // Ambil hanya satu hasil untuk efisiensi

    // Jika sudah ada, kirimkan pesan error
    if (existingUnit.length > 0) {
      res.status(400).json({ error: "Unit Number already exists" });
      return;
    }
    const data = {
      unit_number,
      created_at: new Date(),
    };

    // Masukkan data ke database
    await db.insert(unitNumberTable).values(data);

    res.status(201).json({ message: "Unit Number created successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
}

export async function GetUnitNumber(
  req: Request,
  res: Response
): Promise<void> {
  const page = parseInt(req.query.page as string) || 1; // Halaman default 1
  const limit = parseInt(req.query.limit as string) || 10; // Default 10 data per halaman
  const offset = (page - 1) * limit;

  try {
    // Ambil data dengan pagination dan urutkan berdasarkan id terbaru
    const units = await db
      .select({
        id: unitNumberTable.id,
        unit_number: unitNumberTable.unit_number,
      })
      .from(unitNumberTable)
      .orderBy(desc(unitNumberTable.created_at)) // Urutkan id secara descending
      .limit(limit)
      .offset(offset);

    // Hitung total data untuk pagination
    const totalCustomers = await db.$count(unitNumberTable);
    const total = totalCustomers;

    // Total count untuk halaman saat ini
    const totalCountPerPage = units.length;

    // Mapping data untuk output
    const mappedUnitNumber = units.map((unit) => ({
      id: unit.id,
      unit_number: unit.unit_number,
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
    res.status(500).json({ error: "Failed to fetch Unit Number" });
  }
}

export async function CreateUnitFloor(
  req: Request,
  res: Response
): Promise<void> {
  const { floor } = req.body;
  console.log("Received floor:", floor);

  try {
    const existingFloor = await db
      .select({ floor: unitFloorTable.floor })
      .from(unitFloorTable)
      .where(eq(unitFloorTable.floor, floor))
      .limit(1);
    if (existingFloor.length > 0) {
      res.status(400).json({ error: "floor already exists" });
      return;
    }
    const data = {
      floor,
      created_at: new Date(),
    };

    // Masukkan data ke database
    await db.insert(unitFloorTable).values(data);

    res.status(201).json({ message: "Floor created successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
}

export async function GetFloor(req: Request, res: Response): Promise<void> {
  const page = parseInt(req.query.page as string) || 1; // Halaman default 1
  const limit = parseInt(req.query.limit as string) || 10; // Default 10 data per halaman
  const offset = (page - 1) * limit;

  try {
    // Ambil data dengan pagination dan urutkan berdasarkan id terbaru
    const floors = await db
      .select({
        id: unitFloorTable.id,
        floor: unitFloorTable.floor,
      })
      .from(unitFloorTable)
      .orderBy(desc(unitFloorTable.created_at)) // Urutkan id secara descending
      .limit(limit)
      .offset(offset);

    // Hitung total data untuk pagination
    const totalCustomers = await db.$count(unitFloorTable);
    const total = totalCustomers;

    // Total count untuk halaman saat ini
    const totalCountPerPage = floors.length;

    // Mapping data untuk output
    const mappedFloor = floors.map((unit) => ({
      id: unit.id,
      floor: unit.floor,
    }));

    res.status(200).json({
      data: mappedFloor,
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
    res.status(500).json({ error: "Failed to fetch floor " });
  }
}
