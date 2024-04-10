import db from "infra/database.js";

async function status(req, res) {
    const updateAt = new Date().toISOString();
    const searchVersion = await db.query("show server_version;");
    const versionDb = searchVersion.rows[0].server_version;
    const searchMaxConnections = await db.query("show max_connections;");
    const maxConnections = searchMaxConnections.rows[0].max_connections;
    const databaseName = process.env.POSTGRES_DB;
    const searchConnectionsOpened = await db.query({
        text: `select count(*)::int from pg_stat_activity where datname = $1;`,
        values: [databaseName],
    });
    const connectionsOpened = searchConnectionsOpened.rows[0].count;

    res.status(200).json({
        update_at: updateAt,
        dependencies: {
            database: {
                version: versionDb,
                max_connections: parseInt(maxConnections),
                opened_connections: connectionsOpened,
            },
        },
    });
}

export default status;
