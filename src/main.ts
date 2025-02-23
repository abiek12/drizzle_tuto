import { asc, sql } from "drizzle-orm";
import { db } from "./drizzle/db";
import { userSettingsTable, usersTable } from "./schema";

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
            }
        ]

        const res = await db.insert(usersTable).values(users).returning();
        await insertUserSettings(res[0].id);
        // console.log("Insert res:", res);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const fetchUsers = async () => {
    try {
        const users = await db.query.usersTable.findMany({
            with: { 
                posts: {
                    with: {
                        postCategory: true,
                    }
                }, 
                userSettings: true 
            },
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

const insertUserSettings = async (userId: number) => {
    try {
        await db.insert(userSettingsTable).values({
            userId: userId
        })
    } catch (error) {
        console.error(error);
        throw error;
    }
}

main();