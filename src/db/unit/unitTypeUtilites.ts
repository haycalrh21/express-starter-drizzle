import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const unitTypeTable = pgTable("unitType", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  type: varchar({ length: 3 }).notNull(),
  created_at: timestamp().notNull().defaultNow(),
});

export const unitBedroomTable = pgTable("unitBedroom", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  bedrooms: varchar({ length: 3 }).notNull(),
  created_at: timestamp().notNull().defaultNow(),
});

export const unitBathroomTable = pgTable("unitBathroom", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  bathrooms: varchar({ length: 3 }).notNull(),
  created_at: timestamp().notNull().defaultNow(),
});
