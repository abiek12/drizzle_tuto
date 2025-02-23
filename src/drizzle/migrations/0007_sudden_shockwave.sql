ALTER TABLE "post_category" DROP CONSTRAINT "post_category_postId_post_id_fk";
--> statement-breakpoint
ALTER TABLE "post_category" DROP CONSTRAINT "post_category_categoryId_category_id_fk";
--> statement-breakpoint
ALTER TABLE "post" DROP CONSTRAINT "post_authorId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "user_settings" DROP CONSTRAINT "user_settings_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "category" ALTER COLUMN "createdAt" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "post" ALTER COLUMN "createdAt" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "updatedAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "post_category" ADD CONSTRAINT "post_category_postId_post_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."post"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_category" ADD CONSTRAINT "post_category_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post" ADD CONSTRAINT "post_authorId_users_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;