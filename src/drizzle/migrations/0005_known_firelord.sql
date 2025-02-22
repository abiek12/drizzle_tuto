ALTER TABLE "postCategory" RENAME TO "post_category";--> statement-breakpoint
ALTER TABLE "post_category" DROP CONSTRAINT "postCategory_postId_post_id_fk";
--> statement-breakpoint
ALTER TABLE "post_category" DROP CONSTRAINT "postCategory_categoryId_category_id_fk";
--> statement-breakpoint
ALTER TABLE "post_category" DROP CONSTRAINT "postCategory_postId_categoryId_pk";--> statement-breakpoint
ALTER TABLE "post_category" ADD CONSTRAINT "post_category_postId_categoryId_pk" PRIMARY KEY("postId","categoryId");--> statement-breakpoint
ALTER TABLE "post_category" ADD CONSTRAINT "post_category_postId_post_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."post"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_category" ADD CONSTRAINT "post_category_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;