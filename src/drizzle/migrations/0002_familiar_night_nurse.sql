CREATE INDEX "emailIndex" ON "users" USING btree ("email");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "uniqueUserNameAndEmail" UNIQUE("userName","email");