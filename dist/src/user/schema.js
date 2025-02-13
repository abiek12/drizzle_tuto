"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.usersTable = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)().primaryKey(),
    userId: (0, pg_core_1.uuid)("userId").unique().defaultRandom(),
    userName: (0, pg_core_1.varchar)("userName", { length: 150 }).notNull(),
    age: (0, pg_core_1.integer)("age").notNull().default(0),
    email: (0, pg_core_1.varchar)("email", { length: 255 }).notNull().unique(),
    createdAt: (0, pg_core_1.date)("createdAt").notNull().defaultNow(),
    updatedAt: (0, pg_core_1.date)("updatedAt").notNull().defaultNow(),
    isDeleted: (0, pg_core_1.boolean)("isDeleted").notNull().default(false)
});
