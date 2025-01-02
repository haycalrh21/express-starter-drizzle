import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: [
    "./src/db/userSchema.ts",
    "./src/db/customerSchema.ts",
    "./src/db/unitSchema.ts",
    "./src/db/unit/unitFloorNumber.ts",
    "./src/db/unit/unitTypeUtilites.ts",
  ],
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
