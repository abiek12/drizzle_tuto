import { asc, eq, sql } from "drizzle-orm";
import { db } from "./drizzle/db";
import { categoryTable, postCategoryTable, postTable, userSettingsTable, usersTable } from "./schema";
import { QueryBuilder } from "drizzle-orm/pg-core";

const main = async () => {
    console.log('Server started');
    await deleteUser();
    const user = await insertUser();
    await createCategory();
    await insertPost(user.id);
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

        return res[0];
        // console.log("Insert res:", res);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const fetchUsers = async () => {
    try {
        const usersWithQuery = await db.query.usersTable.findMany({
            with: { 
                posts: {
                    with: {
                        postCategory: {
                            with: {
                                category: true
                            }
                        }
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
            orderBy: asc(usersTable.userName),
        });

        const usersWithSql = await db.select()
            .from(usersTable)
            .leftJoin(userSettingsTable, eq(usersTable.id, userSettingsTable.userId))
            .leftJoin(postTable, eq(postTable.authorId, usersTable.id))
            .groupBy(usersTable.id, userSettingsTable.id, postTable.id)

        console.dir(usersWithQuery, {depth: null});
        // console.log("Users with SQL:", usersWithSql);
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

const insertPost = async (userId: number) => {
    try {
        const postsData = [
            {
                title: "My first blog!",
                content: "This is my first blog",
                authorId: userId,
            },
            {
                title: "My second blog!",
                content: "This is my second blog",
                authorId: userId,
            }
        ]
        let newPost = await db.insert(postTable).values(postsData).returning();
        newPost.map(async (post)=> {
            await db.insert(postCategoryTable).values({
                postId: post.id,
                categoryId: 1
            })
        })
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const createCategory = async () => {
    try {
        const categoriesData = [
            { name: "Technology" },
            { name: "Science" },
            { name: "Art" },
            { name: "Music" },
            { name: "Lifestyle" },
            { name: "Fashion" },
            { name: "Food" },
            { name: "Travel" },
        ]
        for (let i=0; i<categoriesData.length; i++) {
            const categoryExists = await db.query.categoryTable.findFirst({
                where: ((category, fnc)=> fnc.ilike(category.name, categoriesData[i].name))
            });
            if (categoryExists) continue;
            await db.insert(categoryTable).values(categoriesData[i]);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

main();