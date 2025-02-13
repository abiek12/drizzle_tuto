import { db } from "./drizzle/db";
import { usersTable } from "./user/schema";

const main = async () => {
    await insertUser();
    await fetchUsers();
    console.log('Server started');
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