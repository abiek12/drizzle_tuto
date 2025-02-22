import { db } from "./drizzle/db";
import { usersTable } from "./schema";

const main = async () => {
    console.log('Server started');
    await insertUser();
    await fetchUsers();
}

const insertUser = async () => {
    try {
        await db.insert(usersTable).values({
            userName: "John Doe",
            age: 30,
            email: "john@mailinator.com",
        })
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const fetchUsers = async () => {
    try {
        const users = await db.query.usersTable.findFirst();
        console.log(users);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

main();