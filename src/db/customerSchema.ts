import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const customerTable = pgTable("customer", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  ktp: varchar({ length: 255 }).notNull(),
  gender: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 255 }).notNull(),
  address: varchar({ length: 255 }).notNull(),
  date_of_birth: varchar({ length: 255 }).notNull(),
});
