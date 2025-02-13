import "dotenv/config";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const migrationClient = postgres(process.env.DATABASE_URL! as string, {max: 1});

async function main() {
    await migrate(drizzle(migrationClient), {
        migrationsFolder: `${__dirname}/migrations`,
    });
    console.log("Migration completed");
}

main();