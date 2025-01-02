CREATE TABLE IF NOT EXISTS "unit" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "unit_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"unit_number" varchar(3) NOT NULL,
	"floor" varchar(3) NOT NULL,
	"bedrooms" varchar(1) NOT NULL,
	"bathrooms" varchar(1) NOT NULL,
	"status" varchar(255) NOT NULL,
	"price" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "unit_floor_unique" UNIQUE("floor")
);
