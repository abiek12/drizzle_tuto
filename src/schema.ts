import { pgTable, uuid, serial, varchar, integer, date, boolean, index, unique, text, timestamp, real, primaryKey } from "drizzle-orm/pg-core";
import { pgEnum } from "drizzle-orm/pg-core";

export const UserRoles = pgEnum("userRoles", ["ADMIN", "USER"]);
export const Themes = pgEnum("themes", ["LIGHT", "DARK", "SYSTEM_DEFAULT" ])

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

// User settings table
export const userSettingsTable = pgTable("user_settings", {
    id: serial().primaryKey(),
    emailUpdates: boolean("emailUpdates").notNull().default(true),
    theme: Themes("themes").notNull().default("LIGHT"),
    userId: integer("userId").references(()=>usersTable.id).notNull() 
})

// User post table
export const postTable = pgTable("post", {
    id: serial().primaryKey(),
    title: varchar("title", {length:255}).notNull(),
    content: text("content").notNull(),
    averageRating: real("averageRating").notNull().default(0),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
    isDeleted: boolean("isDeleted").notNull().default(false),
    authorId: integer("authorId").notNull().references(()=> usersTable.id)
})

// Category table
export const categoryTable = pgTable("category", {
    id: serial().primaryKey(),
    name: varchar("name", {length: 255}).notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
    isDeleted: boolean("isDeleted").notNull().default(false),
})

// post-category table
export const postCategoryTable = pgTable("post_category", {
    postId: integer("postId").references(()=> postTable.id).notNull(),
    categoryId: integer("categoryId").references(()=> categoryTable.id).notNull(),
}, table => {
    return {
        pk: primaryKey({ columns:[table.postId, table.categoryId] })
    }
})