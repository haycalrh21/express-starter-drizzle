CREATE TABLE IF NOT EXISTS "customer" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "customer_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"ktp" varchar(255) NOT NULL,
	"gender" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	"date_of_birth" varchar(255) NOT NULL,
	CONSTRAINT "customer_email_unique" UNIQUE("email")
);
