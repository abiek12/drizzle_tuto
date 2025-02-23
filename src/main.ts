import { db } from "./drizzle/db";
import { usersTable } from "./schema";

const main = async () => {
    console.log('Server started');
    await deleteUser();
    await insertUser();
    await fetchUsers();
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
                email: "=abhishek@mailinator.com",
            },
        ]
        
        await db.insert(usersTable).values(users).returning();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const fetchUsers = async () => {
    try {
        const users = await db.query.usersTable.findMany();
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