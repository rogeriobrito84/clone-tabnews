import migration from "node-pg-migrate";
import { join } from "node:path";
import db from "/infra/database.js";

export default async function migrations(req, res) {
    const dbClient = await db.getClientDb();
    const config = {
        dbClient: dbClient,
        dryRun: true,
        dir: join("infra", "migrations"),
        direction: "up",
        verbose: true,
        migrationsTable: "pgmigrations",
    };

    if (req.method == "GET") {
        const migrateDryRun = await migration(config);
        await dbClient.end();
        return await res.status(200).json(migrateDryRun);
    } else if (req.method == "POST") {
        const migrateNotDryRun = await migration({
            ...config,
            dryRun: false,
        });
        await dbClient.end();
        if (migrateNotDryRun.length > 0)
            return await res.status(201).json(migrateNotDryRun);
        return await res.status(200).json(migrateNotDryRun);
    }

    return await res.status(405).end();
}
