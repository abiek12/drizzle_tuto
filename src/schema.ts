import { pgTable, uuid, serial, varchar, integer, date, boolean, index, unique, text, timestamp, real, primaryKey } from "drizzle-orm/pg-core";
import { pgEnum } from "drizzle-orm/pg-core";
import { generateUniqueString } from "./utils/common";

export const UserRoles = pgEnum("userRoles", ["ADMIN", "USER"]);
export const Themes = pgEnum("themes", ["LIGHT", "DARK", "SYSTEM_DEFAULT" ])

// Utility fields
const timestamps = {
    createdAt: date("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow().$onUpdate(()=> new Date(Date.now())),
    isDeleted: boolean("isDeleted").notNull().default(false)
}

// User table
export const usersTable = pgTable("users", {
    id: serial().primaryKey(),
    userId: uuid("userId").unique().defaultRandom(),
    userName: varchar("userName", {length: 150}).notNull(),
    age: integer("age").notNull().default(0),
    email: varchar("email", {length: 255}).notNull().unique(),
    role: UserRoles("role").notNull().default("USER"),
    ...timestamps
}, table => {
    return {
        emailIndex: index("emailIndex").on(table.email),
        uniqueUserNameAndEmail: unique("uniqueUserNameAndEmail").on(table.userName, table.email)
    }
})

// User settings table
export const userSettingsTable = pgTable("user_settings", {
    id: serial().primaryKey(),
    emailUpdates: boolean("emailUpdates").notNull().default(true),
    theme: Themes("themes").notNull().default("LIGHT"),
    userId: integer("userId").references(()=>usersTable.id, {onDelete: 'cascade'}).notNull() 
})

// User post table
export const postTable = pgTable("post", {
    id: serial().primaryKey(),
    title: varchar("title", {length:255}).notNull(),
    content: text("content").notNull(),
    slug: varchar("slug", {length: 255}).notNull().$default(()=>generateUniqueString(16)),
    averageRating: real("averageRating").notNull().default(0),
    authorId: integer("authorId").notNull().references(()=> usersTable.id, {onDelete: 'cascade'}),
    ...timestamps
})

// Category table
export const categoryTable = pgTable("category", {
    id: serial().primaryKey(),
    name: varchar("name", {length: 255}).notNull(),
    ...timestamps
})

// Post-category table
export const postCategoryTable = pgTable("post_category", {
    postId: integer("postId").references(()=> postTable.id, {onDelete: 'cascade'}).notNull(),
    categoryId: integer("categoryId").references(()=> categoryTable.id, { onDelete: 'cascade'}).notNull(),
}, table => {
    return {
        pk: primaryKey({ columns:[table.postId, table.categoryId] })
    }
})