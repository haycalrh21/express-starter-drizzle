import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const unitTypeTable = pgTable("unitType", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  type: varchar({ length: 255 }).notNull(),
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

// export const CreateUnitNumberSchema = createInsertSchema(unitTypeTable).pick({
//   email: true,
//   password: true,
// });
