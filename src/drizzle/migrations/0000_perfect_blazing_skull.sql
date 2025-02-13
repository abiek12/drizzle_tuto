CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userName" varchar(150) NOT NULL,
	"age" integer DEFAULT 0 NOT NULL,
	"email" varchar(255) NOT NULL,
	"createdAt" date DEFAULT now() NOT NULL,
	"updatedAt" date DEFAULT now() NOT NULL,
	"isDeleted" boolean DEFAULT false NOT NULL,
	CONSTRAINT "users_userId_unique" UNIQUE("userId"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
