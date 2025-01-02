import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const unitNumberTable = pgTable("unitNumber", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  unit_number: varchar({ length: 3 }).notNull(),

  created_at: timestamp().notNull().defaultNow(),
});

export const unitFloorTable = pgTable("unitFloor", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  floor: varchar({ length: 3 }).notNull().unique(),
  created_at: timestamp().notNull().defaultNow(),
});
