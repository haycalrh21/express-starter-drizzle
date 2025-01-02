import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const unitTable = pgTable("unit", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  unit_number: varchar({ length: 3 }).notNull(),
  floor: varchar({ length: 3 }).notNull().unique(),
  bedrooms: varchar({ length: 1 }).notNull(),
  bathrooms: varchar({ length: 1 }).notNull(),
  status: varchar({ length: 255 }).notNull(),
  price: varchar({ length: 255 }).notNull(),
  type: varchar({ length: 255 }).notNull(),
  created_at: timestamp().notNull().defaultNow(),
});
