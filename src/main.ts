import { asc, desc, sql } from "drizzle-orm";
import { db } from "./drizzle/db";
import { usersTable } from "./schema";

const main = async () => {
    console.log('Server started');
    await deleteUser();
    await insertUser();
    await fetchUsers();

    process.exit();
}

const insertUser = async () => {
    try {
        const users = [
            {
                userName: "John Doe",
                age: 30,
                email: "john@mailinator.com",
            },
            {
                userName: "Abhishek",
                age: 25,
                email: "abhishek@mailinator.com",
            },
        ]

        const res = await db.insert(usersTable).values(users).returning();
        // console.log("Insert res:", res);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const fetchUsers = async () => {
    try {
        const users = await db.query.usersTable.findMany({
            columns: {createdAt: false, isDeleted: false, updatedAt: false},
            extras: { 
                lowerCaseName: sql<string>`lower(${usersTable.userName})`.as("lowerCaseName"),
            },
            limit: 10,
            offset: 0,
            orderBy: [asc(usersTable.userName)]
        });
        console.log(users);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const deleteUser = async () => {
    try {
        await db.delete(usersTable)
    } catch (error) {
        console.error(error);
        throw error;
    }
}

main();