import { pgTable, uuid, serial, varchar, integer, date, boolean, index, unique } from "drizzle-orm/pg-core";
import { pgEnum } from "drizzle-orm/pg-core";

export const UserRoles = pgEnum("userRoles", ["ADMIN", "USER"]);

export const usersTable = pgTable("users", {
    id: serial().primaryKey(),
    userId: uuid("userId").unique().defaultRandom(),
    userName: varchar("userName", {length: 150}).notNull(),
    age: integer("age").notNull().default(0),
    email: varchar("email", {length: 255}).notNull().unique(),
    role: UserRoles("role").notNull().default("USER"),
    createdAt: date("createdAt").notNull().defaultNow(),
    updatedAt: date("updatedAt").notNull().defaultNow(),
    isDeleted: boolean("isDeleted").notNull().default(false)
}, table => {
    return {
        emailIndex: index("emailIndex").on(table.email),
        uniqueUserNameAndEmail: unique("uniqueUserNameAndEmail").on(table.userName, table.email)
    }
})