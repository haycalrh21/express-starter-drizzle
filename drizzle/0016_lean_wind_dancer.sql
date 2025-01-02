CREATE TABLE IF NOT EXISTS "unitType" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "unitType_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"type" varchar(3) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "unitNumber" ADD COLUMN "unit_number" varchar(3) NOT NULL;--> statement-breakpoint
ALTER TABLE "unitNumber" DROP COLUMN IF EXISTS "type";