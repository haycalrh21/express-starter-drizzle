CREATE TABLE IF NOT EXISTS "unitFloor" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "unitFloor_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"floor" varchar(3) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "unitFloor_floor_unique" UNIQUE("floor")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "unitNumber" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "unitNumber_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"type" varchar(3) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "unitBathroom" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "unitBathroom_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"bathrooms" varchar(3) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "unitBedroom" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "unitBedroom_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"bedrooms" varchar(3) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
