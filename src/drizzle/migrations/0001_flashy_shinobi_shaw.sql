CREATE TYPE "public"."userRoles" AS ENUM('ADMIN', 'USER');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "userRoles" DEFAULT 'USER' NOT NULL;