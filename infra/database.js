import { Client } from "pg";

async function query(queryExec) {
    let dbClient;
    try {
        dbClient = await getClientDb();
        const result = await dbClient.query(queryExec);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        await dbClient.end();
    }
}

async function getClientDb() {
    const client = new Client({
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        ssl: process.env.NODE_ENV == "production" ? true : false,
    });
    await client.connect();
    return client;
}

export default {
    query,
    getClientDb,
};
