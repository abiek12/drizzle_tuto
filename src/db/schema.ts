import { pgTable, uuid, serial, varchar, integer, date, boolean } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: serial().primaryKey(),
    userId: uuid("userId").primaryKey().unique().defaultRandom(),
    userName: varchar("userName", {length: 150}).notNull(),
    age: integer("age").notNull().default(0),
    email: varchar("email", {length: 255}).notNull().unique(),
    createdAt: date("createdAt").notNull().defaultNow(),
    updatedAt: date("updatedAt").notNull().defaultNow(),
    isDeleted: boolean("isDeleted").notNull().default(false)
})